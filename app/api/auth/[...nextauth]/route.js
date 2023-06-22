import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/Models/users.models";


const handler = NextAuth({
  // Configure one or more authentication providers

  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
        const sessionUser = await User.findOne({
          email: session.user.email,
        });

        session.user.id=sessionUser._id.toString();

        return session;
    },
    async signIn({ profile }) {

        // console.log("Profile",profile);
      try {
        await connectToDB();

        const userExists = await User.findOne({
          email: profile.email,
        });

        if(!userExists)
        {
         const newUser = new User({
           email: profile.email,
           username:profile.name,
           image:profile.picture
         });
         newUser.save();
        }

        return true;
      } catch (error) {
        console.log("Error", error);
        return false;
      }
    },
  },
});



export { handler as GET, handler as POST };
