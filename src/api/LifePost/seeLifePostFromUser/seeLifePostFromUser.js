import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeLifePostFromUser: async (_, args) => {
      const { userId } = args;
      return prisma.lifePosts({ where: { user: { id: userId } } });
    }
  }
};
