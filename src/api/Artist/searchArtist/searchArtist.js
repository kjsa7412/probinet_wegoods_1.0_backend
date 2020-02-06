import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchArtist: async (_, args) => {
      const { term } = args;
      try {
        // 1글자 검색 막기 로 되어 있었는데
        // 1글자도 검색이 되도록 수정함 191024
        if (term.length !== 0) {
          const result = prisma.artists({
            where: {
              registed: true,
              OR: [{ name_contains: term }, { engName_contains: term }]
            }
          });
          return result;
        } else {
          throw Error("You can't do that");
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
