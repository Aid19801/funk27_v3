import * as React from "react";
import Layout from "../components/Layout";
import { useMainContext } from "../context/main";
import { Box, Typography } from "@mui/material";
import Head from "next/head";

const IndexPage = () => {
  const { toggleLoading } = useMainContext();
  const [showBrand, setShowBrand] = React.useState<boolean>(false);
  toggleLoading(false);

  React.useEffect(() => {
    setTimeout(() => {
      setShowBrand(true);
    }, 1000);
  }, []);

  const jsonLd = {
    "@context": "http://www.schema.org",
    "@type": "Organization",
    name: "Funk-27",
    alternateName: "F27",
    datePublished: "2022-02-25",
    author: {
      "@type": "Person",
      name: "Aid Thompsin",
    },
    url: "https://funk-27.co.uk",
    sameAs: ["http://funk-27.co.uk", "www.funk-27.co.uk"],
    logo: "https://funk-27.co.uk/f27_seoImage.jpg",
    image: "https://funk-27.co.uk/poddy.png",
    description:
      "Twice-Weekly Blogs and Podcasts for the Politics, Tech and Comedy fan.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "United Kingdom",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "51.5233",
      longitude: "0.0755",
    },
  };

  return (
    <Layout
      title="Funk-27"
      description="Discontent Providers. Blogs and Podcasts that keep you laughing like a drain while doom-scrolling deeper into the existential abyss"
      seoImage="/f27_seoImage.jpg"
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <Box
        sx={{
          height: "90vh",
          width: "100%",
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
