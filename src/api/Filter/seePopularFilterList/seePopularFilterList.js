import { prisma } from "../../../../generated/prisma-client";
import { getRandomIntExclusive } from "../../../utils";

export default {
  Query: {
    seePopularFilterList: async (_, args) => {
      const { loadNumber, onFilterIndex = [] } = args;

      // 인기 필터의 경우 최대 갯수자체를 100 개 선정해 놓는 것을 가정으로 한다.
      // 그러므로 popularFilter 가 true 인 것만 가져 오도록 한다.

      const randomResult = [];

      // 필요 filter를 가져 온다.
      // filterId에 값이 없으면 Down
      // filterId에 값이 있으면 Up
      const filters = await prisma.filters({
        where: {
          AND: [{ popularFilter: true }, { filterIndex_not_in: onFilterIndex }]
        }
      });

      // 랜덤 number 배열 생성
      const numbers = getRandomIntExclusive(filters.length, loadNumber);

      // 삽입
      for (const index of numbers) {
        randomResult.push(filters[index]);
      }

      return randomResult;
    }
  }
};
