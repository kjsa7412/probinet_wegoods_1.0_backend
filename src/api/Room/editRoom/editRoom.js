import { prisma } from "../../../../generated/prisma-client";

const EDIT = "EDIT";
const OUT = "OUT";

export default {
  Mutation: {
    editRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { roomId, title, file, owner, notice, action } = args;
      const { user } = request;

      const isParticipants = await prisma.$exists.room({
        id: roomId,
        participants_some: { id: user.id }
      });

      if (isParticipants) {
        // 방장인지 Check
        const isOwner = await prisma.$exists.room({
          id: roomId,
          owner: { id: user.id }
        });

        if (action === EDIT) {
          // EDIT 의 경우 방장인지 아닌지에 따라 EDIT 할수 있는 범위가 달라진다
          if (isOwner) {
            // 방장인 경우
            return prisma.updateRoom({
              data: {
                title,
                file,
                notice,
                owner: {
                  connect: {
                    id: owner
                  }
                }
              },
              where: { id: roomId }
            });
          } else {
            // 방장이 아닌경우 : 공지사항만 수정 할 수 있음.
            return prisma.updateRoom({
              data: {
                notice
              },
              where: { id: roomId }
            });
          }
        } else if (action === OUT) {
          // 나가기 전에 참여자 수를 확인 한다.
          const participantsCount = await prisma
            .usersConnection({ where: { rooms_some: { id: roomId } } })
            .aggregate()
            .count();

          // 방을 나갈 때 participants 가 한명(본인) 이면 방이 삭제하도록 할 것
          if (participantsCount === 1) {
            return prisma.deleteRoom({ id: roomId });
          } else {
            if (isOwner) {
              // 방장인 경우 남은 사람이 있으면 방장을 넘기고 퇴장
              const participants = await prisma
                .room({ id: roomId })
                .participants({ where: { id_not: user.id } });

              return prisma.updateRoom({
                data: {
                  owner: {
                    connect: {
                      id: participants[0].id
                    }
                  },
                  participants: {
                    disconnect: {
                      id: user.id
                    }
                  }
                },
                where: { id: roomId }
              });
            } else {
              // 방장이 아닌 경우 그냥 퇴장
              return prisma.updateRoom({
                data: {
                  participants: {
                    disconnect: {
                      id: user.id
                    }
                  }
                },
                where: { id: roomId }
              });
            }
          }
        } else {
          throw Error("You can't do that. Action is undefined.");
        }
      } else {
        throw Error("You can't do that");
      }
    }
  }
};
