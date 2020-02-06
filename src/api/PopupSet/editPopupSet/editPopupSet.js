import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editPopupSet: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, lifePop, filterPop, importantPop } = args;
      const { user } = request;

      const popupSet = await prisma.$exists.popupSet({
        id,
        user: { id: user.id }
      });

      if (popupSet) {
        return prisma.updatePopupSet({
          data: {
            lifePop,
            filterPop,
            importantPop
          },
          where: {
            id
          }
        });
      } else {
        throw Error("You can't do that");
      }
    }
  }
};
