import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const {
        files,
        title,
        postFilter,
        wantFilter,
        postQuiz,
        miniPostsForVarify,
        price,
        description,
        varifyDesc,
        deliveryPrice,
        coord,
        address
      } = args;
      const post = await prisma.createPost({
        files: { set: files },
        title,
        postFilter: {
          connect: postFilter
        },
        wantFilter: {
          connect: wantFilter
        },
        postQuiz: {
          connect: postQuiz.map(postQuiz => {
            return { id: postQuiz };
          })
        },
        miniPostsForVarify: {
          connect: miniPostsForVarify.map(miniPostsForVarify => {
            return { id: miniPostsForVarify };
          })
        },
        postQuiz: price,
        description,
        varifyDesc,
        deliveryPrice,
        coord,
        address,
        user: { connect: { id: user.id } }
      });

      return post;
    }
  }
};
