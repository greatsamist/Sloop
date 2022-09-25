import { FC, Fragment } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";

export const DashboardProduct: FC = () => {
  return (
    <Fragment>
      <Container sx={{ m: "4rem auto 2rem" }}>
        <Paper elevation={12} />
        <Typography variant="h3" sx={{ mb: "2rem" }}>
          Company Name
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <Box
            sx={{
              padding: "2rem 4rem",
              backgroundColor: "rgba(207, 109, 187, 0.5)",
              borderRadius: "10px",
            }}
          >
            <Typography>TOTAL STOCK COUNT</Typography>
            <Typography variant="h3">49,000</Typography>
          </Box>
          <Box
            sx={{
              padding: "2rem 4rem",
              backgroundColor: "rgba(248, 124, 34, 0.5)",
              borderRadius: "10px",
            }}
          >
            <Typography>AVAILABLE STOCK</Typography>
            <Typography variant="h3">49,000</Typography>
          </Box>
          <Box
            sx={{
              padding: "2rem 4rem",
              backgroundColor: "rgba(255, 162, 167, 0.5)",
              borderRadius: "10px",
            }}
          >
            <Typography>DISTRIBUTED STOCK</Typography>
            <Typography variant="h3">49,000</Typography>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};
