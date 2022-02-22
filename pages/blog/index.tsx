import * as React from "react";
import { GetStaticProps } from "next";
import fetch from "node-fetch";
import { getEndpoint, createClient } from "@prismicio/client";
import { useTheme } from "@mui/material/styles";
import Layout from "../../components/Layout";
import { useMainContext } from "../../context/main";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { BlogCard } from "../../components/BlogCard";
import Head from "next/head";

type Props = {
  data: any;
};

const PageBlogIndex = ({ data }: Props) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { toggleLoading } = useMainContext();
  React.useEffect(() => {
    if (data) {
      toggleLoading(false);
    }
  }, [data]);

  React.useEffect(() => {
    // page();
  }, []);
  return (
    <Layout title="Blog">
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={data.twitter_image.url} />
        <meta name="twitter:creator" content="@aidThompsin" />
        <meta name="twitter:site" content="@aidThompsin" />
        <meta
          name="description"
          content="Every Sunday, a new Blog to elicit some doom-lolz from the Dystopian nightmare we now inhabit."
        />

        <meta
          property="og:title"
          //@ts-ignore
          content={`Funk-27 | Blog`}
          key="title"
        />

        <meta
          property="og:description"
          //@ts-ignore
          content="Join me as I attempt to make sense of the senseless with this passable, weekly blog covering Politics, Tech and Dystopia - that I am confident you will find at least 40% enjoyment from."
          key="description"
        />

        <meta
          property="og:image"
          //@ts-ignore
          content={data.twitter_image.url}
          key="seo blog share image"
        />
      </Head>
      <Typography
        variant="h1"
        color="secondary"
        sx={{
          mb: 5,
          // fontFamily: "monospace",
          color: (theme) => theme.palette.secondary.light,
          fontSize: isDesktop ? 200 : 110,
        }}
      >
        Blog
      </Typography>

      <Grid container spacing={2}>
        {data.blogs.map((each) => {
          return (
            <Grid
              item
              xs={12}
              sm={10}
              md={4}
              key={each.blog.data["blog-title"][0].text}
            >
              <BlogCard
                slug={each.blog.uid}
                title={each.blog.data["blog-title"][0].text}
                comments={0}
                imgSrc={each.blog.data["blog-image-1"].twitter.url}
                imgAlt={each.blog.data["blog-image-1"].alt}
                date={each.blog.first_publication_date}
              />
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // @ts-ignore
  const endpoint: any = getEndpoint("funk27");
  // @ts-ignore
  const client: any = createClient(endpoint, { fetch });
  const { data } = await client.getByUID("page", "blog-home-page", {
    fetchLinks: [
      "blog-page.blog-title",
      "blog-page.blog-body",
      "blog-page.blog-image-1",
      "blog-page.blog-image-2",
      "blog-page.date",
    ],
  });
  return { props: { data } };
};

export default PageBlogIndex;
