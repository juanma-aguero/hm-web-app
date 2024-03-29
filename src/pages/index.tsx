import Head from "next/head";
import { Inter } from "next/font/google";
import { UserProfile, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  user: UserProfile;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Hiremancer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <div>Hello {user.name}</div>
          <Link href="/api/auth/login">Login</Link>
          <Link href="/api/auth/logout">Logout</Link>
        </div>
      </main>
    </>
  );
};

export default withPageAuthRequired(Home);
