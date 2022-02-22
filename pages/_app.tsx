import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import ReactGA from "react-ga";
import { GA_ID } from "../utils/ga";
import { MainContextProvider } from "../context/main";
import { theme } from "../theme";
import "./styles.css";

export default function Application({ Component, pageProps }) {
  // const IS_PROD = process.env.NODE_ENV !== "development";

  React.useEffect(() => {
    // if (IS_PROD) {
    ReactGA.initialize(GA_ID);
    // }
  }, []);

  return (
    <MainContextProvider>
      <ThemeProvider theme={theme}>
        <Head>
          <link rel="icon" href="/favicon.svg" />
          <meta
            name="google-site-verification"
            content="5VDospE_8sb6L8r7hwJyTYFsv4SRXZ4BTn7q4suVtI4"
          />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </MainContextProvider>
  );
}
