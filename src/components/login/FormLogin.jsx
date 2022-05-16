import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoNoz from "./LogoNoz";
import { Box, Button, TextField } from "@mui/material";
import api from "../../services/api";


const FormLogin = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messageErro, setMessageErro] = useState("");
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  const handleSigIn = (e) => {
    setSignIn({
      ...signIn,
      [e.target.name]: e.target.value,
    });
      setOpen(false)
  };

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const handleUser = async () => {
    if (signIn.email === "") {
      setOpen(true);
      setMessageErro("Informe um email!");
    } else if (!validateEmail(signIn.email)) {
      setOpen(true);
      setMessageErro(
        "Email inválido! Por favor insira um email válido(exemplo@exemplo.com)"
      );
    } else if (signIn.password === "") {
      setOpen(true);
      setMessageErro("Informe a senha!");
    } else {
      setOpen(false);
      await api
        .post(
          "/auth/sign-in",
          {
            email: signIn.email,
            password: signIn.password,
          },
          {
            "Content-Type": "application/json",
          }
        )
        .then((res) => {
          const { data, headers } = res;
          localStorage.setItem("@user", JSON.stringify(data));
          sessionStorage.setItem("@token", JSON.stringify(headers));
          navigate("/home");
        })
        .catch((error) => {
          const { status } = error.response;
          if (status === 401) {
            setOpen(true);
            setMessageErro("Usuário ou senha inválida");
          } else if (status === 500) {
            setOpen(true);
            setMessageErro("Infelizmente, algo deu errado.");
          }
        });
    }
  };

  return (
    <form
      style={{
        width: "368px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
        
      }}
    >
      <LogoNoz />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <TextField
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.32)",
            borderRadius: "4px",
            input: {
              color: "#FFFFFF",
            },
          }}
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          variant="filled"
          label="Email"
          name="email"
          type="email"
          required
          onChange={handleSigIn}
          autoComplete="off"
        ></TextField>
        <TextField
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.32)",
            borderRadius: "4px",
            input: {
              color: "#FFFFFF",
            },
          }}
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          required
          variant="filled"
          label="Senha"
          name="password"
          type="password"
          autoComplete="off"
          onChange={handleSigIn}
          InputProps={{
            endAdornment: (
              <Button
                onClick={handleUser}
                size="small"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "44px",
                  height: "36px",
                  width: "85px",
                  fontSize: "16px !important",
                  padding: "8px 21px",
                  color: "#B22E6F",
                  fontWeight: "500",
                  lineHeight: "20px",
                  textDecoration: "none !important",
                }}
              >
                Entrar
              </Button>
            ),
          }}
        ></TextField>
      </Box>

      {open ? <Box className="balloon">{messageErro}</Box> : null}
    </form>
  );
};

export default FormLogin;
