import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editQuiz: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, title, question, answers, rightAnswer, action } = args;
      const { user } = request;
      const quiz = await prisma.$exists.quiz({ id, user: { id: user.id } });

      if (quiz) {
        if (action === EDIT) {
          return prisma.updateQuiz({
            data: {
              title,
              question,
              answers: { set: answers },
              rightAnswer
            },
            where: { id }
          });
        } else if (action === DELETE) {
          return prisma.deleteQuiz({ id });
        }
      } else {
        throw Error("You can't do that");
      }
    }
  }
};
