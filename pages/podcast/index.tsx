import * as React from "react";
import { GetStaticProps } from "next";
import fetch from "node-fetch";
import { getEndpoint, createClient } from "@prismicio/client";
import Layout from "../../components/Layout";
import { useMainContext } from "../../context/main";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Grow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ContentCard } from "../../components/ContentCard";
import { MuiDivider } from "../../components/MuiDivider";
import Link from "next/link";
import Head from "next/head";
import { hardcodeContent, popularPodcasts } from "../../utils/more-content";
import { BadgeAvatar } from "../../components/Badge";

type Props = {
  data: any;
};

const PagePodcastIndex = ({ data }: Props) => {
  const [allContent, setAllContent] = React.useState(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const { toggleLoading } = useMainContext();

  const processContent = () => {
    const end = data?.body.length;
    const start = end - 3;
    const olderPods = data.body.slice(start, end);
    const newerPods = data.body.slice(0, start);
    const s3 = olderPods[0].items;
    const s2 = olderPods[1].items;
    const s1 = olderPods[2].items;
    // const s4 = [];
    const s4 = newerPods[0].items.reverse();
    const allTogether = [...s4, ...s3, ...s2, ...s1];

    // BRING THIS BACK IN FOR GUEST/SOLO tag thing.
    const arr =
      allTogether &&
      allTogether.map((each) => {
        console.log("each", each);
        const title = each.title1[0].text.toLowerCase();
        const description = each.description[0].text.toLowerCase();
        let solo = false;

        if (
          title.includes("fuck this week") ||
          title.includes("f*ck this week") ||
          title.includes("f**k this week") ||
          title.includes("f*** this week") ||
          title.includes("fuck this week")
        ) {
          solo = true;
        }

        if (
          description.includes("fuck this week") ||
          description.includes("f*ck this week") ||
          description.includes("f**k this week") ||
          description.includes("f*** this week") ||
          description.includes("solo")
        ) {
          solo = true;
        }

        return {
          ...each,
          solo,
        };
      });
    setAllContent(arr);
    // setAllContent([...s4, ...s3, ...s2, ...s1]);
  };
  React.useEffect(() => {
    if (data) {
      toggleLoading(false);
      processContent();
    }
  }, [data]);

  const jsonLd = {
    "@context": "http://www.schema.org",
    "@type": "TVSeries",
    name: "Aid Thompsin & Other Disappointments",
    alternateName: "AT // OD Podcast",
    url: "https://funk-27.co.uk/podcast",
    sameAs: ["http://funk-27.co.uk/podcast", "www.funk-27.co.uk/podcast"],
    logo: "https://funk-27.co.uk/f27_seoImage.jpg",
    image: data.twitter_image.url,
    description: "Home of the Aid Thompsin and Other Disappointments podcast.",
  };

  // console.log("allContent", allContent);
  return (
    <Layout
      title="Podcast"
      description="Home of the Aid Thompsin and Other Disappointments podcast."
      seoImage={data.twitter_image.url}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Typography
        variant="h1"
        color="secondary"
        sx={{
          mb: 5,
          lineHeight: 1,
          color: (theme) => theme.palette.secondary.light,
          fontSize: isDesktop ? 200 : 110,
        }}
      >
        Podcast
      </Typography>
      <Typography
        variant="h5"
        color="secondary.main.light"
        sx={{
          fontFamily: "monospace",
          mb: 5,
        }}
      >
        Aid Thompsin & Other Disappointments
      </Typography>
      {!allContent?.length ? (
        <p>loading...</p>
      ) : (
        <>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grow in={true}>
              <Grid item xs={12} md={6}>
                <ContentCard
                  title={allContent[0].title1[0].text}
                  description={allContent[0].description[0].text}
                  backgroundArtworkSrc={allContent[0].podc_ep_twitter_img.url}
                  artworkAlt={allContent[0].podc_ep_twitter_img.alt}
                  profileImgSrc={allContent[0].guest_photo.url}
                  slug={allContent[0].episode_slug[0].text}
                  tagText={allContent[0].solo ? "Solo Show" : "Guest"}
                />
              </Grid>
            </Grow>
            <Grow in={true}>
              <Grid item xs={12} md={6} lg={4}>
                <ContentCard
                  title={allContent[1].title1[0].text}
                  description={allContent[1].description[0].text}
                  backgroundArtworkSrc={allContent[1].podc_ep_twitter_img.url}
                  artworkAlt={allContent[1].podc_ep_twitter_img.alt}
                  profileImgSrc={allContent[1].guest_photo.url}
                  slug={allContent[1].episode_slug[0].text}
                  tagText={allContent[1].solo ? "Solo Show" : "Guest"}
                />
              </Grid>
            </Grow>
            {allContent.slice(2, 5).map((each, i) => {
              return (
                <Grow in={true} key={i}>
                  <Grid item xs={12} md={4}>
                    <ContentCard
                      title={each.title1[0].text}
                      description={each.description[0].text}
                      backgroundArtworkSrc={each.podc_ep_twitter_img.url}
                      artworkAlt={each.podc_ep_twitter_img.alt}
                      profileImgSrc={each.guest_photo.url}
                      slug={each.episode_slug[0].text}
                      tagText={each.solo ? "Solo Show" : "Guest"}
                    />
                  </Grid>
                </Grow>
              );
            })}
            <MuiDivider prim left />

            <Grow in={true}>
              <Grid
                item
                xs={12}
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    border: "5px solid orange",
                    px: 6,
                    py: 1,
                    borderRadius: 24,
                    mb: 2,
                    color: "white",
                    textAlign: "center",
                    background: "grey",
                    // transform: "skewY(2deg)",
                    fontWeight: 800,
                  }}
                >
                  Popular...
                </Typography>
                <Grid container spacing={2} sx={{ ml: "1vw" }}>
                  {popularPodcasts.slice(0, 3).map((each, i) => {
                    return (
                      <Grid item xs={12} md={4}>
                        <Card
                          sx={{
                            background: i % 2 === 0 ? "black" : "inherit",
                            minHeight: 300,
                            border:
                              i % 2 === 0
                                ? `5px solid orange`
                                : `5px solid black`,
                            borderRadius: 5,
                            transform:
                              i % 2 === 0 ? "skewY(1deg)" : "skewY(-1deg)",
                          }}
                        >
                          <div onClick={() => null}>
                            <Link
                              href="/podcast/[id]"
                              as={`/podcast/${each.slug}`}
                            >
                              <Box>
                                <CardMedia
                                  component="img"
                                  alt={each.imgAlt}
                                  height="140"
                                  image={each.bgImgSrc || "/poddy.png"}
                                  sx={{
                                    filter: "grayscale(100%)",
                                    opacity: 0.4,
                                  }}
                                />
                                <CardContent sx={{ pb: 0 }}>
                                  <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    color="primary"
                                    sx={{ position: "relative" }}
                                  >
                                    {each.title.toLocaleLowerCase()}
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        bottom: "100%",
                                      }}
                                    >
                                      <BadgeAvatar
                                        src={each.profileImgSrc}
                                        height={100}
                                        width={100}
                                      />
                                    </Box>
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                      maxWidth: 500,
                                      color: i % 2 === 0 ? "white" : "grey",
                                    }}
                                  >
                                    {each.description.length > 200
                                      ? each.description.slice(0, 200) + "..."
                                      : each.description}
                                  </Typography>
                                </CardContent>
                                <CardActions>
                                  <Button size="small">Share</Button>
                                  <Button size="small">Learn More</Button>
                                </CardActions>
                              </Box>
                            </Link>
                          </div>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grow>

            <MuiDivider right />

            {allContent.slice(5, 12).map((each, i) => {
              return (
                <Grow in={true} key={i}>
                  <Grid item xs={12} md={4}>
                    <ContentCard
                      title={each.title1[0].text}
                      description={each.description[0].text}
                      backgroundArtworkSrc={each.podc_ep_twitter_img.url}
                      artworkAlt={each.podc_ep_twitter_img.alt}
                      profileImgSrc={each.guest_photo.url}
                      slug={each.episode_slug[0].text}
                      tagText={each.solo ? "Solo Show" : "Guest"}
                    />
                  </Grid>
                </Grow>
              );
            })}

            <MuiDivider right />

            {allContent.slice(12, 18).map((each, i) => {
              return (
                <Grow in={true} key={i}>
                  <Grid item xs={12} md={4}>
                    <ContentCard
                      title={each.title1[0].text}
                      description={each.description[0].text}
                      backgroundArtworkSrc={each.podc_ep_twitter_img.url}
                      artworkAlt={each.podc_ep_twitter_img.alt}
                      profileImgSrc={each.guest_photo.url}
                      slug={each.episode_slug[0].text}
                      tagText={each.solo ? "Solo Show" : "Guest"}
                    />
                  </Grid>
                </Grow>
              );
            })}
            <MuiDivider prim />

            <Grow in={true}>
              <Grid item xs={12} md={6}>
                <ContentCard
                  title={allContent[18].title1[0].text}
                  description={allContent[18].description[0].text}
                  backgroundArtworkSrc={allContent[18].podc_ep_twitter_img.url}
                  artworkAlt={allContent[18].podc_ep_twitter_img.alt}
                  profileImgSrc={allContent[18].guest_photo.url}
                  slug={allContent[18].episode_slug[0].text}
                  tagText={allContent[18].solo ? "Solo Show" : "Guest"}
                />
              </Grid>
            </Grow>
            <Grow in={true}>
              <Grid item xs={12} md={6} lg={4}>
                <ContentCard
                  title={allContent[19].title1[0].text}
                  description={allContent[19].description[0].text}
                  backgroundArtworkSrc={allContent[19].podc_ep_twitter_img.url}
                  artworkAlt={allContent[19].podc_ep_twitter_img.alt}
                  profileImgSrc={allContent[19].guest_photo.url}
                  slug={allContent[19].episode_slug[0].text}
                  tagText={allContent[19].solo ? "Solo Show" : "Guest"}
                />
              </Grid>
            </Grow>

            <Grow in={true}>
              <Grid item xs={12} md={6}>
                <ContentCard
                  title={allContent[20].title1[0].text}
                  description={allContent[20].description[0].text}
                  backgroundArtworkSrc={allContent[20].podc_ep_twitter_img.url}
                  artworkAlt={allContent[20].podc_ep_twitter_img.alt}
                  profileImgSrc={allContent[20].guest_photo.url}
                  slug={allContent[20].episode_slug[0].text}
                  tagText={allContent[20].solo ? "Solo Show" : "Guest"}
                />
              </Grid>
            </Grow>
            <Grow in={true}>
              <Grid item xs={12} md={6}>
                <ContentCard
                  title={allContent[21].title1[0].text}
                  description={allContent[21].description[0].text}
                  backgroundArtworkSrc={allContent[21].podc_ep_twitter_img.url}
                  artworkAlt={allContent[21].podc_ep_twitter_img.alt}
                  profileImgSrc={allContent[21].guest_photo.url}
                  slug={allContent[21].episode_slug[0].text}
                  tagText={allContent[21].solo ? "Solo Show" : "Guest"}
                />
              </Grid>
            </Grow>

            <MuiDivider prim />

            {allContent.slice(22, 28).map((each, i) => {
              return (
                <Grow in={true} key={i}>
                  <Grid item xs={12} md={4}>
                    <ContentCard
                      title={each.title1[0].text}
                      description={each.description[0].text}
                      backgroundArtworkSrc={each.podc_ep_twitter_img.url}
                      artworkAlt={each.podc_ep_twitter_img.alt}
                      profileImgSrc={each.guest_photo.url}
                      slug={each.episode_slug[0].text}
                      tagText={each.solo ? "Solo Show" : "Guest"}
                    />
                  </Grid>
                </Grow>
              );
            })}

            <MuiDivider left />

            <Grow in={true}>
              <Grid
                item
                xs={12}
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    border: "5px solid orange",
                    px: 6,
                    py: 1,
                    borderRadius: 24,
                    mb: 2,
                    color: "white",
                    textAlign: "center",
                    background: "grey",
                    fontWeight: 800,
                  }}
                >
                  Popular...
                </Typography>
                <Grid
                  container
                  spacing={2}
                  sx={{ ml: isDesktop ? "inherit" : "1vw" }}
                >
                  {popularPodcasts.slice(3, 6).map((each, i) => {
                    return (
                      <Grid item xs={12} md={4}>
                        <Card
                          sx={{
                            background: i % 2 === 0 ? "black" : "inherit",
                            minHeight: 300,
                            border:
                              i % 2 === 0
                                ? `5px solid orange`
                                : `5px solid black`,
                            borderRadius: 5,
                            transform:
                              i % 2 === 0 ? "skewY(1deg)" : "skewY(-1deg)",
                          }}
                        >
                          <div onClick={() => null}>
                            <Link
                              href="/podcast/[id]"
                              as={`/podcast/${each.slug}`}
                            >
                              <Box>
                                <CardMedia
                                  component="img"
                                  alt={each.imgAlt}
                                  height="140"
                                  image={each.bgImgSrc || "/poddy.png"}
                                  sx={{
                                    filter: "grayscale(100%)",
                                    opacity: 0.4,
                                  }}
                                />
                                <CardContent sx={{ pb: 0 }}>
                                  <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    color="primary"
                                    sx={{ position: "relative" }}
                                  >
                                    {each.title.toLocaleLowerCase()}
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        bottom: "100%",
                                      }}
                                    >
                                      <BadgeAvatar
                                        src={each.profileImgSrc}
                                        height={100}
                                        width={100}
                                      />
                                    </Box>
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                      maxWidth: 500,
                                      color: i % 2 === 0 ? "white" : "grey",
                                    }}
                                  >
                                    {each.description.length > 200
                                      ? each.description.slice(0, 200) + "..."
                                      : each.description}
                                  </Typography>
                                </CardContent>
                                <CardActions>
                                  <Button size="small">Share</Button>
                                  <Button size="small">Learn More</Button>
                                </CardActions>
                              </Box>
                            </Link>
                          </div>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grow>

            <MuiDivider right />

            <Grow in={true}>
              <Grid item xs={12} md={6}>
                <ContentCard
                  title={allContent[28].title1[0].text}
                  description={allContent[28].description[0].text}
                  backgroundArtworkSrc={allContent[28].podc_ep_twitter_img.url}
                  artworkAlt={allContent[28].podc_ep_twitter_img.alt}
                  profileImgSrc={allContent[28].guest_photo.url}
                  slug={allContent[28].episode_slug[0].text}
                  tagText={allContent[28].solo ? "Solo Show" : "Guest"}
                />
              </Grid>
            </Grow>
            <Grow in={true}>
              <Grid item xs={12} md={6}>
                <ContentCard
                  title={allContent[29].title1[0].text}
                  description={allContent[29].description[0].text}
                  backgroundArtworkSrc={allContent[29].podc_ep_twitter_img.url}
                  artworkAlt={allContent[29].podc_ep_twitter_img.alt}
                  profileImgSrc={allContent[29].guest_photo.url}
                  slug={allContent[29].episode_slug[0].text}
                  tagText={allContent[29].solo ? "Solo Show" : "Guest"}
                />
              </Grid>
            </Grow>
            {allContent.slice(30, 36).map((each, i) => {
              return (
                <Grow in={true} key={i}>
                  <Grid item xs={12} md={4}>
                    <ContentCard
                      title={each.title1[0].text}
                      description={each.description[0].text}
                      backgroundArtworkSrc={each.podc_ep_twitter_img.url}
                      artworkAlt={each.podc_ep_twitter_img.alt}
                      profileImgSrc={each.guest_photo.url}
                      slug={each.episode_slug[0].text}
                      tagText={each.solo ? "Solo Show" : "Guest"}
                    />
                  </Grid>
                </Grow>
              );
            })}
            <MuiDivider prim />

            {allContent.slice(36, 42).map((each, i) => {
              return (
                <Grow in={true} key={i}>
                  <Grid item xs={12} md={4}>
                    <ContentCard
                      title={each.title1[0].text}
                      description={each.description[0].text}
                      backgroundArtworkSrc={each.podc_ep_twitter_img.url}
                      artworkAlt={each.podc_ep_twitter_img.alt}
                      profileImgSrc={each.guest_photo.url}
                      slug={each.episode_slug[0].text}
                      tagText={each.solo ? "Solo Show" : "Guest"}
                    />
                  </Grid>
                </Grow>
              );
            })}
            <MuiDivider prim right />

            <Grid item xs={12} md={6}>
              <ContentCard
                title={allContent[42].title1[0].text}
                description={allContent[42].description[0].text}
                backgroundArtworkSrc={allContent[42].podc_ep_twitter_img.url}
                artworkAlt={allContent[42].podc_ep_twitter_img.alt}
                profileImgSrc={allContent[42].guest_photo.url}
                slug={allContent[42].episode_slug[0].text}
                tagText={allContent[42].solo ? "Solo Show" : "Guest"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ContentCard
                title={allContent[43].title1[0].text}
                description={allContent[43].description[0].text}
                backgroundArtworkSrc={allContent[43].podc_ep_twitter_img.url}
                artworkAlt={allContent[43].podc_ep_twitter_img.alt}
                profileImgSrc={allContent[43].guest_photo.url}
                slug={allContent[43].episode_slug[0].text}
                tagText={allContent[43].solo ? "Solo Show" : "Guest"}
              />
            </Grid>

            <MuiDivider prim right />

            {allContent.slice(44, 50).map((each, i) => {
              return (
                <Grow in={true} key={i}>
                  <Grid item xs={12} md={4}>
                    <ContentCard
                      title={each.title1[0].text}
                      description={each.description[0].text}
                      backgroundArtworkSrc={each.podc_ep_twitter_img.url}
                      artworkAlt={each.podc_ep_twitter_img.alt}
                      profileImgSrc={each.guest_photo.url}
                      slug={each.episode_slug[0].text}
                      tagText={each.solo ? "Solo Show" : "Guest"}
                    />
                  </Grid>
                </Grow>
              );
            })}

            <MuiDivider prim left />

            {allContent.slice(50, 56).map((each, i) => {
              return (
                <Grow in={true} key={i}>
                  <Grid item xs={12} md={4}>
                    <ContentCard
                      title={each.title1[0].text}
                      description={each.description[0].text}
                      backgroundArtworkSrc={each.podc_ep_twitter_img.url}
                      artworkAlt={each.podc_ep_twitter_img.alt}
                      profileImgSrc={each.guest_photo.url}
                      slug={each.episode_slug[0].text}
                      tagText={each.solo ? "Solo Show" : "Guest"}
                    />
                  </Grid>
                </Grow>
              );
            })}

            <MuiDivider prim left />

            <Grid item xs={12} md={6}>
              <ContentCard
                title={allContent[56].title1[0].text}
                description={allContent[56].description[0].text}
                backgroundArtworkSrc={allContent[56].podc_ep_twitter_img.url}
                artworkAlt={allContent[56].podc_ep_twitter_img.alt}
                profileImgSrc={allContent[56].guest_photo.url}
                slug={allContent[56].episode_slug[0].text}
                tagText={allContent[56].solo ? "Solo Show" : "Guest"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ContentCard
                title={allContent[57].title1[0].text}
                description={allContent[57].description[0].text}
                backgroundArtworkSrc={allContent[57].podc_ep_twitter_img.url}
                artworkAlt={allContent[57].podc_ep_twitter_img.alt}
                profileImgSrc={allContent[57].guest_photo.url}
                slug={allContent[57].episode_slug[0].text}
                tagText={allContent[57].solo ? "Solo Show" : "Guest"}
              />
            </Grid>

            <MuiDivider right />

            {allContent.slice(58, 64).map((each, i) => {
              return (
                <Grow in={true} key={i}>
                  <Grid item xs={12} md={4}>
                    <ContentCard
                      title={each.title1[0].text}
                      description={each.description[0].text}
                      backgroundArtworkSrc={each.podc_ep_twitter_img.url}
                      artworkAlt={each.podc_ep_twitter_img.alt}
                      profileImgSrc={each.guest_photo.url}
                      slug={each.episode_slug[0].text}
                      tagText={each.solo ? "Solo Show" : "Guest"}
                    />
                  </Grid>
                </Grow>
              );
            })}

            <MuiDivider left prim />

            {allContent.slice(64, 70).map((each, i) => {
              return (
                <Grow in={true} key={i}>
                  <Grid item xs={12} md={4}>
                    <ContentCard
                      title={each.title1[0].text}
                      description={each.description[0].text}
                      backgroundArtworkSrc={each.podc_ep_twitter_img.url}
                      artworkAlt={each.podc_ep_twitter_img.alt}
                      profileImgSrc={each.guest_photo.url}
                      slug={each.episode_slug[0].text}
                      tagText={each.solo ? "Solo Show" : "Guest"}
                    />
                  </Grid>
                </Grow>
              );
            })}
            <MuiDivider right />

            <Grid item xs={12} md={6}>
              <ContentCard
                title={allContent[70].title1[0].text}
                description={allContent[70].description[0].text}
                backgroundArtworkSrc={allContent[70].podc_ep_twitter_img.url}
                artworkAlt={allContent[70].podc_ep_twitter_img.alt}
                profileImgSrc={allContent[70].guest_photo.url}
                slug={allContent[70].episode_slug[0].text}
                tagText={allContent[70].solo ? "Solo Show" : "Guest"}
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <ContentCard
                title={allContent[71].title1[0].text}
                description={allContent[71].description[0].text}
                backgroundArtworkSrc={allContent[71].podc_ep_twitter_img.url}
                artworkAlt={allContent[71].podc_ep_twitter_img.alt}
                profileImgSrc={allContent[71].guest_photo.url}
                slug={allContent[71].episode_slug[0].text}
                tagText={allContent[71].solo ? "Solo Show" : "Guest"}
              />
            </Grid>
            <MuiDivider left />

            {allContent.slice(72, 75).map((each, i) => {
              return (
                <Grow in={true} key={i}>
                  <Grid item xs={12} md={4}>
                    <ContentCard
                      title={each.title1[0].text}
                      description={each.description[0].text}
                      backgroundArtworkSrc={each.podc_ep_twitter_img.url}
                      artworkAlt={each.podc_ep_twitter_img.alt}
                      profileImgSrc={each.guest_photo.url}
                      slug={each.episode_slug[0].text}
                      tagText={each.solo ? "Solo Show" : "Guest"}
                    />
                  </Grid>
                </Grow>
              );
            })}

            {/* <Grid item xs={6}>
              <ContentCard
                title={allContent[75].title1[0].text}
                description={allContent[75].description[0].text}
                backgroundArtworkSrc={allContent[75].podc_ep_twitter_img.url}
                artworkAlt={allContent[75].podc_ep_twitter_img.alt}
                profileImgSrc={allContent[75].guest_photo.url}
                slug={allContent[75].episode_slug[0].text}
              />
            </Grid> */}

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  transition: "300ms",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  background: (theme) => theme.palette.primary.light,
                  "&:hover": {
                    background: (theme) => theme.palette.primary.dark,
                  },
                }}
              >
                <Link href="/blog">
                  <a
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: 59,
                        textAlign: "center",
                        maxWidth: "50%",
                        lineHeight: "1.0",
                      }}
                    >
                      Prefer READING to listening?
                    </Typography>
                    <Typography sx={{ color: "black", fontSize: 15 }}>
                      Weekly Blog ⏩
                    </Typography>
                  </a>
                </Link>
              </Card>
            </Grid>
            <MuiDivider left />
          </Grid>
        </>
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // @ts-ignore
  const endpoint: any = getEndpoint("funk27");
  // @ts-ignore
  const client: any = createClient(endpoint, { fetch });
  const { data } = await client.getByUID("page", "podcast1");
  return { props: { data } };
};

export default PagePodcastIndex;
