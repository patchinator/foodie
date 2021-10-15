import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import Navbar from "../components/UI/Navbar";
import { AuthContextProvider } from "../store/auth-context";
import Head from "next/head";
import theme from "../styles/theme";
import "../styles/globals.css";
import Background from "../styles/Background";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Foodie | What are you cooking?</title>
      </Head>
      <AuthContextProvider>
        <ChakraProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Background>
            <Navbar />
            <Component {...pageProps} />
          </Background>
        </ChakraProvider>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
