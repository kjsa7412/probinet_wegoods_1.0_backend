import { prisma } from "../../../../generated/prisma-client";

const PERSON = "PERSON";
const GROUP = "GROUP";
const MEMBER = "MEMBER";

/////////////////////////////////////////////////////////////
// Todo List
// 1. 특정 조건을 만족 했을 때 Registed 속성이 True로 변해야함
/////////////////////////////////////////////////////////////

// 아티스트 등록
async function registerArtist(
  userId,
  name,
  engName,
  alternativeName,
  jopType,
  action,
  parentsArtistId
) {
  // 1. 존재여부 확인
  let existArtist;

  // 1.1. parentsArtistId 없을 때
  if (parentsArtistId === undefined) {
    existArtist = await prisma.artists({
      where: {
        name,
        engName,
        jopType,
        activeType: action
      }
    });
  }
  // 1.2. parentsArtistId 있을 때
  else {
    existArtist = await prisma.artists({
      where: {
        name,
        engName,
        jopType,
        parentsArtist_some: { id: parentsArtistId },
        activeType: action
      }
    });
  }

  // 2. 첫 항목 가져오기
  let targetArtist = existArtist[0];

  // 3. 존재하지 않으면 신규 생성
  if (targetArtist === undefined) {
    // 3.1. parentsArtistId 없을 때
    if (parentsArtistId === undefined) {
      targetArtist = await prisma.createArtist({
        name,
        engName,
        alternativeName: { set: alternativeName },
        jopType,
        activeType: action,
        registedUser: { connect: { id: userId } }
      });
    }
    // 3.2. parentsArtistId 있을 때
    else {
      targetArtist = await prisma.createArtist({
        name,
        engName,
        alternativeName: { set: alternativeName },
        jopType,
        parentsArtist: { connect: { id: parentsArtistId } },
        activeType: action,
        registedUser: { connect: { id: userId } }
      });
    }

    targetArtist.registResult = "신규 등록 되었습니다.";
  }
  // 4. 존재하는 경우
  else {
    // 5. 카테고리화 되었는지 체크
    if (targetArtist.registed) {
      targetArtist.registResult = "이미 카테고리로 지정된 아티스트 입니다.";
    }
    // 6. 카테고리화 되어있지 않다면 내가 이미 내가 신규 등록했는지 확인
    else {
      const existUser = await prisma.$exists.artist({
        id: targetArtist.id,
        registedUser_some: { id: userId }
      });

      // 7. 등록된 User에 자신이 포함되어 있다면 이미 내가 신규 등록한 Artist이다.
      if (existUser) {
        targetArtist.registResult = "이미 신규 등록한 아티스트 입니다.";
      }
      // 8. 포함되어 있지 않다면 해당 Artist에 나를 연결시켜 신규 등록한다.
      else {
        targetArtist = await prisma.updateArtist({
          data: { registedUser: { connect: { id: userId } } },
          where: { id: targetArtist.id }
        });

        targetArtist.registResult = "신규 등록 되었습니다.";
      }
    }
  }

  return targetArtist;
}

export default {
  Mutation: {
    addArtist: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { name, engName, alternativeName, members, jopType, action } = args;

      const artist = [];

      // 1. 개인이거나 그룹 데이터 저장
      const firstArtist = await registerArtist(
        user.id,
        name,
        engName,
        alternativeName,
        jopType,
        action
      );

      artist.push(firstArtist);

      // 2. 그룹인데 멤버 데이터가 존재 할 경우 멤버 데이터 저장
      if (
        firstArtist !== undefined &&
        members !== undefined &&
        action === GROUP
      ) {
        // 2.1. 멤버 수 많큼 데이터 저장
        for (const item of members) {
          const artistOfMember = await registerArtist(
            user.id,
            item.name,
            item.engName,
            item.alternativeName,
            jopType,
            MEMBER,
            firstArtist.id
          );

          artist.push(artistOfMember);
        }
      }

      return artist;
    }
  }
};
