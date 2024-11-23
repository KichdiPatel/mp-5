"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import TextField from "@mui/material/TextField";
import OutputCard from "./output-card";
import { useState, useEffect } from "react";
import createShortenedUrl from "@/lib/createShortenedUrl";

export default function MainCard() {
  const [alias, setAlias] = useState("");
  const [url, setUrl] = useState("");
  const [shortenedLink, setShortenedLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentWebsiteLink, setCurrentWebsiteLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentWebsiteLink(window.location.origin);
    }
  }, []);

  const handleGenerateLink = async () => {
    if (!alias || !url) {
      setErrorMessage("Please enter both Alias and URL");
      return;
    }
    try {
      const newLink = await createShortenedUrl(alias, url);

      if (!newLink) {
        setErrorMessage("Failed to create the shortened URL. Try again. ");
        return;
      }

      setShortenedLink(`${currentWebsiteLink}/${newLink.alias}`);
      setErrorMessage("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          p: 2,
        }}
      >
        <Card
          variant="outlined"
          sx={{
            maxWidth: 1 / 3,
            width: "100%",
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "#4B4E6D",
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              pb: 0,
            }}
          >
            <Typography variant="h5" component="div" color="white">
              URL Shrinker
            </Typography>
          </CardContent>
          <CardActionArea
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 2,
            }}
          >
            <TextField
              id="outlined-basic"
              label="Alias"
              variant="outlined"
              onChange={(e) => setAlias(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="URL"
              variant="outlined"
              onChange={(e) => setUrl(e.target.value)}
            />
          </CardActionArea>
          <CardActions
            sx={{
              justifyContent: "center",
              p: 2,
            }}
          >
            <Button
              variant="contained"
              size="medium"
              onClick={handleGenerateLink}
              sx={{
                color: "white",
                backgroundColor: "#84DCC6",
              }}
            >
              Get Shortened Url!
            </Button>
          </CardActions>
          {errorMessage && (
            <Typography
              variant="body2"
              sx={{ color: "red", textAlign: "center", mt: 1 }}
            >
              {errorMessage}
            </Typography>
          )}
        </Card>

        {shortenedLink && <OutputCard shortenedUrl={shortenedLink} />}
      </Box>
    </>
  );
}
