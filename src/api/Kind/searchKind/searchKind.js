import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchKind: async (_, args) => {
      const { term } = args;

      // 1글자 검색 막기 로 되어 있었는데
      // 1글자도 검색이 되도록 수정함 191024
      if (term.length !== 0) {
        return prisma.kinds({
          where: {
            text_contains: term,
            registed: true
          }
        });
      } else {
        throw Error("You can't do that");
      }
    }
  }
};
