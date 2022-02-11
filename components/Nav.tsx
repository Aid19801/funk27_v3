import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Badge } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
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
  const [showOptions, setShowOptions] = React.useState<boolean>(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navWidth = isMobile ? "100vw" : 320;
  const responsiveFontsize = isMobile ? "50px" : "20px";

  const { toggleLoading } = useMainContext();

  const handleRouteChange = (loc) => {
    toggleLoading(true);
    setIsOpen(false);
    // router.push("/" + loc);
  };

  const handleBadgeClick = () => {
    // open/close the menu
    setIsOpen(!isOpen);
    const el = document.querySelector("#page-root");
    el.scrollIntoView();
  };

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setShowOptions(true);
      }, 300);
    } else {
      setShowOptions(false);
    }
  }, [isOpen]);

  return (
    <Box
      sx={{
        display: "flex",
        height: isMobile ? "51px" : "56px",
        zIndex: 10000000,
      }}
    >
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
      <Box
        className="funk__drawer"
        sx={{
          mt: 5,
          transition: "0.2s ease",
          ml: "-28px",
          py: 3,
          px: isOpen ? 1 : 0,
          position: "absolute",
          top: isMobile ? "15px" : null,
          left: isMobile ? "4px" : "28px",
          width: isOpen ? navWidth : 0,
          contain: "content",
          height: "auto",
          zIndex: 6,
          border: isOpen ? "4px solid grey" : null,
          background: (theme) => theme.palette.secondary.light,
          boxShadow: "1px 20px 26px 5px rgba(0,0,0,0.67)",
        }}
      >
        {isOpen && (
          <Link href="/">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                ml: isMobile ? 2 : 0,
              }}
            >
              <Typography sx={{ ml: 1, mb: 2, color: "white" }} variant="h4">
                Funk-
              </Typography>
              <Typography sx={{ mb: 2, color: "orange" }} variant="h4">
                27
              </Typography>
            </Box>
          </Link>
        )}

        {/* <Divider light /> */}

        <List
          component="nav"
          aria-label="mailbox folders"
          sx={{
            visibility: isOpen ? "visible" : "hidden",
            ml: isMobile ? "15px" : "-6px",
          }}
        >
          {navOptions.map((eachOption, i) => {
            return (
              <React.Fragment key={eachOption}>
                <Link href={`/${eachOption}`} passHref>
                  <ListItem
                    button
                    component="a"
                    onClick={() => handleRouteChange(eachOption)}
                    sx={{
                      color: isMobile ? "white" : "white",
                      background: "none",
                      border: "none",
                    }}
                  >
                    <ListItemText
                      primary={eachOption}
                      sx={{
                        textAlign: isMobile ? "center" : "start",
                        "& span": {
                          transition: `${(i + 1) * 200}ms`,
                          ml: isOpen ? 0 : "-50px",
                          fontSize: isOpen ? responsiveFontsize : "100px",
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
    </Box>
  );
}
