import { Box, ListItem, styled } from "@mui/material";

export const StyledFooter = styled(Box)({
  flex: "0 0 20%",
  width: "20%",
  display: "flex",
  flexDirection: "column",
});

export const StyledListItem = styled(ListItem)({
  margin: "0",
  paddingLeft: "0",
  paddingRight: "0",
  fontFamily: "PT Sans",
  fontSize: "0.7rem",
  display: "flex",
  flexDirection: "column",
  color: "#fff",
  alignItems: "flex-start",
});
