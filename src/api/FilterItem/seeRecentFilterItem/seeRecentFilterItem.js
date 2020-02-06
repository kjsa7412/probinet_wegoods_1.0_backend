import { prisma } from "../../../../generated/prisma-client";

const MY = "MY";
const SELL = "SELL";
const WANT = "WANT";

const ARTIST = "ARTIST";
const KIND = "KIND";
const KEYWORD = "KEYWORD";
const LOCATION = "LOCATION";
const QUIZ = "QUIZ";

export default {
  Query: {
    seeRecentFilterItem: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { condition, action } = args;
      const { user } = request;

      // 1. 내가 생성한 필터들을 최신순으로 정렬해서 가져온다.

      let myFilters;

      switch (condition) {
        case MY:
          myFilters = await prisma.myFilters({
            first: 5,
            orderBy: "createdAt_DESC",
            where: {
              user: { id: "cjz2ed1trhqj50b88wetlmomz" }
            }
          });
          break;
        case SELL:
          myFilters = await prisma.posts({
            first: 5,
            orderBy: "createdAt_DESC",
            where: {
              user: { id: "cjz2ed1trhqj50b88wetlmomz" },
              postFilter: {}
            }
          });
          break;
        case WANT:
          myFilters = await prisma.posts({
            first: 5,
            orderBy: "createdAt_DESC",
            where: {
              user: { id: "cjz2ed1trhqj50b88wetlmomz" },
              wantFilter: {}
            }
          });
          break;
        default:
      }

      // 2. 내가 설정한 필터들에서 아티스트를 5개까지만 가져온다.

      // TIME : 1042.074 ms

      let resultItems = [];

      myFiltersLoop: for (const oneOfMyFilters of myFilters) {
        let contentOfFilters;

        if (condition === MY) {
          contentOfFilters = {
            where: { userFilter_some: { id: oneOfMyFilters.id } }
          };
        } else if (condition === SELL) {
          contentOfFilters = {
            where: { postFilter_some: { id: oneOfMyFilters.id } }
          };
        } else if (condition === WANT) {
          contentOfFilters = {
            where: { wantFilter_some: { id: oneOfMyFilters.id } }
          };
        } else {
        }

        const oneOfFilter = await prisma.filters(contentOfFilters);

        const contentOfItem = {
          first: 5,
          where: {
            filters_some: { id: oneOfFilter[0].id }
          }
        };

        let myItems;

        if (action === ARTIST) {
          myItems = await prisma.artists(contentOfItem);
        } else if (action === KIND) {
          myItems = await prisma.kinds(contentOfItem);
        } else if (action === KEYWORD) {
          myItems = await prisma.keywords(contentOfItem);
        } else if (action === LOCATION) {
          myItems = await prisma.locations(contentOfItem);
        } else {
        }

        for (const oneOfMyItems of myItems) {
          let insertItem = {};

          if (action === ARTIST) {
            (insertItem.id = oneOfMyItems.id),
              (insertItem.text = oneOfMyItems.name),
              (insertItem.count = 0);
          } else {
            (insertItem.id = oneOfMyItems.id),
              (insertItem.text = oneOfMyItems.text),
              (insertItem.count = 0);
          }

          const isMatched = resultItems.some(function(valueOfResultItems) {
            return valueOfResultItems.id === insertItem.id;
          });

          if (isMatched === false) {
            resultItems.push(insertItem);

            if (resultItems.length > 2) {
              break myFiltersLoop;
            }
          }
        }
      }

      return resultItems;
    }
  }
};
