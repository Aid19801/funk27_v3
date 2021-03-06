import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Layout from "../components/Layout";
import { useMainContext } from "../context/main";
import { Box, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { MuiDivider } from "../components/MuiDivider";
// import ProgressiveImage from "../components/LazyImage";
import { FadeUp } from "../components/FadeUp";
import ProgressiveImage from "../components/ProgressiveImage";

const asSeenOnImgs = [
  "https://cdn-radiotime-logos.tunein.com/s17569g.png",
  "https://icon-library.com/images/bbc-icon/bbc-icon-14.jpg",
  "https://thegrumpydads.files.wordpress.com/2020/11/full-design.jpg?w=1024",
  "https://www.ytas.org.uk/wp-content/uploads/2019/04/fringe-logo.jpg",
  "https://www.chortle.co.uk/images/photos/small/leicester-square-theatre.jpg",
  "https://www.logo-designer.co/wp-content/uploads/2017/04/2017-huffpost-new-logo-design-2.png",
];
export const AboutPage = () => {
  const { toggleLoading } = useMainContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  toggleLoading(false);
  return (
    <Layout
      title="About"
      description="All about F27. How did this start? What even is this?"
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
            <Typography variant="h1">About</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <FadeUp>
            <Typography
              variant="body1"
              sx={{ fontSize: isMobile ? 30 : 40, color: "darkgrey" }}
            >
              Funk-27 was the brainchild of London-based Software Engineer,
              Adrian Thompson. In fact, that's me. I don't know why I'm talking
              about myself in the third person.
            </Typography>
          </FadeUp>
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="body1"
            sx={{ fontSize: isMobile ? 15 : 20, color: "orange", mb: 2 }}
          >
            Dreamed up after five beers, the platform seeks to become a conduit
            for those looking to gobblie up intelligent and/or funny Podcasts
            and engaging or humorous Blogs.
          </Typography>

          <MuiDivider left />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "100%", height: "500px" }}>
              <ProgressiveImage
                loadingSrc={
                  "https://images.pexels.com/photos/2177009/pexels-photo-2177009.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=5"
                }
                src="/shedShot.jpg"
                alt="shed cabin studio"
              />
            </Box>
            {/* <Image
              className="rounded-corners"
              alt="aid thompsin profile picture"
              height={600}
              width={900}
              src="/shedShot.png"
            /> */}

            <Typography
              variant="body1"
              fontFamily="monospace"
              fontSize={10}
              width={isMobile ? "80%" : "80%"}
              color="secondary.dark"
              mt={1}
              textAlign="left"
            >
              The AT // OD studio which is easily the best podcast to have ever
              emerged from this specific shed.
            </Typography>
          </Box>

          <MuiDivider right prim />

          <Typography
            variant="body1"
            sx={{
              fontSize: isMobile ? 15 : 20,
              color: "white",
              p: 2,
              mt: 2,
              bgcolor: "darkgrey",
            }}
          >
            If you <i>really</i> want to get a feel what the content is like,
            it's influenced by the comedic stylings of Marina Hyde and Tim
            Dillon - after an assault by, I dunno, Christ, maybe... campaigning
            journalists like Raphael Behr and Ian Dunt.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: isMobile ? 15 : 20,
              color: "black",
              bgcolor: "lightgrey",
              padding: 2,
              mt: 2,
            }}
          >
            The first launch by <i>Funk-27</i> was the explosive "Aid Thompsin &
            Other Disappointments" podcast. The show began in December 2020 with
            its first guest, Emmett Short, and took the form of a weekly Tech,
            Comedy & Dystopia conversation. "What will Crypto do to the Finance
            industry?" feat Tom Pontin, or "What does the future of UX [user
            experience] look like?", and so on. <br />
            <br />
            But as the Pandemic took hold and reality began to resemble the
            dystopias we'd read about in Science Fiction novels, the worlds of
            Science, Politics and Tech began to align. And so the show has
            broadened out to find-the-funny in (or merely examine) areas like
            Brexit, Tory Government, the Trumpification of the Republican Party
            and/or the changing shape and influence of Media in the 21st
            Century.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} alignItems="center">
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Image
              className="rounded-corners"
              alt="aid thompsin profile picture"
              height={640}
              width={386}
              src="/me_mob.png"
              placeholder="blur"
              blurDataURL="/me_blur.png"
            /> */}

            <Box sx={{ width: "386px", height: "640px" }}>
              <ProgressiveImage
                src="/me_mob.png"
                loadingSrc="/me_blur.png"
                alt="picture of aid thompsin face"
              />
            </Box>
            <Typography
              variant="body1"
              fontFamily="monospace"
              fontSize={10}
              width={isMobile ? "80%" : "50%"}
              color="secondary"
              mt={2}
              textAlign={isMobile ? "center" : "left"}
            >
              Aid Thompsin (me), attempting to look half-serious but coming off
              as self-satisfied.
            </Typography>
            <Box
              sx={{
                width: isMobile ? "100%" : "70%",
                py: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              {asSeenOnImgs.map((each) => {
                return (
                  <div className="hover-line" key={each}>
                    <Image
                      className="rounded grey-border hover-fade"
                      alt="as seen on images logos"
                      height={50}
                      width={50}
                      src={each}
                    />
                  </div>
                );
              })}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AboutPage;
