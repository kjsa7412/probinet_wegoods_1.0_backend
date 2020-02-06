import { prisma } from "../../../../generated/prisma-client";

const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
  Mutation: {
    editMiniPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, title, description, files, action } = args;
      const { user } = request;
      const miniPost = await prisma.$exists.miniPost({
        id,
        user: { id: user.id }
      });
      if (miniPost) {
        if (action === EDIT) {
          return prisma.updateMiniPost({
            data: {
              files: { set: files },
              title,
              description
            },
            where: { id }
          });
        } else if (action === DELETE) {
          return prisma.deleteMiniPost({ id });
        } else {
          throw Error("You can't do that. Action is undefined.");
        }
      } else {
        throw Error("You can't do that");
      }
    }
  }
};
