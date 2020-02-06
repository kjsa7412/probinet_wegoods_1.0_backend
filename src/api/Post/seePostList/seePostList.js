import { prisma } from "../../../../generated/prisma-client";

const LATEST = "LATEST";
const POPULAR = "POPULAR";
const HIGH_PRICE = "HIGH_PRICE";
const LOW_PRICE = "LOW_PRICE";

export default {
  Query: {
    seePostList: async (_, args) => {
      const { postsId, orderby } = args;

      let postIdList = [];

      try {
        if (orderby === LATEST) {
          // 최신순 정렬
          postIdList = await prisma.posts({
            where: {
              id_in: postsId
            },
            orderBy: "createdAt_DESC"
          });
        } else if (orderby === POPULAR) {
          // 인기순 정렬 (LikeCount 순)
          postIdList = await prisma.posts({
            where: {
              id_in: postsId
            },
            orderBy: "likeCount_DESC"
          });
        } else if (orderby === HIGH_PRICE) {
          // 높은 가격 순(판매 post 결과만 나옴)
          postIdList = await prisma.posts({
            where: {
              id_in: postsId
            },
            orderBy: "price_DESC"
          });
        } else if (orderby === LOW_PRICE) {
          // 낮은 가격 순(판매 post 결과만 나옴)
          postIdList = await prisma.posts({
            where: {
              id_in: postsId
            },
            orderBy: "price_ASC"
          });
        } else {
          // DB 삽입순
          postIdList = await prisma.posts({
            where: {
              id_in: postsId
            }
          });
        }
      } catch (e) {
        console.log(e);
      }

      return postIdList;
    }
  }
};
