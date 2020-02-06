import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUnRegistedArtistList: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;

      const artist = await prisma.artists({
        where: {
          registed: false,
          registedUser_some: {
            id: user.id
          }
        }
      });

      return artist;
    }
  }
};
