import { Box, Typography } from "@mui/material";
import React from "react";
import Logo from "../../assets/logo_NOZ.svg";

const LogoNoz = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "9px",
        alignItems: "center",
        marginBottom: "50px",
      }}
    >
      <img
        src={Logo}
        alt="Logo noz"
        sx={{
          width: "69px",
          height: "26px",
          color: "#FFFFFF",
        }}
      />
      <Typography
        sx={{
          color: "#FFFFFF",
          fontSize: "28px",
          fontWeight: "300",
          fontFamily: "Heebo",
          "@media (max-width: 500px)": {
            color: "#cFFFFF"
          },
        }}
      >
        Books
      </Typography>
    </Box>
  );
};

export default LogoNoz;
