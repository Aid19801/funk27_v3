import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import { MainContextProvider } from "../context/main";
import { theme } from "../theme";
import "./styles.css";

export default function Application({ Component, pageProps }) {
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
