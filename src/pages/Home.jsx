import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import LogoNozBlack from "../components/books/LogoNozBlack";
import Logout from "../assets/logout.svg";
import Cards from "../components/books/Cards";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("@user"));
  const token = JSON.parse(sessionStorage.getItem("@token"));

  const LogOut = () => {
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (!token?.authorization) {
      navigate("/");
    }
  }, []);
  return (
    <Box sx={{ backgroundColor: "#E0E6EE", minHeight: "100vh" }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "30px 0",
          }}
        >
          <LogoNozBlack />
          <Box
            sx={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Typography
              sx={{
                fontWeight: "400",
                color: "#333333",
                fontSize: "12px",
                "@media screen and (max-width: 500px)": {
                  display: "none",
                },
              }}
            >
              Bem vindo,{" "}
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "12px",
                "@media screen and (max-width: 500px)": {
                  display: "none",
                },
              }}
            >
              {user.name}
            </Typography>
            <img
              src={Logout}
              style={{ cursor: "pointer" }}
              onClick={LogOut}
              alt="Sair"
            />
          </Box>
        </Box>
        <Cards />
      </Container>
    </Box>
  );
};

export default Home;
