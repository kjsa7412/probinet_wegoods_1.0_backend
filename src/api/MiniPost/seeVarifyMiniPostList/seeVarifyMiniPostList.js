import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeVarifyMiniPostList: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { postId } = args;

      const myPost = await prisma.$exists.post({
        id: postId,
        user: { id: user.id }
      });

      // 만약에 post 가 본인 것이라면 해당 post 에 올라와 있는 모든 varyfyMinipost 를 보여준다.
      // post 가 본인것이 아니라면 자기가 올린 varyfyMinipost 만 보여준다

      if (myPost) {
        return prisma.miniPosts({
          where: {
            varifiedPost: { id: postId }
          }
        });
      } else {
        return prisma.miniPosts({
          where: {
            AND: [
              {
                user: {
                  id: user.id
                }
              },
              {
                varifiedPost: { id: postId }
              }
            ]
          }
        });
      }
    }
  }
};
