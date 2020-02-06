import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    comments: ({ id }) => prisma.post({ id }).comments(),
    user: ({ id }) => prisma.post({ id }).user(),
    likes: ({ id }) => prisma.post({ id }).likes(),
    registedMiniPosts: ({ id }) => prisma.post({ id }).registedMiniPosts(),
    participants: ({ id }) => prisma.post({ id }).participants(),
    wantFilter: ({ id }) => prisma.post({ id }).wantFilter(),
    postFilter: ({ id }) => prisma.post({ id }).postFilter(),
    postQuiz: ({ id }) => prisma.post({ id }).postQuiz(),

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
            post: {
              id
            }
          }
        ]
      });
    },

    // likeCount: parent =>
    //   prisma
    //     .likesConnection({
    //       where: { post: { id: parent.id } }
    //     })
    //     .aggregate()
    //     .count(),

    commentCount: parent =>
      prisma
        .commentsConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count(),

    participantsCount: ({ id }) =>
      prisma
        .usersConnection({ where: { inPosts_some: { id } } })
        .aggregate()
        .count()
  },

  User: {
    myLocation: ({ id }) => prisma.user({ id }).myLocation()
  }
};
