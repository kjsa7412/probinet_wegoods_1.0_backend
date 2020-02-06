import { prisma } from "../../../../generated/prisma-client";

const REGIST = "REGIST";
const VARIFY = "VARIFY";

export default {
  Mutation: {
    addMiniPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId, title, description, files, addType } = args;
      const { user } = request;
      if (addType === REGIST) {
        return prisma.createMiniPost({
          user: {
            connect: {
              id: user.id
            }
          },
          registedPost: {
            connect: {
              id: postId
            }
          },
          title,
          description,
          files: { set: files }
        });
      } else if (addType === VARIFY) {
        return prisma.createMiniPost({
          user: {
            connect: {
              id: user.id
            }
          },
          varifiedPost: {
            connect: {
              id: postId
            }
          },
          title,
          description,
          files: { set: files }
        });
      } else {
        throw Error("You can't do that");
      }
    }
  }
};
