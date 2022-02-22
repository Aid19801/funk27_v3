import React, { ReactElement } from "react";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { Box, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import { MuiDivider } from "./MuiDivider";

// CONTENT
const footerLinksRight = [
  {
    text: "Podcast Home",
    link: "/podcast",
  },
  {
    text: "YouTube - AT // OD",
    link: "https://www.youtube.com/adrianthompsoncomedy",
  },
  {
    text: "Apple Podcasts - AT // OD",
    link: "https://podcasts.apple.com/gb/podcast/aid-thompsin-other-disappointments/id1543205608",
  },
  {
    text: "Spotify - AT // OD",
    link: "https://open.spotify.com/show/6mrjI8ZioqWgcHpNIBa3uU?si=1af543a5fb78456b",
  },
  {
    text: "Blog Home",
    link: "/blog",
  },
];

// MY SOCIALS
const footerLinksCenter = [
  {
    text: "Patreon - @AidThompsin",
    link: "https://patreon.com/aidthompsin",
  },
  {
    text: "Facebook - @AidThompsin",
    link: "https://www.facebook.com/aidThompsin",
  },
  {
    text: "Twitter - @AidThompsin",
    link: "https://twitter.com/aidthompsin",
  },
  {
    text: "Github - @AidThompsin",
    link: "https://github.com/aid19801",
  },
];

// FUNK 27 CORP
const footerLinksLeft = [
  {
    text: "Email Us",
    link: "/contact",
  },
  {
    text: "About Us",
    link: "/about",
  },
  {
    text: "Facebook - Funk-27",
    link: "https://www.facebook.com/funkTwentySeven",
  },
  {
    text: "Linkedin - Funk-27",
    link: "https://www.linkedin.com/company/funk-27",
  },
];
export function Footer(): ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const handleClick = (location: string) => {
    let str = "";

    switch (location) {
      case "facebook":
        str = "https://www.facebook.com/funkTwentySeven";
        break;

      case "twitter":
        str = "https://www.twitter.com/aidThompsin";
        break;

      case "linkedin":
        str = "https://www.linkedin.com/company/funk-27";
        break;

      case "email":
        window.location.href =
          "mailto:aidThompsin@gmail.com" + "&subject='email_website_query'";
        break;

      default:
        return;
    }
    return window.open(str);
  };
  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        sx={{
          bgcolor: "white",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "20px",
        }}
      >
        <Grid item xs={12}>
          <Box>
            <Link href="/">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  ml: 2,
                  maxWidth: "80px",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "5vh",
                    marginLeft: 0,
                    marginBottom: 0,
                    color: "grey",
                    fontWeight: 400,
                  }}
                >
                  F
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "5vh",
                    marginTop: 0,
                    marginBottom: 0,
                    color: "orange",
                    fontWeight: 400,
                  }}
                >
                  27
                </Typography>
              </Box>
            </Link>
          </Box>

          <Divider sx={{ my: 2 }} />
        </Grid>
        <Grid item xs={4} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {footerLinksLeft.map((each) => (
              <Link key={each.link} href={each.link}>
                <a target="_blank">
                  <Typography sx={{ color: "darkgrey", fontWeight: 300 }}>
                    {each.text}
                  </Typography>
                </a>
              </Link>
            ))}
          </Box>
        </Grid>
        <Grid item xs={4} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {footerLinksCenter.map((each) => (
              <Link key={each.link} href={each.link}>
                <a target="_blank">
                  <Typography sx={{ color: "darkgrey", fontWeight: 300 }}>
                    {each.text}
                  </Typography>
                </a>
              </Link>
            ))}
          </Box>
        </Grid>
        <Grid item xs={4} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {footerLinksRight.map((each) => (
              <Link key={each.link} href={each.link}>
                <a target="_blank">
                  <Typography sx={{ color: "darkgrey", fontWeight: 300 }}>
                    {each.text}
                  </Typography>
                </a>
              </Link>
            ))}
          </Box>
        </Grid>

        {isDesktop && (
          <Grid item md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
              }}
            >
              <Typography variant="h3" sx={{ color: "rgb(219 214 214)" }}>
                Discontent Providers
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}

export default Footer;
