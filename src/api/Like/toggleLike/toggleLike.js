import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;

      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      };

      try {
        const existingLike = await prisma.$exists.like(filterOptions);
        const post = await prisma.post({ id: postId });

        if (existingLike && post !== null) {
          const like = await prisma.likes({ where: filterOptions });

          if (like !== null) {
            await prisma.updatePost({
              data: {
                likeCount: post.likeCount - 1,
                likes: { delete: { id: like[0].id } }
              },
              where: { id: postId }
            });
          }
        } else {
          if (post !== null) {
            await prisma.updatePost({
              data: {
                likeCount: post.likeCount + 1,
                likes: {
                  create: { user: { connect: { id: user.id } } }
                }
              },
              where: { id: postId }
            });
          } else {
            return false;
          }
        }
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
