import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  Badge,
  Drawer,
  ListItemIcon,
  List,
  ListItemText,
  ListItem,
  Divider,
  Button,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useMainContext } from "../context/main";
import Link from "next/link";

const navOptions = [
  "podcast",
  "blog",
  "contact",
  "about",
  "socials",
  "trollboard",
];

export default function Nav() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const responsiveFontsize = isMobile ? "30px" : "20px";
  const { toggleLoading } = useMainContext();
  const router = useRouter();
  const handleBadgeClick = () => {
    setIsOpen(!isOpen);
    console.log("menu: ", isOpen);
  };

  const handleRouteClick = () => {
    toggleLoading(true);
    setIsOpen(false);
  };

  const handleHome = () => {
    toggleLoading(true);
    setIsOpen(false);
    return router.push("/");
  };

  return (
    <>
      <MuiAppBar
        sx={{
          py: 2,
          px: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Badge onClick={handleBadgeClick}>
          <MenuIcon />
        </Badge>
        <Link href="/">
          <Typography variant="body1">Funk-27</Typography>
        </Link>
      </MuiAppBar>

      <Drawer anchor="left" open={isOpen} onClose={handleBadgeClick}>
        <Box
          className="funk__drawer"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: isMobile ? "91vw" : 350,
            px: "20px",
            py: "20px",
          }}
          role="presentation"
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            onClick={handleHome}
          >
            <Typography
              variant="body1"
              color="primary.main"
              sx={{ fontSize: "30px" }}
            >
              Funk
            </Typography>
            <Typography
              variant="body1"
              color="secondary.main"
              sx={{ fontSize: "30px" }}
            >
              -27
            </Typography>
          </Box>

          <CloseIcon color="primary" onClick={handleBadgeClick} />
        </Box>
        <Divider />
        <Box role="presentation">
          <List component="nav">
            {navOptions.map((eachOption, i) => {
              return (
                <React.Fragment key={eachOption}>
                  <Link href={`/${eachOption}`} passHref>
                    <ListItem
                      button
                      component="a"
                      onClick={handleRouteClick}
                      sx={{
                        color: isMobile ? "white" : "white",
                        background: "none",
                        border: "none",
                      }}
                    >
                      <ListItemText
                        primary={eachOption}
                        sx={{
                          color: (theme) => theme.palette.secondary.light,
                          textAlign: isMobile ? "center" : "start",
                          "& span": {
                            ml: isMobile ? 0 : 1,
                            fontSize: responsiveFontsize,
                          },
                        }}
                      />
                    </ListItem>
                  </Link>
                  <Divider light />
                </React.Fragment>
              );
            })}
          </List>
        </Box>
        {/* <Divider /> */}
      </Drawer>
    </>
  );
}
