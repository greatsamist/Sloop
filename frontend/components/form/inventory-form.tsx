import { FC, Fragment } from "react";
import { Container, Paper, Typography } from "@mui/material";

export const InventoryForm: FC = () => {
  return (
    <Fragment>
      <Container>
        <Paper elevation={6} />
        <Typography variant="h6">UPDATE INVENTORY</Typography>
      </Container>
    </Fragment>
  );
};
