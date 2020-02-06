import { prisma } from "../../../../generated/prisma-client";
import { getMinMaxFilterIndex } from "../../../utils";

const POST_FILTER = "POST_FILTER";
const WANT_FILTER = "WANT_FILTER";

export default {
  Mutation: {
    addFilter: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const {
        artist,
        postType,
        keyword,
        kind,
        location,
        postId,
        action
      } = args;

      // 생성할 filter 가 이미 존재하는지 확인한다.
      const searchedFilters = await prisma.filters({
        where: {
          AND: [
            // artist
            {
              AND: artist.map(artist => {
                let some = { artist_some: { id: artist } };
                return some;
              })
            },
            {
              artist_every: {
                id_in: artist
              }
            },
            //keyword
            {
              AND: keyword.map(keyword => {
                let some = { keyword_some: { id: keyword } };
                return some;
              })
            },
            {
              keyword_every: {
                id_in: keyword
              }
            },
            //kind
            {
              AND: kind.map(kind => {
                let some = { kind_some: { id: kind } };
                return some;
              })
            },
            //location
            {
              AND: location.map(location => {
                let some = { location_some: { id: location } };
                return some;
              })
            },
            {
              location_every: {
                id_in: location
              }
            }
          ]
        }
      });

      let filterIndex = (await getMinMaxFilterIndex("MAX")) + 1;

      if (searchedFilters[0] === undefined) {
        // 해당하는 필터가 없는 경우 필터를 생성
        if (action === POST_FILTER) {
          return prisma.createFilter({
            postType: {
              set: postType
            },
            artist: {
              connect: artist.map(artist => {
                return { id: artist };
              })
            },
            keyword: {
              connect: keyword.map(keyword => {
                return { id: keyword };
              })
            },
            kind: {
              connect: kind.map(kind => {
                return { id: kind };
              })
            },
            location: {
              connect: location.map(location => {
                return { id: location };
              })
            },
            postFilter: {
              connect: {
                id: postId
              }
            },
            filterIndex
          });
        } else if (action === WANT_FILTER) {
          return prisma.createFilter({
            postType: {
              set: postType
            },
            artist: {
              connect: artist.map(artist => {
                return { id: artist };
              })
            },
            keyword: {
              connect: keyword.map(keyword => {
                return { id: keyword };
              })
            },
            kind: {
              connect: kind.map(kind => {
                return { id: kind };
              })
            },
            location: {
              connect: location.map(location => {
                return { id: location };
              })
            },
            wantFilter: {
              connect: {
                id: postId
              }
            },
            filterIndex
          });
        } else {
          throw Error("You can't do that. Action is undefined.");
        }
      } else {
        let correctFilter;
        // 필터가 있더라도 post type 이 다를 수 있다.
        for (var i = 0; i < searchedFilters.length; i++) {
          if (
            postType.length === searchedFilters[i].postType.length &&
            postType
              .sort()
              .every(
                (value, index) =>
                  value === searchedFilters[i].postType.sort()[index]
              )
          ) {
            correctFilter = searchedFilters[i];
            break;
          }
        }

        if (correctFilter === undefined) {
          // 정확하게 맞는 필터가 없으므로 새로 생성 한다.
          if (action === POST_FILTER) {
            return prisma.createFilter({
              postType: {
                set: postType
              },
              artist: {
                connect: artist.map(artist => {
                  return { id: artist };
                })
              },
              keyword: {
                connect: keyword.map(keyword => {
                  return { id: keyword };
                })
              },
              kind: {
                connect: kind.map(kind => {
                  return { id: kind };
                })
              },
              location: {
                connect: location.map(location => {
                  return { id: location };
                })
              },
              postFilter: {
                connect: {
                  id: postId
                }
              },
              filterIndex
            });
          } else if (action === WANT_FILTER) {
            return prisma.createFilter({
              postType: {
                set: postType
              },
              artist: {
                connect: artist.map(artist => {
                  return { id: artist };
                })
              },
              keyword: {
                connect: keyword.map(keyword => {
                  return { id: keyword };
                })
              },
              kind: {
                connect: kind.map(kind => {
                  return { id: kind };
                })
              },
              location: {
                connect: location.map(location => {
                  return { id: location };
                })
              },
              wantFilter: {
                connect: {
                  id: postId
                }
              },
              filterIndex
            });
          } else {
            throw Error("You can't do that. Action is undefined.");
          }
        } else {
          // 해당하는 필터가 있는 경우 필터를 연결
          console.log("이미 있음");
          return correctFilter;
        }
      }
    }
  }
};
