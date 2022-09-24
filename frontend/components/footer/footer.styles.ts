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
  display: "flex",
  flexDirection: "column",
  color: "#C4C4C4",
  alignItems: "flex-start",
});

export const StyledFooterIcons = styled(Box)({
  p: ".1rem",
  border: "1px solid #C4C4C4",
  lineHeight: "0",
});

export const StyledFooterIcon = {
  fontSize: "20px",
  color: "#C4C4C4",
};
