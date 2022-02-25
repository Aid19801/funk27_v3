import * as React from "react";
import fetch from "node-fetch";
import { getEndpoint, createClient } from "@prismicio/client";
import ReactPlayer from "react-player";
import { useTheme } from "@mui/material/styles";
import Layout from "../../components/Layout";
import { useMainContext } from "../../context/main";
import {
  Typography,
  useMediaQuery,
  Grid,
  Box,
  Divider,
  Card,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Podcasts, YouTube } from "@mui/icons-material";
import Head from "next/head";
import { fireEvent } from "../../utils/ga";
type Props = {
  data: any;
};

const ChipInIconButton = ({ uid, externalLink, imgSrc, alt, text }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Link href={externalLink}>
      <a target="_blank">
        <Box
          onClick={() =>
            fireEvent("chip_in", {
              event_category: "revenue",
              event_label: uid,
            })
          }
          className="chipIn__container"
          sx={{
            borderRadius: 25,
            mb: isDesktop ? "inherit" : 4,
            px: 5,
            py: 1,
          }}
        >
          <img className="chipIn__icon" src={imgSrc} alt={alt} />
          <Typography
            sx={{ fontSize: 10, color: "black", textAlign: "center" }}
          >
            {text}
          </Typography>
        </Box>
      </a>
    </Link>
  );
};
const PagePodcast = ({ data }: Props) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { toggleLoading } = useMainContext();

  React.useEffect(() => {
    if (data) {
      toggleLoading(false);
    }
  }, [data]);
  return (
    <Layout title={`${data.title1[0].text}`}>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={data["podc_ep_twitter_img"].url} />
        <meta name="twitter:creator" content="@aidThompsin" />
        <meta name="twitter:site" content="@aidThompsin" />

        <meta name="description" content={data.description[0].text} />

        <meta
          property="og:title"
          content={`F27 | Aid Thompsin & Other Disappointments`}
          key="title"
        />

        <meta
          property="og:description"
          content={data.description[0].text}
          key="description"
        />

        <meta
          property="og:image"
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
          mt: 4,
        }}
      >
        {data && data.title1[0].text}
      </Typography>
      <Grid
        container
        spacing={2}
        maxWidth="1250px"
        justifyContent={isDesktop ? "flex-start" : "center"}
      >
        <Grid item xs={12} sm={10} md={6}>
          <Card sx={{ width: "90%", height: "400px", px: 2, py: 2 }}>
            {data?.video?.embed_url ? (
              <>
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={data.video.embed_url}
                />
              </>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: "darkred" }}>Oh no!</Typography>
                <Typography sx={{ color: "black" }}>
                  Video Link appears to be down. Try the YouTube directly...
                </Typography>
                <a
                  href="https://youtube.com/adrianthompsoncomedy"
                  style={{
                    color: "black",
                    fontFamily: "Merriweather",
                    marginTop: 16,
                  }}
                >
                  Click Here
                </a>
                <Typography sx={{ color: "black" }}>
                  Or use the Spotify, Apple and YouTube links provided!
                </Typography>
              </Box>
            )}
          </Card>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Card
            sx={{
              width: "90%",
              px: 2,
              py: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: isDesktop ? "inherit" : "30px",
                fontFamily: "Merriweather",
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

          <Card
            sx={{
              width: "90%",
              px: 2,
              py: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: isDesktop ? "inherit" : "30px",
                color: "darkgrey",
                fontFamily: "Merriweather",
              }}
            >
              "Aid Thompsin & Other Disappointments" is a podcast where i get to
              interview and probe some interesting people. The topics range from
              Politics to Tech to me just talking shit with people over a beer.
            </Typography>

            <Box
              sx={{
                width: isDesktop ? "80%" : "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
                px: 3,
              }}
            >
              <ChipInIconButton
                uid="view_patreon"
                imgSrc="/patreonLogo.png"
                alt="patreon"
                text="Become A Patreon"
                externalLink="https://patreon.com/aidthompsin"
              />
              <ChipInIconButton
                uid="view_buyMeACoffee"
                imgSrc="/coffee_cup.gif"
                alt="dancing coffee cup"
                text="Buy Me A Coffee"
                externalLink="https://www.buymeacoffee.com/aidthompsin"
              />
            </Box>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            mb: 4,
            // pl: isDesktop ? "inherit" : "0px !important",
          }}
        >
          <Divider sx={{ mb: 4, mt: 4, width: "90%" }} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  // @ts-ignore
  const endpoint: any = getEndpoint("funk27");
  // @ts-ignore
  const client: any = createClient(endpoint, { fetch });
  const allPodcastData: any = await client.getByUID("page", "podcast");

  const firstSeason = allPodcastData.data.body[0].items;
  const secondSeason = allPodcastData.data.body[1].items;
  const thirdSeason = allPodcastData.data.body[2].items;
  const all = [...firstSeason, ...secondSeason, ...thirdSeason];

  console.log("PODCAST PAGE DATA ", all[0].episode_slug);
  const data = all.filter(
    (each) => each.episode_slug[0].text === context.params.id
  )[0];

  return { props: { data } };
}

export default PagePodcast;
