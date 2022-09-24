import { FC, Fragment } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";

export const DashboardProduct: FC = () => {
  return (
    <Fragment>
      <Container>
        <Paper elevation={12} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
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
              backgroundColor: "rgba(207, 109, 187, 0.5)",
              borderRadius: "10px",
            }}
          >
            <Typography>TOTAL STOCK COUNT</Typography>
            <Typography variant="h3">49,000</Typography>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};
