import * as React from "react";
import fetch from "node-fetch";
import { getEndpoint, createClient } from "@prismicio/client";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";

const Newsletter = () => {
  //   const theme = useTheme();
  //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleRegisterNewsletter = () => {
    console.log("reg");
  };
  React.useEffect(() => {
    //
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="https://google.com">
        <a target="_blank">
          <Typography
            variant="body1"
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.light,
              color: "white",
              py: 2,
              px: 5,
              mt: 4,
              borderRadius: 25,
              transition: "300ms",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.main,
              },
            }}
          >
            Grab the weekly newsletter
          </Typography>
        </a>
      </Link>
    </Box>
  );
};

export default Newsletter;
