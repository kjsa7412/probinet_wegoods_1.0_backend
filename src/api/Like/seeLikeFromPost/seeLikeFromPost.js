import { prisma } from "../../../../generated/prisma-client";

const POST = "POST";
const LIFEPOST = "LIFEPOST";
const MEMBER = "MEMBER";

export default {
  Query: {
    seeLikeFromPost: async (_, args) => {
      const { postId, lifePostId } = args;

      if (postId !== "") {
        return prisma.likes({
          where: {
            post: { id: postId }
          }
        });
      } else if (lifePostId !== "") {
        return prisma.likes({
          where: {
            lifePost: { id: lifePostId }
          }
        });
      } else {
      }
    }
  }
};
