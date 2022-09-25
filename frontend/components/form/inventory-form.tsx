import { FC, Fragment, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Container,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import {
  inputLabelProps,
  styledLoadingButton,
  styledTextField,
} from "./form.styles";

export const InventoryForm: FC = () => {
  const [loading, setLoading] = useState(false);
  function handleClick() {
    setLoading(true);
  }
  return (
    <Fragment>
      <Container>
        <Paper elevation={6} />
        <Box sx={{ backgroundColor: "#141414", p: "2rem" }}>
          <Paper elevation={6} />
          <Typography textAlign="center" variant="h6">
            UPDATE INVENTORY
          </Typography>
          <FormControl fullWidth>
            <TextField
              //@ts-ignore
              InputLabelProps={inputLabelProps}
              sx={styledTextField}
              // onChange={(e) => setToAddress(e.target.value)}
              // value={toAddress}
              label="Name of product"
              variant="outlined"
            />
            <TextField
              //@ts-ignore
              InputLabelProps={inputLabelProps}
              sx={styledTextField}
              // onChange={(e) => setToAddress(e.target.value)}
              // value={toAddress}
              label="Amount Received"
              variant="outlined"
            />
          </FormControl>
          <LoadingButton
            fullWidth
            size="large"
            variant="contained"
            onClick={handleClick}
            loading={loading}
            loadingPosition="start"
            sx={styledLoadingButton}
          >
            PROCEED
          </LoadingButton>
        </Box>
      </Container>
    </Fragment>
  );
};
