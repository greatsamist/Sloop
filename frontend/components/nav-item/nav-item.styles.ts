import { Link, styled } from "@mui/material";

export const StyledLink = styled(Link)(({ theme }) => ({
  marginRight: "2rem",
  textTransform: "uppercase",
  fontSize: "0.8rem",
  [theme.breakpoints.down("md")]: {
    marginRight: "1.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
