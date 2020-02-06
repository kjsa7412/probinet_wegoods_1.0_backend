import { prisma } from "../../../../generated/prisma-client";

const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
  Mutation: {
    editLifePost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, files, title, description, action } = args;
      const { user } = request;
      const lifePost = await prisma.$exists.lifePost({
        id,
        user: { id: user.id }
      });
      if (lifePost) {
        if (action === EDIT) {
          return prisma.updateLifePost({
            data: {
              files: { set: files },
              title,
              description
            },
            where: { id }
          });
        } else if (action === DELETE) {
          return prisma.deleteLifePost({ id });
        } else {
          throw Error("You can't do that. Action is undefined.");
        }
      } else {
        throw Error("You can't do that");
      }
    }
  }
};
