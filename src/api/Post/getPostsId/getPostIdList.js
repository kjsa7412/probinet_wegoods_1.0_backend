import { prisma } from "../../../../generated/prisma-client";

const LATEST = "LATEST";
const POPULAR = "POPULAR";
const HIGH_PRICE = "HIGH_PRICE";
const LOW_PRICE = "LOW_PRICE";

export default {
  Query: {
    getPostIdList: async (_, args) => {
      const { orderby } = args;

      let postIdList = [];

      try {
        if (orderby === LATEST) {
          // 최신순 정렬
          postIdList = await prisma
            .posts({
              orderBy: "createdAt_DESC"
            })
            .id();
        } else if (orderby === POPULAR) {
          // 인기순 정렬 (LikeCount 순)
          postIdList = await prisma
            .posts({
              orderBy: "likeCount_DESC"
            })
            .id();
        } else if (orderby === HIGH_PRICE) {
          // 높은 가격 순(판매 post 결과만 나옴)
          postIdList = await prisma
            .posts({
              where: { price_not: null },
              orderBy: "price_DESC"
            })
            .id();
        } else if (orderby === LOW_PRICE) {
          // 낮은 가격 순(판매 post 결과만 나옴)
          postIdList = await prisma
            .posts({
              where: { price_not: null },
              orderBy: "price_ASC"
            })
            .id();
        } else {
          // DB 삽입순
          postIdList = await prisma.posts().id();
        }
      } catch (e) {
        console.log(e);
      }
      if (postIdList !== []) {
        postIdList = postIdList.map(postIdList => {
          return postIdList.id;
        });
      }

      return postIdList;
    }
  }
};
