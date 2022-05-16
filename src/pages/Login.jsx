import { Box, Grid } from "@mui/material";
import React from "react";
import Background from "../assets/background.svg";
import FormLogin from "../components/login/FormLogin";
const Login = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      
        "@media (max-width: 800px)": {
          backgroundPosition:"-400px"
        },
        "@media (max-width: 500px)": {
          backgroundPosition:"-500px"
        },
       
      }}
    >
      <Grid
        container
        xs={12}
        sx={{
          paddingLeft: "115px",
          "@media (max-width: 700px)": {
            paddingLeft: "15px",
            paddingRight: "15px",
          },
        }}
      >
        <FormLogin />
      </Grid>
    </Box>
  );
};

export default Login;
