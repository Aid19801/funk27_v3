import React from "react";
import { Box, LinearProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export const Modal = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: "rgba(0, 0, 0, 0.2)",
        position: "absolute",
        top: 24,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LinearProgress sx={{ width: isMobile ? "70%" : "10%" }} />
    </Box>
  );
};
