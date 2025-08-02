// import { GitHub, Google } from "arctic";
// import 'dotenv/config';
// import { Lucia } from "lucia";
// import { drizzle } from "drizzle-orm/node-postgres";


// export const lucia = new Lucia(adapter, {
//     sessionCookie: {
//         attributes: {
//             secure: !process.env.NODE_ENV || process.env.NODE_ENV === "production",
// 		}
// 	},
// 	getUserAttributes: (attributes) => {
//         return {
//             // attributes has the type of DatabaseUserAttributes
// 			githubId: attributes.github_id,
// 			googleId: attributes.google_id,
// 			username: attributes.username
// 		};
// 	}
// });

// declare module "lucia" {
//     interface Register {
// 		Lucia: typeof lucia;
// 		DatabaseUserAttributes: DatabaseUserAttributes;
// 	}
// }


// interface DatabaseUserAttributes {
//     github_id: number;
//     google_id: string;
//     username: string;
// }

// export const github = new GitHub(
//   process.env.GITHUB_CLIENT_ID!,
//   process.env.GITHUB_CLIENT_SECRET!,
//   process.env.GITHUB_REDIRECT_URI!
// );

// export const google = new Google(
//   process.env.GOOGLE_CLIENT_ID!,
//   process.env.GOOGLE_CLIENT_SECRET!,
//   process.env.GOOGLE_REDIRECT_URI!
// );