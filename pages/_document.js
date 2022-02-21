import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { GA_ID } from "../utils/ga";

export default function Document() {
  console.log("docJs");
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content="Funk-27" />
        <meta
          name="description"
          content="Discontent Providers. Blogs & Podcasts that keep you laughing like a drain while doom-scrolling deeper into the existential abyss"
        />{" "}
        <meta name="author" content="Aid Thompsin" />{" "}
        <meta
          name="keywords"
          content="media, journalism, technology, politics, dystopia, comedy, humourist, humorist, sarcasm"
        />{" "}
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
  
            gtag('config', ${GA_ID});
          `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
