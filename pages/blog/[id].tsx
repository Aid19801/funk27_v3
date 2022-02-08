import * as React from "react";
import fetch from "node-fetch";
import { getEndpoint, createClient } from "@prismicio/client";
import { useAnalytics } from "use-analytics";
import { RichText } from "prismic-reactjs";
import Layout from "../../components/Layout";
import { useMainContext } from "../../context/main";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Grow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { MuiDivider } from "../../components/MuiDivider";
import { BadgeAvatar } from "../../components/Badge";
import { Facebook, Twitter } from "@mui/icons-material";
import Head from "next/head";

type Props = {
  data: any;
};

const PageBlog = ({ data }: Props) => {
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
  const { page } = useAnalytics();
  React.useEffect(() => {
    console.log("BLOG[id] CHANGED [data]");
    if (data && data.data["blog-title"]) {
      toggleLoading(false);
    }
  }, [data]);

  React.useEffect(() => {
    page();
  }, []);

  return (
    <Layout title={headline}>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:image" //@ts-ignore
          content={data.data["blog-image-1"].twitter.url}
        />
        <meta name="twitter:creator" content="@aidThompsin" />
        <meta name="twitter:site" content="@aidThompsin" />

        <meta
          property="og:title"
          //@ts-ignore
          content={`Funk-27 | ${data.data["blog-title"][0].text}`}
          key="title"
        />

        <meta
          property="og:description"
          //@ts-ignore
          content={data.data["blog-body"][0].text}
          key="description"
        />

        <meta
          property="og:image"
          //@ts-ignore
          content={data.data["blog-image-1"].twitter.url}
          key="seo share image"
        />
      </Head>
      <Grid container spacing={2} className="blog__container">
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{ padding: "0px !important" }}
        >
          <Card
            sx={{
              mt: isMobile ? null : 6,
              px: isMobile ? null : 8,
              pb: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background:
                "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(217,216,208,0.25674019607843135) 100%)",
            }}
          >
            <Grow in>
              <Box sx={{ maxWidth: isMobile ? 350 : 700 }}>
                <RichText render={data.data["blog-title"]} />
              </Box>
            </Grow>

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
              <BadgeAvatar src="/me.jpeg" height={60} width={60} />
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
                  href="https://twitter.com/aidthompsin"
                  sx={{ textDecoration: "none", color: "black" }}
                  fontFamily="monospace"
                  fontSize="13px"
                >
                  @AidThompsin
                </Typography>
                <Typography variant="h6" fontFamily="monospace" fontSize="13px">
                  London, UK.
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

            <Image
              className="blog__mainImage"
              src={data.data["blog-image-1"].twitter.url}
              alt={
                data.data["blog-image-1"].twitter.alt ||
                "blog man talking politics dystopia"
              }
              {...data.data["blog-image-1"].twitter.dimensions}
            />
            <MuiDivider left prim />
            <Box
              sx={{
                width: isMobile ? "80%" : "100%",
                maxWidth: isMobile ? 375 : 800,
                mt: isMobile ? 1 : 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RichText render={bodyContent} />
            </Box>
          </Card>
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
  const data: any = await client.getByUID("blog-page", context.params.id);
  return { props: { data } };
}

export default PageBlog;
