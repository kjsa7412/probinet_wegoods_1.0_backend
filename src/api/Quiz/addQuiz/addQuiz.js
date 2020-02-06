import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addQuiz: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { title, question, answers, rightAnswer } = args;

      return prisma.createQuiz({
        title,
        question,
        answers: { set: answers },
        rightAnswer,
        user: { connect: { id: user.id } }
      });
    }
  }
};
