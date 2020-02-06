import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seePostQuizList: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId } = args;

      return prisma.quizzes({
        where: {
          post_some: { id: postId }
        }
      });
    }
  }
};
