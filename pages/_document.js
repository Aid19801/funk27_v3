import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  console.log("docJs");
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="Discontent Providers. Blogs & Podcasts that keep you laughing like a drain while doom-scrolling deeper into the existential abyss"
        />{" "}
        <meta name="author" content="Aid Thompsin" />{" "}
        <meta
          name="keywords"
          content="media, journalism, technology, politics, dystopia, comedy, humourist, humorist, sarcasm"
        />{" "}
        <meta name="application-name" content="Funk-27" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
