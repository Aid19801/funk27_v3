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
import Image from "next/image";
import { Facebook, Podcasts, YouTube } from "@mui/icons-material";
import Head from "next/head";
type Props = {
  data: any;
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
                // fontWeight: isDesktop ? 300 : 400,
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
              mt: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: isDesktop ? "inherit" : "30px",
                // fontWeight: isDesktop ? 300 : 400,
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
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-around",
                mt: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: 40,
                }}
              >
                <Image
                  className="podcast__socials"
                  onClick={() => window.open("https://patreon.com/aidthompsin")}
                  src="/patreonLogo.png"
                  height={40}
                  width={40}
                  alt="patreon"
                />
                <Typography
                  variant="body1"
                  textAlign="center"
                  sx={{ fontSize: 9, color: "darkgrey" }}
                >
                  Support on Patreon
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: 40,
                }}
              >
                <Image
                  className="podcast__socials"
                  onClick={() =>
                    window.open("https://www.buymeacoffee.com/aidthompsin")
                  }
                  src="/buymeacoffee.png"
                  height={40}
                  width={40}
                  alt="buymeacoffee logo"
                />
                <Typography
                  variant="body1"
                  textAlign="center"
                  sx={{ fontSize: 9, color: "darkgrey" }}
                >
                  Buy Me A Coffee
                </Typography>
              </Box>
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

  const data = all.filter(
    (each) => each.episode_slug[0].text === context.params.id
  )[0];

  return { props: { data } };
}

export default PagePodcast;
