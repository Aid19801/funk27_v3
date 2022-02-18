import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import Script from "next/script";
import { MainContextProvider } from "../context/main";
import { theme } from "../theme";
// import Analytics from "analytics";
// import googleAnalytics from "@analytics/google-analytics";
// import { AnalyticsProvider } from "use-analytics";
import "./styles.css";

/* Initialize analytics & load plugins */
// const analytics = Analytics({
//   app: "funk-27",
//   plugins: [
//     googleAnalytics({
//       trackingId: "UA-179141332-1",
//     }),
//   ],
// });

export default function Application({ Component, pageProps }) {
  console.log("appjs");
  return (
    <MainContextProvider>
      <ThemeProvider theme={theme}>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-W925CBM');`,
            }}
          ></script>
          <link rel="icon" href="/favicon.svg" />
          <meta
            name="google-site-verification"
            content="5VDospE_8sb6L8r7hwJyTYFsv4SRXZ4BTn7q4suVtI4"
          />
        </Head>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W925CBM"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          ></iframe>
            `,
          }}
        ></noscript>
        <Component {...pageProps} />
      </ThemeProvider>
    </MainContextProvider>
  );
}
