import { prisma } from "../../../../generated/prisma-client";

const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
  Mutation: {
    editMyFilter: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, title, file, filter, alarmSet, action } = args;
      const { user } = request;
      const myFilter = await prisma.$exists.myFilter({
        id,
        user: { id: user.id }
      });
      if (myFilter) {
        if (action === EDIT) {
          return prisma.updateMyFilter({
            data: {
              title,
              file,
              filter: {
                connect: {
                  id: filter
                }
              },
              alarmSet
            },
            where: { id }
          });
        } else if (action === DELETE) {
          return prisma.deleteMyFilter({ id });
        } else {
          throw Error("You can't do that. Action is undefined.");
        }
      } else {
        throw Error("You can't do that");
      }
    }
  }
};
