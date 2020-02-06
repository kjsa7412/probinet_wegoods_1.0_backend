import { prisma } from "../../../../generated/prisma-client";
import { getRandomIntExclusive } from "../../../utils";
import { empty } from "apollo-link";

export default {
  Query: {
    seeMarketListLocation: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { loadNumber, postsId = [], location = "" } = args;

      console.log(location);

      // 지역세팅
      let locationForSearch = "";
      let locationOfPrisma = [];

      if (location === "all") {
        locationForSearch = "";
      } else if (location !== "") {
        locationForSearch = location;
      } else {
        locationOfPrisma = await prisma.locations({
          where: {
            users_some: { id: user.id }
          }
        });

        if (locationOfPrisma.length !== 0) {
          locationForSearch = locationOfPrisma[0].id;
        }
      }

      // 데이터 가져오기
      let posts;

      if (locationForSearch === "" || locationForSearch === undefined) {
        posts = await prisma.posts({
          where: {
            AND: [{ type: 3 }, { id_not_in: postsId }]
          }
        });
      } else {
        posts = await prisma.posts({
          where: {
            AND: [
              { type: 3 },
              { id_not_in: postsId },
              { postFilter: { location_some: { id: locationForSearch } } }
            ]
          }
        });
      }

      // 랜덤 데이터 가져오기
      const randomResult = [];

      const numbers = getRandomIntExclusive(posts.length, loadNumber);

      for (const index of numbers) {
        randomResult.push(posts[index]);
      }

      return randomResult;
    }
  }
};
