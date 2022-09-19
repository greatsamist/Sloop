import { Box, styled } from "@mui/material";

export const WellBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
  padding: "0 2rem",
  marginTop: "3rem",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
    flexDirection: "column",
    gap: "2rem",
  },
}));
