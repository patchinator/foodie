import Head from "next/head";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { Fragment } from "react";
import PostForm from "../components/postForm";

export default function Home() {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostForm />
    </Fragment>
  );
}
