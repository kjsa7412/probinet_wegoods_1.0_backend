import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addParticipants: async (_, args) => {
      const { roomId, participants } = args;

      return prisma.updateRoom({
        data: {
          participants: {
            connect: participants.map(participants => {
              return { id: participants };
            })
          }
        },
        where: {
          id: roomId
        }
      });
    }
  }
};
