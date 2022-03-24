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
import { MuiDivider } from "../../components/MuiDivider";

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

  const jsonLd = {
    "@context": "http://www.schema.org",
    "@type": "Blog",
    name: "Funk-27 Blog",
    alternateName: "F27 Blog",
    url: "https://funk-27.co.uk/blog",
    sameAs: ["http://funk-27.co.uk/blog", "www.funk-27.co.uk/blog"],
    logo: "https://funk-27.co.uk/f27_seoImage.jpg",
    image: data.twitter_image.url,
    description:
      "Join me as I attempt to make sense of the senseless with this passable, weekly blog covering Politics, Tech and Dystopia - that I am confident you will find at least 40% enjoyment from.",
  };

  console.log("data blogs", data.blogs);
  return (
    <Layout
      title="Blog"
      description="Join me as I attempt to make sense of the senseless with this passable, weekly blog covering Politics, Tech and Dystopia - that I am confident you will find at least 40% enjoyment from."
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
          color: (theme) => theme.palette.secondary.light,
          fontSize: isDesktop ? 200 : 110,
        }}
      >
        Blog
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={10} md={6}>
          <BlogCard
            slug={data.blogs[0].blog.uid}
            title={data.blogs[0].blog.data["blog-title"][0].text}
            comments={0}
            imgSrc={data.blogs[0].blog.data["blog-image-1"].twitter.url}
            imgAlt={data.blogs[0].blog.data["blog-image-1"].alt}
            date={data.blogs[0].blog.first_publication_date}
          />
        </Grid>
        <Grid item xs={12} sm={10} md={6}>
          <BlogCard
            slug={data.blogs[1].blog.uid}
            title={data.blogs[1].blog.data["blog-title"][0].text}
            comments={0}
            imgSrc={data.blogs[1].blog.data["blog-image-1"].twitter.url}
            imgAlt={data.blogs[1].blog.data["blog-image-1"].alt}
            date={data.blogs[1].blog.first_publication_date}
          />
        </Grid>

        <MuiDivider left prim />
        {data.blogs.slice(2, 8).map((each: any) => {
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
        <MuiDivider prim right />
        {data.blogs.slice(8, data.blogs.length).map((each: any) => {
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
