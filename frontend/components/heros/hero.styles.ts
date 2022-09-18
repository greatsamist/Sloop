import { styled } from "@mui/material/styles";

export const StyledTitle = styled("h1")({
  textAlign: "center",
  textTransform: "uppercase",
  margin: "0",
  letterSpacing: "4px",
  lineHeight: "33px",
  fontFamily: "Inter",
  fontSize: "40px",
  fontWeight: "700",
  color: "#fff",
  marginTop: "30px",
  // Apply breakpoints here
  lh: "1.2",
  fs: "2.5rem",
  "@sm": {
    fs: "3rem",
  },
  "@lg": {
    fs: "3.5rem",
  },
});

export const StyledTitleSpan = styled("span")({
  color: "#fff",
  fontSize: "10px",
});

export const StyledRedTitle = styled(StyledTitle)({
  color: "#F30917",
});

export const StyledSubTitle = styled("p")({
  textAlign: "center",
  // display: "inline-flex",
  fontWeight: "400",
  color: "#E5E5E5",
  fontFamily: "Source Sans Pro",
  fontSize: "22px",
  width: "50%",
  marginTop: "40px",
});

export const StyledGradientBackground = styled("div")({
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  position: "absolute",
  background:
    "radial-gradient(95% 75% at 50% 100%, #0B0B45 0%, rgb(0, 0, 0) 100%)",
});
