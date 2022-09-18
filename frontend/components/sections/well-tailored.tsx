import { FC, Fragment } from "react";
import { Box, CardMedia, Container, Link, Typography } from "@mui/material";

export const WellTailored: FC = () => {
  return (
    <Fragment>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="5rem"
        sx={{ padding: "12rem 2rem 4rem", width: "90%", margin: "0 auto" }}
      >
        <Container>
          <CardMedia
            height="100%"
            component="img"
            src="./assets/images/welltailored.svg"
            title="well tailored image"
            sx={{ objectFit: "contain" }}
          />
        </Container>
        <Container>
          <Typography variant="h2" sx={{ marginBottom: "1rem" }}>
            Well Tailored
          </Typography>
          <Typography sx={{ marginBottom: "1rem" }}>
            Straps allows you to have a well tailored and customizable platform
            that can be tuned and tweaked for your company’s use across all
            spheres, ranging from different industries.
          </Typography>
          <Link
            underline="hover"
            color="secondary"
            sx={{ textTransform: "uppercase", fontFamily: "Inter" }}
          >
            Learn More
          </Link>
        </Container>
      </Box>
    </Fragment>
  );
};
