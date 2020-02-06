import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteQuiz: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { quizId } = args;
      const { user } = request;

      console.log(quizId);
      return prisma.deleteManyQuizzes({
        AND: [
          { user: { id: user.id } },
          {
            OR: quizId.map(value => {
              return { id: value };
            })
          }
        ]
      });
    }
  }
};
