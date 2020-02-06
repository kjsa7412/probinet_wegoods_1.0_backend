import { prisma } from "../../../../generated/prisma-client";
import { getMinMaxFilterIndex } from "../../../utils";

export default {
  Query: {
    searchArtistOnFilter: async (_, args) => {
      const { kind = [], keyword = [], location = [], postType = [] } = args;
      let array = [];

      if (
        kind.length === 0 &&
        keyword.length === 0 &&
        location.length === 0 &&
        postType.length === 0
      ) {
        return [];
      }

      // 검색 된 filter 들을 통해서 해당하는 filter 를 가져 온다.
      let searchedFilters = await prisma.filters({
        where: {
          AND: array.concat(
            //kind
            kind.length !== 0
              ? kind.map(kind => {
                  return { kind_some: { id: kind } };
                })
              : {},
            //keyword
            keyword.length !== 0
              ? keyword.map(keyword => {
                  return { keyword_some: { id: keyword } };
                })
              : {},

            //location
            location.length !== 0
              ? location.map(location => {
                  return { location_some: { id: location } };
                })
              : {},
            [{ postFilter_some: { id_not_in: [] } }]
          )
        }
      });

      // postType 이 있는 경우에는 한번더 걸러야 한다.
      if (
        postType.length !== 0 &&
        searchedFilters !== undefined &&
        searchedFilters !== 0
      ) {
        searchedFilters = searchedFilters.filter(filter => {
          for (const item of postType) {
            if (filter.postType.includes(item)) {
              return true;
            }
          }
          return false;
        });
      }

      // 해당 되는 필터로 부터 해당하는 artist 를 가져온다.
      let searchedArtist = await prisma.artists({
        where: {
          filters_some: {
            id_in:
              searchedFilters !== undefined && searchedFilters !== 0
                ? searchedFilters.map(filter => {
                    return filter.id;
                  })
                : []
          }
        }
      });

      // 각 artist 별 포함 된 filter들을 가져와서 같이 저장한다
      if (searchedArtist !== undefined && searchedArtist.length !== 0) {
        searchedArtist = await searchedArtist.map(async artist => {
          let filtersOnArtist = await prisma.filters({
            where: {
              AND: array.concat(
                // artist
                { artist_some: { id: artist.id } },

                //kind
                kind.length !== 0
                  ? kind.map(kind => {
                      return { kind_some: { id: kind } };
                    })
                  : {},

                //keyword
                keyword.length !== 0
                  ? keyword.map(keyword => {
                      return { keyword_some: { id: keyword } };
                    })
                  : {},

                //location
                location.length !== 0
                  ? location.map(location => {
                      return { location_some: { id: location } };
                    })
                  : {},
                [{ postFilter_some: { id_not_in: [] } }]
              )
            }
          });

          // postType 이 있는 경우에는 한번더 걸러야 한다.
          if (
            postType.length !== 0 &&
            filtersOnArtist !== undefined &&
            filtersOnArtist !== 0
          ) {
            filtersOnArtist = filtersOnArtist.filter(filter => {
              for (const item of postType) {
                if (filter.postType.includes(item)) {
                  return true;
                }
              }
              return false;
            });
          }

          // filter id 들만 배열로 만들어서 저장
          // postsCount 는 따로 Artist.js 에서 구해서 들어 간다.
          if (filtersOnArtist !== undefined && filtersOnArtist.length !== 0) {
            artist.filterIdOnOption = filtersOnArtist.map(item => {
              return item.id;
            });
          }

          return artist;
        });
      }
      return searchedArtist;
    }
  }
};
