import { FC, Fragment } from "react";
import { Box, CardMedia, Container, Typography } from "@mui/material";
import tailoredImage from "../../public/assets/images/welltailored.png";

export const WellTailored: FC = () => {
  return (
    <Fragment>
      <Box
        display="flex"
        alignContent="center"
        justifyContent="space-between"
        sx={{ padding: "2rem" }}
      >
        <Container>
          <CardMedia
            height="180"
            component="img"
            image={tailoredImage}
            title="well tailored image"
          />
        </Container>
        <Container>
          <Typography variant="h2">Well Tailored</Typography>
          <Typography>
            Straps allows you to have a well tailored and customizable platform
            that can be tuned and tweaked for your company’s use across all
            spheres, ranging from different industries.
          </Typography>
          <Typography>Learn More</Typography>
        </Container>
      </Box>
    </Fragment>
  );
};
