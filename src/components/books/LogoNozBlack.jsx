import { Box, Typography } from "@mui/material";
import React from "react";
import Logo from "../../assets/logo_NOZ_black.svg";

const LogoNozBlack = () => {
  return (
    <Box
        sx={{
          display: "flex",
          gap: "9px",
          alignItems: "center",
          
        }}
      >
      <img
        src={Logo}
        alt="Logo noz"
        sx={{
          width: "69px",
          height: "26px",
        }}
      />
       <Typography
          sx={{
            color:"#333333",
            fontSize: "28px",
            fontWeight: "300",
            fontFamily:"Heebo"
          }}
        >
          Books
        </Typography>
    </Box>
  );
};

export default LogoNozBlack;