import { prisma } from "../../../generated/prisma-client";

export default {
  LifePost: {
    comments: ({ id }) => prisma.lifePost({ id }).comments(),
    user: ({ id }) => prisma.lifePost({ id }).user(),
    likes: ({ id }) => prisma.lifePost({ id }).likes(),

    isLiked: (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            lifePost: {
              id
            }
          }
        ]
      });
    },

    likeCount: parent =>
      prisma
        .likesConnection({
          where: { lifePost: { id: parent.id } }
        })
        .aggregate()
        .count(),

    commentCount: parent =>
      prisma
        .commentsConnection({
          where: { lifePost: { id: parent.id } }
        })
        .aggregate()
        .count()
  }
};
