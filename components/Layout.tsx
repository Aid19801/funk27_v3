import React, { ReactNode } from "react";
import Head from "next/head";
import Nav from "./Nav";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMainContext } from "../context/main";
import { Modal } from "./Modal";
import Footer from "./Footer";
import { HOME_URL } from "../utils/more-content";

type Props = {
  children?: ReactNode;
  title: string;
  description: string;
  seoImage: string;
};

const Layout = ({
  children,
  title = "Funk-27.",
  description = "Discontent Providers. Here to keep the Doom-LOLz flowing in these dystopian times.",
  seoImage = "/f27_seoImage.jpg",
}: Props) => {
  const theme = useTheme();
  const [isArticle, setIsArticle] = React.useState<boolean>(false);
  const [canonical, setCanonicalUrl] = React.useState<string | null>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isLoading } = useMainContext();

  React.useEffect(() => {
    // set bool for slightly diff layout on blog articles
    const bool = window?.location?.href.includes("blog/");
    const loc = window?.location?.href;
    // create canonical:
    setCanonicalUrl(loc.endsWith("/") ? loc.slice(0, -1) : loc);
    setIsArticle(bool);
  }, []);

  return (
    <div className="layout__container" id="page-root">
      <Head>
        <title>{title} | Comedy, Dystopia, Politics Blogs and Podcasts!</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />

        {/* Facebook */}
        <meta property="og:title" content={`Funk-27 | ${title}`} key="title" />
        <meta
          property="og:description"
          content={description}
          key="description"
        />
        <meta property="og:site_name" content={HOME_URL} />
        <meta property="og:url" content={canonical} />
        <meta
          property="og:image"
          content={
            seoImage.indexOf("http") > -1 ? seoImage : `${HOME_URL}${seoImage}`
          }
          key="funk27 podcast microphone"
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${HOME_URL}${seoImage}`} />
        <meta name="twitter:creator" content="@aidThompsin" />
        <meta name="twitter:site" content="@aidThompsin" />

        {/* structured data json-ld */}
      </Head>
      <Nav />
      <Box
        className="box-yo-1"
        sx={{
          background: "#f1a66d",
          clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
          position: "fixed",
          opacity: 0.1,
          height: 300,
          width: 300,
          transform: "skewX(2deg)",
          zIndex: -1,
        }}
      />

      <Box
        className="box-yo-2"
        sx={{
          background: "#f1a66d",
          clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
          position: "fixed",
          opacity: 0.1,
          height: 300,
          width: 300,
          transform: "skewX(154deg)",
          bottom: isMobile ? "-12%" : null,
          left: isMobile ? "4%" : null,
          right: isMobile ? null : "4%",
          zIndex: -1,
        }}
      />
      <Box
        className="box-yo-3"
        sx={{
          background: "#f1a66d",
          clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
          position: "fixed",
          opacity: 0.1,
          height: 300,
          width: 300,
          transform: "skewX(100deg)",
          bottom: isMobile ? "16%" : "25%",
          left: "24%",
          zIndex: -1,
        }}
      />
      <Box
        id="page-root"
        sx={{
          minHeight: isMobile ? "30vh" : "70vh",
          pl: isArticle ? 0 : 2,
          pr: isArticle ? 0 : 2,
          pt: isMobile ? 4 : 3,
          mt: "45px",
        }}
      >
        {isLoading ? <Modal /> : children}
      </Box>
      <Footer />
    </div>
  );
};

export default Layout;
