import { prisma } from "../../../../generated/prisma-client";
import { getMinMaxFilterIndex } from "../../../utils";

export default {
  Mutation: {
    addMyFilter: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const {
        title,
        file,
        filter,
        artist,
        postType,
        keyword,
        kind,
        location,
        alarmSet
      } = args;

      if (filter === undefined) {
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
              {
                kind_every: {
                  id_in: kind
                }
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

        if (searchedFilters[0] === undefined) {
          // 해당하는 필터가 없는 경우 필터를 생성

          let filterIndex = (await getMinMaxFilterIndex("MAX")) + 1;

          return prisma.createMyFilter({
            title,
            file,
            filter: {
              create: {
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
                filterIndex
              }
            },
            alarmSet,
            user: { connect: { id: user.id } }
          });
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

            let filterIndex = (await getMinMaxFilterIndex("MAX")) + 1;

            return prisma.createMyFilter({
              title,
              file,
              filter: {
                create: {
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
                  filterIndex
                }
              },
              alarmSet,
              user: { connect: { id: user.id } }
            });
          } else {
            // 해당하는 필터가 있는 경우 필터를 연결
            return prisma.createMyFilter({
              title,
              file,
              filter: { connect: { id: correctFilter.id } },
              alarmSet,
              user: { connect: { id: user.id } }
            });
          }
        }
      } else {
        return prisma.createMyFilter({
          title,
          file,
          filter: { connect: { id: filter } },
          alarmSet,
          user: { connect: { id: user.id } }
        });
      }
    }
  }
};
