import { Box, Button } from "@mui/material";
import { Wallet } from "@mui/icons-material";
import { FC, Fragment } from "react";
import {
  StyledTitle,
  StyledTitleSpan,
  StyledRedTitle,
  StyledSubTitle,
} from "./hero.styles";

export const IndexHero: FC = () => {
  return (
    <Fragment>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{
          margin: "0 auto",
          height: "calc(100vh - 80px)",
          minHeight: "calc(100vh - 80px)",
          // flexDirection: "column",
          alignItems: "center",
        }}
      >
        <StyledTitle sx={{ marginBottom: "0" }}>
          Supply Chain management at your
        </StyledTitle>
        <StyledRedTitle>fingerTIP</StyledRedTitle>
        <StyledSubTitle>
          Your all in one place to track supplies distribution and day to day
          activities, Straps allows you have a transparent, qualitative and
          quantitative assessment of your overall processes
        </StyledSubTitle>

        <Button
          variant="outlined"
          endIcon={<Wallet />}
          sx={{
            textAlign: "center",
            alignItems: "center",
            margin: "60px 0",
          }}
        >
          Login With UD
        </Button>
      </Box>
    </Fragment>
  );
};
