import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeRegistedArtistList: async (_, __) =>
      prisma.artists({ where: { registed: true } })
  }
};
