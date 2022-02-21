import React, { ReactNode } from "react";
import Head from "next/head";
import Nav from "./Nav";
import TagManager from "react-gtm-module";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMainContext } from "../context/main";
import { Modal } from "./Modal";
import Footer from "./Footer";
import Script from "next/script";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({
  children,
  title = "Funk-27 | Politics, Dystopia, Comedy, Tech.",
}: Props) => {
  const theme = useTheme();
  const [isArticle, setIsArticle] = React.useState<boolean>(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isLoading } = useMainContext();
  React.useEffect(() => {
    const bool = window?.location?.href.includes("blog/");
    setIsArticle(bool);
    // TagManager.initialize({ gtmId: "GTM-W925CBM" });
  }, []);
  return (
    <div className="layout__container" id="page-root">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
          minHeight: "30vh",
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
