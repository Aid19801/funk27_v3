import React, { ReactNode } from "react";
import Head from "next/head";
import Nav from "./Nav";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({
  children,
  title = "Funk-27 | Politics, Dystopia, Comedy, Tech.",
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div className="layout__container">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Nav />
      <Box
        sx={{
          // padding: 4,
          // mt: "50px",
          mb: "200px",
          ml: 2,
          maxWidth: "95vw",
        }}
      >
        {children}
      </Box>
    </div>
  );
};

export default Layout;