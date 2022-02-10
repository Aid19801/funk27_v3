import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="Discontent Providers. We create and serve the Blogs and Podcasts that keep you laughing like a drain while doom-scrolling deeper and deeper into an ocean of existential abyss."
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
