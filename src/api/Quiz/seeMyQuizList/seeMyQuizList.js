import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeMyQuizList: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;

      return prisma.quizzes({
        where: {
          user: {
            id: user.id
          }
        }
      });
    }
  }
};
