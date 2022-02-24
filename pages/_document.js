import * as React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { GA_ID } from "../utils/ga";

export default function Document() {
  const IS_PROD = process.env.NODE_ENV !== "development";
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content="Funk-27" />
        <meta name="author" content="Aid Thompsin" />{" "}
        <meta
          name="keywords"
          content="media, journalism, technology, politics, dystopia, comedy, humourist, humorist, sarcasm"
        />{" "}
        {IS_PROD && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
    
              gtag('config', '${GA_ID}');
            `,
              }}
            />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
