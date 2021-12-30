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

const navOptions = ["podcast", "blog", "contact", "about", "socials"];

export default function Nav() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [showOptions, setShowOptions] = React.useState<boolean>(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navWidth = isMobile ? "100vw" : 320;
  const responsiveFontsize = isMobile ? "50px" : "20px";

  const handleRouteChange = (loc) => {
    setIsOpen(false);
    router.push("/" + loc);
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
    <Box sx={{ display: "flex", height: "64px", zIndex: 10000000 }}>
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
        <Badge onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon />
        </Badge>
        <Typography variant="body1">Funk-27</Typography>
      </MuiAppBar>
      <Box
        className="funk__drawer"
        sx={{
          mt: 5,
          transition: "0.2s ease",
          ml: "-13px",
          py: 3,
          px: isOpen ? 1 : 0,
          position: "fixed",
          width: isOpen ? navWidth : 0,
          contain: "content",
          height: "100vh",
          zIndex: 2,
          border: isOpen ? "4px solid grey" : null,
          background: (theme) => theme.palette.secondary.light,
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography sx={{ ml: 1, mb: 2, color: "white" }} variant="h4">
            Funk-
          </Typography>
          <Typography sx={{ mb: 2, color: "orange" }} variant="h4">
            27
          </Typography>
        </Box>

        <Divider light />

        <List component="nav" aria-label="mailbox folders">
          {navOptions.map((eachOption, i) => {
            return (
              <>
                <ListItem
                  component="button"
                  onClick={() => handleRouteChange(eachOption)}
                  key={eachOption}
                  sx={{
                    color: isMobile ? "white" : "primary.light",
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
                <Divider light />
              </>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}