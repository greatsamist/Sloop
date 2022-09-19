import { AppBar, styled, Toolbar } from "@mui/material";

export const StyledHeader = styled(AppBar)({
  zIndex: "20",
  background: "transparent",
  backdropFilter: "saturate(180%) blur(14px)",
  position: "sticky",
  top: 0,
});

export const StyledNavContainer = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
