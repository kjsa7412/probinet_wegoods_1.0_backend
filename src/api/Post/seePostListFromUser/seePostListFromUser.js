import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seePostListFromUser: async (_, args) => {
      const { userId } = args;
      return prisma.posts({ where: { user: { id: userId } } });
    }
  }
};
