import { prisma } from "../../../generated/prisma-client";

export default {
  Room: {
    participants: ({ id }) => prisma.room({ id }).participants(),
    messages: ({ id }) => prisma.room({ id }).messages(),
    owner: ({ id }) => prisma.room({ id }).owner(),

    participantsCount: ({ id }) =>
      prisma
        .usersConnection({ where: { rooms_some: { id } } })
        .aggregate()
        .count()
  }
};
