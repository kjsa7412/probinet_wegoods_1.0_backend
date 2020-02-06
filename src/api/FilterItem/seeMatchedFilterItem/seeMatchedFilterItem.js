import { prisma } from "../../../../generated/prisma-client";

const ARTIST = "ARTIST";
const KIND = "KIND";
const LOCATION = "LOCATION";
const POSTTYPE = "POSTTYPE";

export default {
  Query: {
    seeMatchedFilterItem: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { artistList, kindList, locationList, postTypeList, action } = args;

      // ※ 최종 결과 저장용
      const resultItems = [];

      // 1-1. 조건에 맞는 모든 Filter 찾기 ( Artist, Kind, Location )
      const matchedFilters = await prisma.filters({
        where: {
          AND: [
            {
              OR:
                artistList.length === 0
                  ? {}
                  : artistList.map(artistList => {
                      return { artist_some: { id: artistList } };
                    })
            },
            {
              OR:
                kindList.length === 0
                  ? {}
                  : kindList.map(kindList => {
                      return { kind_some: { id: kindList } };
                    })
            },
            {
              OR:
                locationList.length === 0
                  ? {}
                  : locationList.map(locationList => {
                      return { location_some: { id: locationList } };
                    })
            },
            {
              // post에 연결된 Filter가 존재하는지 체크
              postFilter_some: {}
            }
          ]
        }
      });

      for (const oneOfFilter of matchedFilters) {
        // 1-2. 조건에 맞는 모든 Filter 찾기 ( PostType )
        const checkPostType =
          postTypeList.length === 0
            ? true
            : postTypeList.some(function(valueOfPostTypeList) {
                return valueOfPostTypeList === oneOfFilter.postType[0];
              });

        // 2. 모든 조건을 만족하는 Filter
        if (checkPostType) {
          // 3. 연결된 post의 개수를 구한다.
          const connectedPostCount = await prisma
            .postsConnection({ where: { postFilter: { id: oneOfFilter.id } } })
            .aggregate()
            .count();

          // 4. 해당 필터에 연결된 아이템들을 가져온다.
          let itemsOfFilter;

          switch (action) {
            case ARTIST:
              itemsOfFilter = await prisma.artists({
                where: {
                  filters_some: { id: oneOfFilter.id }
                }
              });
              break;
            case KIND:
              itemsOfFilter = await prisma.kinds({
                where: {
                  filters_some: { id: oneOfFilter.id }
                }
              });
              break;
            case LOCATION:
              itemsOfFilter = await prisma.locations({
                where: {
                  filters_some: { id: oneOfFilter.id }
                }
              });
              break;
            case POSTTYPE:
              itemsOfFilter = oneOfFilter.postType;
              break;
            default:
              itemsOfFilter = [];
          }

          // 5. 가져온 아이템들을 돌면서 아래 내용 수행
          for (const oneOfItems of itemsOfFilter) {
            // 6. 데이터 스트럭처 재정의
            let insertItem = {};

            switch (action) {
              case ARTIST:
                (insertItem.id = oneOfItems.id),
                  (insertItem.text = oneOfItems.name),
                  (insertItem.count = connectedPostCount);

                break;
              case KIND:
                (insertItem.id = oneOfItems.id),
                  (insertItem.text = oneOfItems.text),
                  (insertItem.count = connectedPostCount);

                break;
              case LOCATION:
                (insertItem.id = oneOfItems.id),
                  (insertItem.text = oneOfItems.text),
                  (insertItem.count = connectedPostCount);
                break;
              case POSTTYPE:
                (insertItem.id = oneOfItems),
                  (insertItem.text = oneOfItems),
                  (insertItem.count = connectedPostCount);
                break;
              default:
              // code block
            }

            // 7. 기존에 저장한 아티스트와 매칭여부 확인
            const isMatched = resultItems.some(function(valueOfResultItems) {
              // 8. 매칭된다면 아티스트 Count를 Update
              if (valueOfResultItems.id === insertItem.id) {
                valueOfResultItems.count += insertItem.count;
                return true;
              } else {
                return false;
              }
            });

            // 9. 매칭이 되지 않는다면 아티스트를 저장한다.
            if (isMatched === false) {
              resultItems.push(insertItem);
            }
          }
        }
      }

      return resultItems;
    }
  }
};
