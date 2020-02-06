import { prisma } from "../../../generated/prisma-client";

export default {
  Artist: {
    user: ({ id }) => prisma.artist({ id }).user(),
    filters: ({ id }) => prisma.artist({ id }).filters(),
    registedUser: ({ id }) => prisma.artist({ id }).registedUser(),
    childArtist: ({ id }) => prisma.artist({ id }).childArtist(),
    parentsArtist: ({ id }) => prisma.artist({ id }).parentsArtist(),
    registedUserCount: ({ id }) =>
      prisma
        .usersConnection({ where: { registedArtist_some: { id } } })
        .aggregate()
        .count(),

    postsCount: ({ id, filterIdOnOption }) =>
      prisma
        .postsConnection({
          where: {
            postFilter: { id_in: filterIdOnOption }
          }
        })
        .aggregate()
        .count()
  }
};
