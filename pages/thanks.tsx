import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Layout from "../components/Layout";
import { useMainContext } from "../context/main";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
// import { useAnalytics } from "use-analytics";
import { MuiDivider } from "../components/MuiDivider";
import MoreContent from "../components/MoreContent";

export const RegisterNewsletterPage = () => {
  const { toggleLoading, isLoading } = useMainContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  toggleLoading(false);

  return (
    <Layout
      title="Thanks for registering..."
      description="Thank you for registering"
      seoImage="/f27_seoImage.jpg"
    >
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
            <Typography variant="h1">THANKS!</Typography>
          </Box>
        </Grid>
        <MoreContent />
      </Grid>
    </Layout>
  );
};

export default RegisterNewsletterPage;
