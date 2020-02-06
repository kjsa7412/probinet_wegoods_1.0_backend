import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUserFromPost: async (_, args) =>
      prisma.users({
        where: {
          inPosts_some: {
            id: args.inPostId
          }
        }
      })
  }
};
