// export const USER_FRAGMENT = `
//     id
//     username
//     avatar
// `;

// export const COMMENT_FRAGMENT = `
//     id
//     text
//     user {
//         ${USER_FRAGMENT}
//     }
// `;

// export const MESSAGE_FRAGMENT = `
//     id
//     text
//     from {
//         ${USER_FRAGMENT}
//     }
// `;

// export const ONE_POST_FRAGMENT = `
//     fragment PostParts on Post{
//         id
//         files,
//         title,
//         price,
//         description,
//         varifyDesc,
//         deliveryPrice,
//         coord,
//         address
//         comments {
//             ${COMMENT_FRAGMENT}
//         }
//         user {
//             ${USER_FRAGMENT}
//         }
//     }
// `;

// export const ROOM_FRAGMENT = `
//     fragment RoomParts on Room {
//         id
//         participants {
//             ${USER_FRAGMENT}
//         }
//         messages {
//             ${MESSAGE_FRAGMENT}
//         }
//     }
// `;

/*
export const USER_FRAGMENT = `
    fragment UserParts on User {
        id
        loginSecret
        phoneNumber
        email
        password
        username
        avatar
        bio
        background
        valid

        following {
            id
            username
        }

        followers {
            id
            username
        }

        posts {
            id
            title
        }
        inPosts {
            id
        }
        rooms {
            id
        }
        roomsOwner {
            id
        }
        favorites {
            id
        }
        orders {
            id
        }
        myFilter {
            id
        }
        likes {
            id
        }
        comments {
            id
        }
        
        quizzes {
            id
        }
        
        alarms {
            id
        }

        alarmsFromUser {
            id
        }

        popupSet {
            id
        }

        miniPosts {
            id
        }

        varifyedPosts {
            id
        }

        quizPassPosts {
            id
        }

        reportedPosts {
            id
        }

        reportedRooms {
            id
        }

        receiveReports {
            id
        }

        sendReports {
            id
        }        
    } `;
*/
