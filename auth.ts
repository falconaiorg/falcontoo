import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma";

// import prisma from "@/prisma";

// const TRIAL_DURATION = 14;

// const assignTrialUserProperties = async (userType: UserType) => {
//   const trialStartDate = new Date();
//   const trialEndDate = new Date(trialStartDate);
//   trialEndDate.setDate(trialStartDate.getDate() + TRIAL_DURATION);

//   return {
//     role: "TRIAL",
//     userType: userType,
//     subscriptionStart: trialStartDate,
//     subscriptionEnd: trialEndDate,
//   };
// };

// const handleProfile = async (profile: any, token: any, userType: UserType) => {
//   const existingUser: PrismaUser | null = await prisma.user.findUnique({
//     where: { email: profile.email },
//   });
//   if (existingUser && existingUser.userType !== userType) {
//     throw new Error("User type mismatch");
//   }
//   if (existingUser) {
//     const { sub, ...profileWithoutSub } = profile;
//     return {
//       id: profile.sub,
//       ...profileWithoutSub,
//     };
//   } else {
//     // Set trial user properties for new users
//     const trialUserProperties = await assignTrialUserProperties(userType);
//     return {
//       id: profile.sub, // Google returns the id as 'sub'
//       name: profile.name,
//       email: profile.email,
//       image: profile.picture,
//       ...trialUserProperties,
//     };
//   }
// };

// const googleProfileHandlerTeacher = async (profile: any, tokens: any) => {
//   return handleProfile(profile, tokens, "TEACHER");
// };

// const GoogleTeacherProvider = () => {
//   return Google({
//     clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//     profile: googleProfileHandlerTeacher,
//     authorization: {
//       params: {
//         prompt: "select_account",
//         access_type: "offline",
//         response_type: "code",
//       },
//     },
//   });
// };

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
