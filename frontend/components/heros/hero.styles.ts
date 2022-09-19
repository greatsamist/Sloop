import { styled } from "@mui/material/styles";

export const StyledTitle = styled("h1")(({ theme }) => ({
  textAlign: "center",
  textTransform: "uppercase",
  margin: "0",
  letterSpacing: "4px",
  lineHeight: "33px",
  fontFamily: "Inter",
  fontSize: "3rem",
  fontWeight: "700",
  padding: "0 2rem",
  color: "#fff",
  marginTop: "2rem",
  // Apply breakpoints here
  [theme.breakpoints.down("lg")]: {
    fontSize: "2rem",
    marginTop: "1.5rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
    marginTop: "0.2rem",
  },
}));

export const StyledTitleSpan = styled("span")({
  color: "#fff",
  fontSize: "10px",
});

export const StyledRedTitle = styled(StyledTitle)({
  color: "#F30917",
});

export const StyledSubTitle = styled("p")(({ theme }) => ({
  textAlign: "center",
  // display: "inline-flex",
  fontWeight: "400",
  color: "#E5E5E5",
  fontFamily: "Source Sans Pro",
  fontSize: "1.6rem",
  width: "60%",
  marginTop: "3rem",

  [theme.breakpoints.down("lg")]: {
    fontSize: "1.4rem",
    marginTop: "2.5rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.2rem",
    marginTop: "2rem",
  },
}));

export const StyledGradientBackground = styled("div")({
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  position: "absolute",
  background:
    "radial-gradient(95% 75% at 50% 100%, #0B0B45 0%, rgb(0, 0, 0) 100%)",
});
