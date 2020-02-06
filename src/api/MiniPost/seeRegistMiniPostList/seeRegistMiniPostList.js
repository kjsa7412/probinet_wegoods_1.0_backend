import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeRegistMiniPostList: async (_, args) => {
      const { postId } = args;
      return prisma.miniPosts({
        where: {
          registedPost: { id: postId }
        }
      });
    }
  }
};
