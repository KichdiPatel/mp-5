"use client";

import { Container } from "@mui/material";
import MainCard from "@/components/main-card";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <Container>
        <MainCard />
        <ToastContainer />
      </Container>
    </>
  );
}
