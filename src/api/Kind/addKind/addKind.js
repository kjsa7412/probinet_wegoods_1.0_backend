import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addKind: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text } = args;

      try {
        const checkText = await prisma.kinds({ where: { text } });

        if (checkText !== undefined && checkText.length !== 0) {
          return checkText[0];
        } else {
          const maxNum = await prisma.kinds({ orderBy: "num_DESC", first: 1 });

          if (maxNum !== undefined && maxNum.length !== 0) {
            return prisma.createKind({ text, num: maxNum[0].num + 1 });
          }
        }
      } catch (e) {
        return false;
      }
    }
  }
};
