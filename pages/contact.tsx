import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Layout from "../components/Layout";
import { useMainContext } from "../context/main";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { useAnalytics } from "use-analytics";
import { MuiDivider } from "../components/MuiDivider";
import ContactForm from "../components/ContactForm";
import Head from "next/head";

export const ContactPage = () => {
  const { toggleLoading, isLoading } = useMainContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [hasSent, setHasSent] = React.useState(false);
  const [err, setError] = React.useState(null);
  const { page } = useAnalytics();
  toggleLoading(false);
  React.useEffect(() => {
    page();
  }, []);
  return (
    <Layout title="Contact">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/shedShot.png" />
        <meta name="twitter:creator" content="@aidThompsin" />
        <meta name="twitter:site" content="@aidThompsin" />

        <meta
          property="og:title"
          //@ts-ignore
          content={`Funk-27 | Contact`}
          key="title"
        />

        <meta
          property="og:description"
          //@ts-ignore
          content="Contact Funk-27 to discuss the AT // OD podcast, one of our blogs or even the weather. Weather emails may not get a response."
          key="description"
        />

        <meta
          property="og:image"
          content="/shedShot.png"
          key="seo contact us"
        />
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h1">Contact</Typography>
          </Box>
        </Grid>
        <MuiDivider right prim />
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: isMobile ? 350 : 500,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!hasSent && (
              <ContactForm
                hasSent={hasSent}
                setHasSent={setHasSent}
                setError={setError}
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          {hasSent && !err && (
            <Typography variant="h6">Message Sent</Typography>
          )}
          {err && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">{err}</Typography>
              <Button
                sx={{ mt: 3 }}
                variant="contained"
                color="secondary"
                onClick={() => window.open("https://twitter.com/aidthompsin")}
              >
                Try Twitter?
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ContactPage;
