import Head from "next/head";
import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Outfit } from "next/font/google";
import '../styles/index.scss'
import MainProvider from "../providers/MainProvider";
config.autoAddCss = false;


function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <link rel="icon" href="/pngegg.png" />
      </Head>
      <MainProvider Component={Component}>
        <Component {...pageProps}/>
      </MainProvider>
    </UserProvider>
  );
}

export default App;
