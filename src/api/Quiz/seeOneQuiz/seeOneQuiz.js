import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeOneQuiz: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;

      return prisma.quiz({ id });
    }
  }
};
