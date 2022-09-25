import { FC, Fragment } from "react";
import { UDButton } from "@components";
import { Box } from "@mui/material";

import {
  StyledRedTitle,
  StyledSubTitle,
  StyledTitle,
  StyledTitleSpan,
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
          height: "100vh",
          minHeight: "100vh",
          alignItems: "center",
          paddingBottom: "2rem",
        }}
      >
        <StyledTitle sx={{ marginBottom: "0" }}>
          Supply Chain management at your
        </StyledTitle>
        <StyledRedTitle>
          finger<StyledTitleSpan>Tip</StyledTitleSpan>
        </StyledRedTitle>

        <StyledSubTitle>
          Your all in one place to track supplies distribution and day to day
          activities, Straps allows you have a transparent, qualitative and
          quantitative assessment of your overall processes
        </StyledSubTitle>

        <UDButton />
      </Box>
    </Fragment>
  );
};
