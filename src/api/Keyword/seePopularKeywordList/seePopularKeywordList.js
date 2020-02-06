import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seePopularKeywordList: async (_, __) => {
      let allKeywords = [];

      try {
        allKeywords = await prisma.keywords();

        for (const keyword of allKeywords) {
          const count = await prisma
            .filtersConnection({
              where: {
                keyword_some: { id: keyword.id }
              }
            })
            .aggregate()
            .count();
          keyword.count = count;
        }

        allKeywords.sort((a, b) => {
          // count 가 큰것이 앞으로 오도록 sorting
          if (a.count < b.count) {
            return 1;
          }
          if (a.count > b.count) {
            return -1;
          }
          return 0;
        });

        return allKeywords;
      } catch (e) {
        console.log(e);
      }

      return allKeywords;
    }
  }
};
