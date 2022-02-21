import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import Script from "next/script";
import { MainContextProvider } from "../context/main";
import { theme } from "../theme";
import "./styles.css";

export default function Application({ Component, pageProps }) {
  console.log("appjs");
  return (
    <MainContextProvider>
      <ThemeProvider theme={theme}>
        <Head>
          <link rel="icon" href="/favicon.svg" />
          <meta
            name="google-site-verification"
            content="5VDospE_8sb6L8r7hwJyTYFsv4SRXZ4BTn7q4suVtI4"
          />
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-Z1WSJRTW2F"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-Z1WSJRTW2F');
            `}
          </Script>
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </MainContextProvider>
  );
}
