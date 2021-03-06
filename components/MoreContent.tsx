import * as React from "react";
import fetch from "node-fetch";
import { getEndpoint, createClient } from "@prismicio/client";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ContentCard } from "./ContentCard";
import { ExternalContentCard } from "./ExternalContentCard";
import { BlogCard } from "./BlogCard";
import { hardcodeContent } from "../utils/more-content";
import Newsletter from "./Newsletter";

const MoreContent = () => {
  const [shuffledContent, setShuffledContent] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isThanksPage =
    process?.browser && window && window.location.href.includes("/thanks");
  React.useEffect(() => {
    const arr = hardcodeContent
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    setShuffledContent(arr);
  }, []);

  return (
    <Grid
      container
      spacing={2}
      sx={{ mt: 1, px: 4, ml: isMobile ? 0 : "inherit" }}
    >
      <Grid item xs={12}>
        <Typography
          variant="body1"
          sx={{
            color: (theme) => theme.palette.secondary.main,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontSize: 20,
            opacity: 1,
          }}
        >
          More Content...
        </Typography>
      </Grid>

      {shuffledContent &&
        shuffledContent.slice(0, 3).map((each) => {
          return (
            <React.Fragment key={each.slug}>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // px: 1,
                  }}
                >
                  {each.type === "blog" && (
                    <BlogCard
                      title={each.title}
                      slug={each.slug}
                      imgAlt={each.imgAlt}
                      date={each.date}
                      imgSrc={each.imgSrc}
                      extendedStay
                    />
                  )}
                  {each.type === "podcast" && (
                    <ContentCard
                      title={each.title}
                      description={each.description}
                      backgroundArtworkSrc={each.bgImgSrc}
                      profileImgSrc={each.profileImgSrc}
                      artworkAlt={each.imgAlt}
                      slug={each.slug}
                      extendedStay
                    />
                  )}
                  {each.type === "externalLink" && (
                    <ExternalContentCard
                      title={each.title}
                      description={each.description}
                      descriptionLength={150}
                      backgroundArtworkSrc={each.imgSrc}
                      profileImgSrc={each.profileImgSrc}
                      artworkAlt={each.imgAlt}
                      slug={each.slug}
                      extendedStay
                    />
                  )}
                </Box>
              </Grid>
            </React.Fragment>
          );
        })}

      <Grid item xs={12}>
        <Box sx={{ mt: 6 }} />
        {!isThanksPage && <Newsletter />}
      </Grid>
    </Grid>
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

export default MoreContent;
