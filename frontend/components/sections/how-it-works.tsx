import { Box, Button, Container, Typography } from "@mui/material";
import { LocalShipping, Circle, Wallet } from "@mui/icons-material";
import { FC, Fragment } from "react";

export const HowItWorksSection: FC = () => {
  return (
    <Fragment>
      <Box
        textAlign="center"
        sx={{
          backgroundColor: "#171B24",
          height: "auto",
          padding: "4rem 2rem 2rem",
        }}
      >
        <Typography variant="h2">How It Works</Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ marginTop: "3rem" }}
        >
          <Container>
            <LocalShipping />
          </Container>
          <Container>
            <Circle />
          </Container>
          <Container></Container>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ marginTop: "3rem" }}
        >
          <Container>
            <Typography variant="h6">
              DELIVERIES ARE SENT OUT TO DESIGNATED LOCATIONS AND RECORDED
              IMMUTABLY ON THE BLOCKCHAIN
            </Typography>
          </Container>
          <Container>
            <Typography variant="h6">
              UPON RECEIVING THE GOODS, THE RECEIVING PARTY CHECKS AND ATTEST TO
              THE INFORMATION PROVIDED
            </Typography>
          </Container>
          <Container>
            <Typography variant="h6">
              IN THE LIKELY EVENT THAT THERE ARE ANY DISCREPANCIES A DISPUTE IS
              OPENED ACCORDINGLY
            </Typography>
          </Container>
        </Box>

        <Button
          variant="outlined"
          endIcon={<Wallet />}
          sx={{
            textAlign: "center",
            alignItems: "center",
            marginTop: "3rem",
          }}
        >
          CREATE FOR YOUR BUSINESS
        </Button>
      </Box>
    </Fragment>
  );
};
