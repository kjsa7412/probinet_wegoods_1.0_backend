import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addLifePost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { files, title, description } = args;
      const lifePost = await prisma.createLifePost({
        files: { set: files },
        title,
        description,
        user: { connect: { id: user.id } }
      });

      return lifePost;
    }
  }
};
