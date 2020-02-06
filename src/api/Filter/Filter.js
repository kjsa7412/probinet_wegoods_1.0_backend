import { prisma } from "../../../generated/prisma-client";

export default {
  Filter: {
    postFilter: ({ id }) => prisma.filter({ id }).postFilter(),
    artist: ({ id }) => prisma.filter({ id }).artist(),
    kind: ({ id }) => prisma.filter({ id }).kind(),
    keyword: ({ id }) => prisma.filter({ id }).keyword(),
    location: ({ id }) => prisma.filter({ id }).location(),

    userFilterCount: ({ id }) =>
      prisma
        .myFiltersConnection({ where: { filter: { id } } })
        .aggregate()
        .count(),

    postFilterCount: ({ id }) =>
      prisma
        .postsConnection({ where: { postFilter: { id } } })
        .aggregate()
        .count()
  }
};
