import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
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
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
            <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W925CBM"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          ></iframe>
        </noscript>
            `,
          }}
        ></noscript>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
