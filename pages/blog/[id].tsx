import * as React from "react";
import fetch from "node-fetch";
import { getEndpoint, createClient } from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import Layout from "../../components/Layout";
import { useMainContext } from "../../context/main";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MuiDivider } from "../../components/MuiDivider";
import { BadgeAvatar } from "../../components/Badge";
import { Facebook, Twitter } from "@mui/icons-material";
import Head from "next/head";
import MoreContent from "../../components/MoreContent";
import Link from "next/link";

type Props = {
  data: any;
};

interface TitleType {
  first: string[];
  second: string[];
  third: string[];
}

const PageBlog = ({ data }: Props) => {
  const [title, setTitle] = React.useState<TitleType | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  let bodyContent = [];

  data.data["blog-body"].forEach((eachPtag) => {
    if (eachPtag.text !== "") {
      bodyContent.push(eachPtag);
    } else {
      return null;
    }
  });

  const headline = data.data["blog-title"][0].text;
  const blogDate = new Date(data.first_publication_date)
    .toString()
    .slice(0, 15);

  const { toggleLoading } = useMainContext();

  const cutupTitle = () => {
    const str = data.data["blog-title"][0].text;
    const arrOfWordsInTitle = str.split(" ");
    const firstJuncture = Math.round(arrOfWordsInTitle.length / 3);
    const secondJuncture = Math.round(arrOfWordsInTitle.length / 3) * 2;
    const firstBit = arrOfWordsInTitle.slice(0, firstJuncture);
    const secondBit = arrOfWordsInTitle.slice(firstJuncture, secondJuncture);
    const thirdBit = arrOfWordsInTitle.slice(
      secondJuncture,
      arrOfWordsInTitle.length
    );
    setTitle({
      first: firstBit,
      second: secondBit,
      third: thirdBit,
    });
  };

  const createFreeTextForGoogle = () => {
    let str = "";
    data?.data["blog-body"].forEach((each) => {
      if (each.text && each.text !== "") {
        str = str + each.text + " ";
      }
    });
    return str;
  };
  React.useEffect(() => {
    if (data && data.data["blog-title"]) {
      toggleLoading(false);
      cutupTitle();
    }
  }, [data]);

  const jsonLd = {
    "@context": "http://www.schema.org",
    "@type": "Article",
    name: headline,
    headline,
    datePublished: data?.data?.date,
    url: `https://funk-27.co.uk/blog/${data?.uid}`,
    sameAs: [
      `www.funk-27.co.uk/blog/${data?.uid}`,
      `http://funk-27.co.uk/blog/${data?.uid}`,
    ],
    image: data?.data["blog-image-1"].url,
    description: data?.data["blog-body"][0]?.text,
    articleBody: createFreeTextForGoogle(),
    author: {
      url: data?.data?.authorTwitter[0]?.text
        ? `https://www.google.com/search?q=who+is+${data?.data?.authorTwitter[0]?.text}&oq=who+is+supertansk&aqs=chrome.0.0i512j69i57.7240j0j7&sourceid=chrome&ie=UTF-8`
        : "https://www.huffingtonpost.co.uk/author/aid-thompsin",
      "@type": "Person",
      name: data?.data?.authorTwitter[0]?.text
        ? data?.data?.authorTwitter[0]?.text
        : "Aid Thompsin",
    },
  };

  return (
    <Layout
      title={headline}
      description={data.data["blog-body"][0].text}
      seoImage={data.data["blog-image-1"].twitter.url}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="funkBlog__bgImgContainer">
        <div
          className="funkBlog__bgImg"
          style={{
            backgroundImage: isMobile
              ? "url(/newspapers_sm.jpg)"
              : 'url("/newspapers_lg.jpg")',
            backgroundSize: isMobile ? "auto 100%" : "cover",
          }}
        />
      </div>

      <Grid
        container
        spacing={0}
        className="funkBlog__titleContainer"
        sx={{ top: isMobile ? "5%" : "1%" }}
      >
        <Grid
          className="funkBlog__titleItem"
          item
          xs={11}
          md={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            // padding: "0px !important",
            flexDirection: "row",
            flexWrap: "wrap",
            height: "auto",
            paddingTop: isMobile ? "60px" : "60px",
            px: isMobile ? "30px" : null,
            pb: isMobile ? "30px" : "60px",
          }}
        >
          {title &&
            title.first &&
            title.first.map((each) => {
              return (
                <Typography
                  key={each}
                  variant="h1"
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "8vh",
                    textShadow: "8px 6px 1px white",
                  }}
                >
                  {each}&nbsp;
                </Typography>
              );
            })}

          <Box
            sx={{
              background: "rgba(0, 0, 0, 0.5)",
              paddingLeft: 2,
              display: "flex",
              transform: "skewY(-2deg)",
              flexDirection: "row",
              flexWrap: "wrap",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {title &&
              title.second &&
              title.second.map((each) => {
                return (
                  <Typography
                    key={each}
                    variant="h1"
                    sx={{
                      color: "orange",
                      textAlign: "center",
                      fontSize: "8vh",
                      fontWeight: "bold",
                    }}
                  >
                    {each}&nbsp;
                  </Typography>
                );
              })}
          </Box>

          {title &&
            title.third &&
            title.third.map((each) => {
              return (
                <Typography
                  key={each}
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "8vh",
                    textShadow: "8px 6px 1px white",
                  }}
                  variant="h1"
                >
                  {each}&nbsp;
                </Typography>
              );
            })}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card
            sx={{
              mt: isMobile ? 0 : 6,
              px: isMobile ? null : 8,
              pt: 6,
              pb: isMobile ? 3 : 6,
              mb: isMobile ? 3 : null,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background:
                "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(217,216,208,0.25674019607843135) 100%)",
            }}
          >
            {!isMobile && <MuiDivider prim right />}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 24,
                px: 4,
                py: 1,
                mb: 2,
              }}
            >
              <BadgeAvatar
                src={
                  data?.data?.author_image?.url
                    ? data.data.author_image.url
                    : "/me.jpeg"
                }
                height={60}
                width={60}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  ml: 1,
                }}
              >
                <Typography
                  component="a"
                  href={
                    data?.data?.authorTwitter[0]?.text
                      ? `https://twitter.com/${data?.data?.authorTwitter[0]?.text}`
                      : "https://twitter.com/aidThompsin"
                  }
                  target="_blank"
                  sx={{ textDecoration: "none", color: "black" }}
                  fontFamily="monospace"
                  fontSize="13px"
                >
                  {data?.data?.authorTwitter[0]?.text
                    ? data?.data?.authorTwitter[0]?.text
                    : "@aidThompsin"}
                </Typography>
                <Typography variant="h6" fontFamily="monospace" fontSize="13px">
                  {data?.data?.authorLocation[0]?.text
                    ? data?.data?.authorLocation[0]?.text
                    : "London, UK"}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ width: isMobile ? "90%" : "80%", mb: 4 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                ml: 1,
                mb: 4,
              }}
            >
              <Typography
                variant="h6"
                sx={{ mr: 2 }}
                color="secondary.light"
                fontSize="13px"
              >
                {blogDate}
              </Typography>
              <Button
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=https://funk-27.co.uk/blog/${data.uid}`
                  )
                }
              >
                <Facebook sx={{ color: theme.palette.secondary.light }} />
              </Button>
              <Button
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?url=https://funk-27.co.uk/blog/${data.uid}&text=Sup%20People!%20This%20is%20wild,%20man.%0AGive%20it%20a%20read%20if%20you%20have%20five%20minutes.%0A`
                  )
                }
              >
                <Twitter sx={{ color: theme.palette.secondary.light }} />
              </Button>
            </Box>

            <Divider sx={{ width: isMobile ? "90%" : "80%", mb: 4 }} />

            <MuiDivider left prim />
            <Box
              className="funkBlog__mainContent"
              sx={{
                width: isMobile ? "86%" : "65%",
                maxWidth: isMobile ? 375 : 800,
                mt: isMobile ? 1 : 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RichText render={bodyContent} />

              <MuiDivider left prim />

              <BadgeAvatar
                src={
                  data?.data?.author_image?.url
                    ? data.data.author_image.url
                    : "/me.jpeg"
                }
                height={60}
                width={60}
              />

              <Typography variant="h6">
                {data?.data?.authorBio[0]?.text ||
                  "Aid Thompsin is a political hector, sometime-standup comedian and exhausted father."}
              </Typography>

              {data?.data?.authorTwitter[0]?.text && (
                <Link
                  href={`https://twitter.com/${data?.data?.authorTwitter[0].text}`}
                >
                  <a target="_blank" style={{ fontSize: 10, color: "orange" }}>
                    {data?.data?.authorTwitter[0].text}
                  </a>
                </Link>
              )}
            </Box>
            <MuiDivider straight prim />
          </Card>
        </Grid>

        <MoreContent />
      </Grid>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  // @ts-ignore
  const endpoint: any = getEndpoint("funk27");
  // @ts-ignore
  const client: any = createClient(endpoint, { fetch });
  const data: any = await client.getByUID("blog-page", context.params.id);
  return { props: { data } };
}

export default PageBlog;
