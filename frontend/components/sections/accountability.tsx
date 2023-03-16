import { FC } from "react";
import { Box, CardMedia, Container, Link, Typography } from "@mui/material";

export const Accountability: FC = () => {
  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="5rem"
        sx={{ padding: "4rem 0rem 12rem" }}
      >
        <Container>
          <Typography variant="h2" sx={{ marginBottom: "1rem" }}>
            Accountability
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

        <Container
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <CardMedia
            height="100%"
            component="img"
            src="./assets/images/Accountability.svg"
            title="well tailored image"
            sx={{ objectFit: "contain" }}
          />
        </Container>
      </Box>
    </Container>
  );
};
