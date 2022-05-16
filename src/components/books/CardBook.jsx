import { Modal, Box, Typography, Grid } from "@mui/material";
import React, { useState } from "react";
import { FormatQuote } from "@mui/icons-material";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  width: "100%",
  maxWidth: "1000px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "@media screen and (max-width: 600px)": {
    height: "100%",
    overflow: "auto",
  },
};

const CardBook = ({ data }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState([]);

  const [loading, setLoading] = useState(false);
  const token = JSON.parse(sessionStorage.getItem("@token"));

  let componentMounted = true;
  async function handleOpenModal(id) {
    setLoading(true);
    if (token?.authorization) {
      await api
        .get(`/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token.authorization}`,
          },
        })
        .then((res) => {
          if (componentMounted) {
            setBook(res.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
      setOpen(true);
    } else {
      navigate("/");
    }
  }

  function handleCloseModal() {
    setOpen(false);
  }

  const modalBody = (
    <Box sx={modalStyle}>
      <Box
        sx={{
          padding: "48px",
          bgcolor: "#FFFFFF",
          boxShadow: "0px 16px 80px rgba(0, 0, 0, 0.32)",
          borderRadius: "4px",
          "@media screen and (max-width: 600px)": {
            padding: "24px",
          },
        }}
      >
        <Grid
          container
          xs={12}
          spacing={3}
          sx={{
            position: "relative",
            top: "16px",
            left: "16px",
            color: "#535353",
          }}
        >
          {book.imageUrl ? (
            <Grid
              item
              xs={12}
              sm={5}
              sx={{
                backgroundImage: `url(${book.imageUrl})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: "100%",
                height: "550px",
                filter: "drop-shadow(0px 12px 18px rgba(0, 0, 0, 0.3))",
              }}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "349px",
                justifyContent: "center",
                backgroundColor: "#ccc",
              }}
            >
              <Typography fontSize="12px">No image</Typography>
            </Box>
          )}
          <Grid
            item
            xs={12}
            sm={7}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "28px",
                  color: "#333333",
                  fontWeight: "500",
                  lineHeight: "40px",
                }}
              >
                {book.title}
              </Typography>

              <Typography
                sx={{
                  color: "#2E63F7",
                  fontWeight: "400",
                  fontSize: "12px",
                  lineHeight: "20px",
                }}
              >
                {book.authors ? book.authors.join(", ") : <p>Loading...</p>}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  marginBottom: "10px",
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: "#333333",
                }}
              >
                INFORMAÇÕES
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ color: "#333333" }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      lineHeight: "28px",
                    }}
                  >
                    Páginas
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      lineHeight: "28px",
                    }}
                  >
                    Editora
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      lineHeight: "28px",
                    }}
                  >
                    Publicação
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      lineHeight: "28px",
                    }}
                  >
                    Idioma
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      lineHeight: "28px",
                    }}
                  >
                    Título Original
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      lineHeight: "28px",
                    }}
                  >
                    ISBN-10
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      lineHeight: "28px",
                    }}
                  >
                    ISBN-13
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right", color: "#999999" }}>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "28px",
                    }}
                  >
                    {book.pageCount} páginas
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "28px",
                    }}
                  >
                    {book.publisher}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "28px",
                    }}
                  >
                    {book.published}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "28px",
                    }}
                  >
                    {book.language}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "28px",
                    }}
                  >
                    {book.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "28px",
                    }}
                  >
                    {book.isbn10}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "28px",
                    }}
                  >
                    {book.isbn13}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography
                sx={{
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: "12px",
                  lineHeight: "20px",
                  color: "#333333",
                }}
              >
                Resenha da editora
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "12px",
                  lineHeight: "20px",
                  color: "#999999",
                }}
              >
                <FormatQuote sx={{ position: "relative", top: "7px" }} />
                {book.description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  return (
    <>
      <Grid item xs={12} sm={6} lg={3}>
        <Modal open={open} onClose={handleCloseModal}>
          {modalBody}
        </Modal>
        <Box
          onClick={() => handleOpenModal(data.id)}
          sx={{
            backgroundColor: "#FFFFFF",
            padding: "19px 16px",
            display: "flex",
            gap: "16px",
            borderRadius: "4px",
            boxShadow: "0px 6px 24px rgba(84, 16, 95, 0.13)",
            cursor: "pointer",
          }}
        >
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt="capa do livro"
              width="82px"
              height="122px"
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "82px",
                height: "122px",
                backgroundColor: "#ccc",
              }}
            >
              <Typography fontSize="12px">No image</Typography>
            </Box>
          )}

          <Box
            sx={{
              fontSize: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "#333333",
                  fontWeight: "500",
                  fontSize: "10px",
                }}
              >
                {data.title}
              </Typography>

              {data.authors.map((aut, i) => {
                return (
                  <Typography
                    key={aut}
                    sx={{
                      color: "#2E63F7",
                      fontWeight: "400",
                      fontSize: "10px",
                    }}
                  >
                    {aut}
                  </Typography>
                );
              })}
            </Box>
            <Box
              sx={{
                color: "#999999",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "10px",
                }}
              >
                {data.pageCount} páginas
              </Typography>
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "10px",
                }}
              >
                {data.publisher}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "10px",
                }}
              >
                Publicado em {data.published}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default CardBook;
