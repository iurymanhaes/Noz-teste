import { Grid, Typography, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import CardBook from "./CardBook";
import api from "../../services/api";

const Cards = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState(12);
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(sessionStorage.getItem("@token"));

  let componentMounted = true;

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      await api
        .get(`/books?page=${page}&amount=${amount}&category=biographies`, {
          headers: {
            Authorization: `Bearer ${token.authorization}`,
          },
        })
        .then((res) => {
          if (componentMounted) {
            setData(res.data.data);
            let totalP = Math.ceil(res.data.totalItems / amount);
            setTotalPages(totalP);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });

      return () => {
        componentMounted = false;
      };
    };

    getBooks();
  }, [page]);

  function decreasePage() {
    if (page !== 1) {
      setPage(page - 1);
    }
  }

  function increasePage() {
    if (page !== totalPages) {
      setPage(page + 1);
    }
  }

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      sx={{ color: "#535353" }}
      xs={12}
    >
      <Grid container xs={12} item spacing={2} display='flex' alignItems="center">
        {data.map((el, i) => {
          return <CardBook data={el} key={el.id}/>;
        })}
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "8px",
          margin: "16px 0",
          padding: "0",
        }}
      >
        <Typography
          sx={{
            color: "#333333",
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "20px",
          }}
        >
          Página <span style={{ fontWeight: "bold" }}>{page}</span> de
          <span style={{ fontWeight: "bold" }}> {totalPages}</span>
        </Typography>
        <IconButton
          sx={{
            border: "1px solid rgba(51, 51, 51, 0.2)",
            width: "32px",
            height: "32px",
          }}
          onClick={decreasePage}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          sx={{
            border: "1px solid rgba(51, 51, 51, 0.2)",
            width: "32px",
            height: "32px",
          }}
          onClick={increasePage}
        >
          <ChevronRight />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Cards;
