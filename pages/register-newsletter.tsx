import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Layout from "../components/Layout";
import { useMainContext } from "../context/main";
import {
  Box,
  Alert,
  Button,
  Grid,
  Input,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
// import { useAnalytics } from "use-analytics";
import { MuiDivider } from "../components/MuiDivider";
import ContactForm from "../components/ContactForm";
import Head from "next/head";
import Router, { useRouter } from "next/router";
// const REG_API = "http://localhost:5001/register-newsletter";
const REG_API = "https://trollboard-api.herokuapp.com/register-newsletter";

export const RegisterNewsletterPage = () => {
  const { toggleLoading, isLoading } = useMainContext();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [em, setEm] = React.useState("");
  const [hasSent, setHasSent] = React.useState(false);
  const [err, setError] = React.useState(null);
  toggleLoading(false);

  const handleChange = (evt) => {
    setEm(evt.target.value);
  };

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer fuck off you twat`);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("email", em);
  urlencoded.append("newsletter", "f27_newsLetter");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (em.includes("@") && em.includes(".")) {
      // @ts-ignore
      fetch(REG_API, requestOptions)
        .then((response) => response.json())
        .then((json) => {
          if (json.status === 200) {
            return router.push("/thanks");
          } else {
            setError("Oh dear. Something didnt work. Try the socials page!");
          }
        })
        .catch((error) => {
          console.log("error ", error);
          setError("Oh dear. Something didnt work. Try the socials page!");
        });
    } else {
      setError("invalid email");
    }
  };

  return (
    <Layout
      title="Register"
      description="Register for the weekly newsletter to stay up to date with the latest podcast, blog and other activity from the Funk-27 stables."
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
            <Typography variant="h1">Newsletter</Typography>
          </Box>
        </Grid>
        <MuiDivider right prim />
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: "100%",
              //   maxWidth: isMobile ? 350 : 500,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                id="outlined-required"
                label="Email"
                onChange={handleChange}
                name="email"
                sx={{ width: isMobile ? "300px" : "325px" }}
              />

              {err && (
                <Alert
                  sx={{
                    width: isMobile ? "275px" : "325px",
                    mt: isMobile ? 2 : 4,
                  }}
                  severity="error"
                >
                  {err}
                </Alert>
              )}
              <Button
                type="submit"
                sx={{ width: "90px", mt: isMobile ? 2 : 4 }}
              >
                Register
              </Button>
            </form>
          </Box>
        </Grid>
        <MuiDivider />
      </Grid>
    </Layout>
  );
};

export default RegisterNewsletterPage;
