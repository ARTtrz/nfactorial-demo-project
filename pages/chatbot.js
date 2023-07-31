import Head from "next/head";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSession } from "@auth0/nextjs-auth0";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Chatbot() {
  const { isLoading, error, user } = useUser();
  const [isHere, setIsHere] = useState(true)


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Head>
        <title>Chatty Pete - Login or Signup</title>
      </Head>

      <div className="flex min-h-screen w-full items-center justify-center bg-primary text-center text-gray-700">
        <div>
          <div>

          </div>
          <h1 className="text-4xl font-bold">Welcome to Inspector AI Bot</h1>
          <p className="text-lg mt-2">Log in with your account to continue</p>
          <div className="mt-4 flex justify-center gap-3">
            {!user && (
              <>
                <Link href="/api/auth/login" className="btn">
                  Login
                </Link>


                
                <Link href="/api/auth/signup" className="btn">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  
  const session = await getSession(ctx.req, ctx.res);
  console.log(session)
  if (!!session) {
    console.log('test')
    return {
      redirect: {
        destination: "/chat",
      },
    };
  }

  return {
    props: {},
  };
};