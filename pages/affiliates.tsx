import * as React from "react";
import Head from "next/head";
import { Grid } from "@mui/material";
import Layout from "../components/Layout";
import { ContentCard } from "../components/ContentCard";

export const PageAffiliates = () => {
  return (
    <Layout>
      <Head>
        <title>Affiliates</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="http://www.timeline.tv/wp-content/uploads/2019/06/O8A3580-copy-2.png"
        />
        <meta name="twitter:creator" content="@aidThompsin" />
        <meta name="twitter:site" content="@aidThompsin" />

        <meta property="og:title" content={`F27 | Affiliates`} key="title" />

        <meta
          name="description"
          content="We work with some of the most exciting names coming up in the worlds of Comedy and Politics."
        />

        <meta
          property="og:description"
          content="Funk-27 is a platform for Political discussion and Dystopian blogs & podcasts. We work with some exciting names."
          key="description"
        />

        <meta
          property="og:image"
          content="http://www.timeline.tv/wp-content/uploads/2019/06/O8A3580-copy-2.png"
          key="seo affiliates studio image"
        />
      </Head>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <ContentCard
            title="SuperTanskiii"
            description="SuperTanskiii is a progressive political humourist who can be found mocking the near-daily Tory scandals, on Twitter and TikTok. Her /'Dystopia Warning!/' intros and incredulous and sarcastic style have made her one of the most exciting political contributors since Jonathan Pie."
            backgroundArtworkSrc="http://www.timeline.tv/wp-content/uploads/2019/06/O8A3580-copy-2.png"
            artworkAlt="supertanskiii"
            profileImgSrc="https://cdn.ko-fi.com/cdn/useruploads/post/67265d07-03ca-40e1-a4bd-43f1917d8899_b1be46fe-92c8-4cb7-a0d2-e423ef409c89.jpeg"
            slug="/episode-49-tan-daviemoo"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <ContentCard
            title="DavieMoo"
            description="DavieMoo is a prominent Blogger and Politcal commentator on Twitter. He is speaks eloquently about Trans rights, inequality and corruption. Check out his vitriolic, humorous and necessary writing at PoliticallyEnraged.com"
            backgroundArtworkSrc="http://www.timeline.tv/wp-content/uploads/2019/06/O8A3580-copy-2.png"
            artworkAlt="daviemoo"
            profileImgSrc="https://daviemoo.files.wordpress.com/2021/01/image.jpg?w=200"
            slug="/episode-49-tan-daviemoo"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <ContentCard
            title="John Left of the Countryside"
            description="John LOTC is a left-leaning voice on TikTok and endless campaigner of Vape culture. He speaks passionately about removing the Tories from power and getting people greater exposure to the addiction busting potential of VapeLife."
            backgroundArtworkSrc="https://i.ytimg.com/vi/TDjJgr2MHzo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBmVoo2dgEIuocua-ZEnOiJB5F3xg"
            artworkAlt="John LOTC"
            profileImgSrc="https://images.prismic.io/funk27/acf21f78-4052-4109-874b-281ed9c0d907_Screenshot+2021-05-15+at+07.16.20.png?auto=compress,format&rect=0,45,1018,1018&w=90&h=90"
            slug="/episode-46-john-loc"
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default PageAffiliates;
