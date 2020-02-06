import { prisma } from "../../../generated/prisma-client";

export default {
  PostTypeCount: {
    postsCount: ({ id, filters }) =>
      prisma
        .postsConnection({
          where: {
            postFilter: { id_in: filters }
          }
        })
        .aggregate()
        .count()
  }
};
