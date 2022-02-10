import * as React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { useMainContext } from "../context/main";
import { Box, Typography } from "@mui/material";
import { useAnalytics } from "use-analytics";
import Head from "next/head";

const IndexPage = () => {
  const { toggleLoading } = useMainContext();
  const [showBrand, setShowBrand] = React.useState<boolean>(false);
  const { page } = useAnalytics();
  toggleLoading(false);

  React.useEffect(() => {
    // setShowBrand(true);
    console.log("loaded fired");
    setTimeout(() => {
      console.log("showing brand now");
      setShowBrand(true);
    }, 1000);
    page();
  }, []);
  return (
    <Layout title="Funk-27">
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/shedShot.png" />
        <meta name="twitter:creator" content="@aidThompsin" />
        <meta name="twitter:site" content="@aidThompsin" />
        <meta
          name="description"
          content="Discontent Providers. We create and serve the Blogs and Podcasts that keep you laughing like a drain while doom-scrolling deeper and deeper into an ocean of existential abyss."
        />
        <meta
          property="og:title"
          content={`Funk-27 | Discontent Providers`}
          key="title"
        />

        <meta
          property="og:description"
          content="Discontent Providers | new media platform (or web-app) serving up Podcasts and Blogs that attempt to make sense of the senseless. In a delightfully c*nty way."
          key="description"
        />

        <meta
          property="og:image"
          content="/podcast_studio1.jpg"
          key="funk27 podcast microphone"
        />
      </Head>
      <Box
        sx={{
          height: "90vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: "-17px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            variant="h1"
            sx={{
              transition: "300ms",
              opacity: showBrand ? 1 : 0,
            }}
          >
            Funk-
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: "orange",
              fontWeight: "bold",
              transition: "600ms",
              opacity: showBrand ? 1 : 0,
            }}
          >
            27
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: "lightgrey",
            transition: "900ms",
            opacity: showBrand ? 1 : 0,
          }}
        >
          Discontent Providers
        </Typography>
      </Box>
    </Layout>
  );
};

export default IndexPage;
