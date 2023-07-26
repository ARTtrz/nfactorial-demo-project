import Head from "next/head";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSession } from "@auth0/nextjs-auth0";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Home() {
  const { isLoading, error, user } = useUser();
  const [isHere, setIsHere] = useState(true)


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  async function createIndexAndEmbeddings() {
    try {
      const result = await fetch('/api/setup/setup', {
        method: "POST"
      })
      console.log(result, "result")
      const json = await result.json()
      console.log('result: ', json)
    } catch (err) {
      console.log('err:', err)
    }
  }

  return (
    <>
      <Head>
        <title>Chatty Pete - Login or Signup</title>
      </Head>

      <div className="flex min-h-screen w-full items-center justify-center bg-gray-800 text-center text-white">
        <div>
          <div>
            <FontAwesomeIcon
              icon={faRobot}
              className="text-emerald-200 text-6xl mb-2"
            />
          </div>
          <h1 className="text-4xl font-bold">Welcome to Inspector AI Bot</h1>
          <p className="text-lg mt-2">Log in with your account to continue</p>
          <div className="mt-4 flex justify-center gap-3">
            {isHere && (
              <>
                <Link href="/api/auth/login" className="btn">
                  Login
                </Link>

                <button onClick={createIndexAndEmbeddings}>Create index and embeddings</button>
                
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