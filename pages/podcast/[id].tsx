import * as React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import fetch from "node-fetch";
import * as prismic from "@prismicio/client";
import { useTheme } from "@mui/material/styles";
import { User } from "../../interfaces";
import { sampleUserData } from "../../utils/sample-data";
import Layout from "../../components/Layout";
import List from "../../components/List";
import { useMainContext } from "../../context/main";
import {
  Typography,
  useMediaQuery,
  Grid,
  Box,
  Button,
  Divider,
  Card,
} from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { Facebook, Podcasts, YouTube } from "@mui/icons-material";
import Head from "next/head";
type Props = {
  data: any;
};

const PagePodcast = ({ data }: Props) => {
  const router = useRouter();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const { toggleLoading } = useMainContext();
  if (data) {
    toggleLoading(false);
  }
  return (
    <Layout title={`Podcast | ${data.title1[0].text}`}>
      <Head>
        <title>{data.title1[0].text}</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={data["podc_ep_twitter_img"].url} />
        <meta name="twitter:creator" content="@aidThompsin" />
        <meta name="twitter:site" content="@aidThompsin" />

        <meta
          property="og:title"
          //@ts-ignore
          content={`F27 | Aid Thompsin & Other Disappointments`}
          key="title"
        />

        <meta
          property="og:description"
          //@ts-ignore
          content={data.description[0].text}
          key="description"
        />

        <meta
          property="og:image"
          //@ts-ignore
          content={data["podc_ep_twitter_img"].url}
          key="seo blog share image"
        />
      </Head>
      <Typography
        variant="h1"
        color="secondary"
        sx={{
          mb: 5,
          color: (theme) => theme.palette.secondary.light,
          fontSize: isDesktop ? 60 : 80,
        }}
      >
        {data && data.title1[0].text}
      </Typography>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            pl: isDesktop ? "inherit" : "0px !important",
          }}
        >
          {data && (
            <Image
              onClick={() => window.open(data.video.embed_url)}
              className="blog__mainImage"
              src={data["podc_ep_twitter_img"].url}
              alt={
                data["podc_ep_twitter_img"].alt ||
                "blog man talking politics dystopia"
              }
              {...data["podc_ep_twitter_img"].dimensions}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            pl: isDesktop ? "inherit" : "0px !important",
          }}
        >
          <Card sx={{ display: "flex", flexDirection: "column", padding: 4 }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: isDesktop ? "inherit" : "30px",
                fontWeight: isDesktop ? 300 : 400,
              }}
            >
              {data && data.description[0].text}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-around",
                mt: 2,
              }}
            >
              <Image
                className="podcast__socials"
                onClick={() =>
                  window.open(
                    "https://open.spotify.com/show/6mrjI8ZioqWgcHpNIBa3uU?si=2e878a4de4e14ac3"
                  )
                }
                src="/spotify.png"
                height={40}
                width={40}
                alt="spotify logo"
              />
              <Image
                className="podcast__socials"
                onClick={() => window.open(data.video.embed_url)}
                src="/youtube.png"
                height={40}
                width={40}
                alt="youtube logo"
              />
              <Image
                className="podcast__socials"
                onClick={() =>
                  window.open(
                    "https://podcasts.apple.com/gb/podcast/aid-thompsin-other-disappointments/id1543205608"
                  )
                }
                src="/podcast.png"
                height={40}
                width={40}
                alt="podcast app logo"
              />
            </Box>
          </Card>

          <Divider sx={{ mb: 4, width: "90%" }} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  // @ts-ignore
  const endpoint: any = prismic.getEndpoint("funk27");
  // @ts-ignore
  const client: any = prismic.createClient(endpoint, { fetch });
  const allPodcastData: any = await client.getByUID("page", "podcast");

  const firstSeason = allPodcastData.data.body[0].items;
  const secondSeason = allPodcastData.data.body[1].items;
  const all = [...firstSeason, ...secondSeason];

  const data = all.filter(
    (each) => each.episode_slug[0].text === context.params.id
  )[0];

  return { props: { data } };
}

export default PagePodcast;
