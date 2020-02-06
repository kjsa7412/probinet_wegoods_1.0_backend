import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { participants, title, subTitle, file } = args;

      console.log(participants);
      console.log(title);
      console.log(subTitle);
      console.log(file);

      return prisma.createRoom({
        participants: {
          connect: participants.map(participants => {
            return { id: participants };
          })
        },
        owner: { connect: { id: user.id } },
        title,
        subTitle,
        file
      });
    }
  }
};
