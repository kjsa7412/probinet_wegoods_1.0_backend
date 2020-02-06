import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchLifePost: async (_, args) =>
      prisma.lifePosts({
        where: {
          title_contains: args.term
        }
      })
  }
};
