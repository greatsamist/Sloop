import { FC, Fragment } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Paper,
  TextField,
} from "@mui/material";

export const CreateForm: FC = () => {
  return (
    <Fragment>
      <Container sx={{ m: "8rem 0" }}>
        <Box sx={{ backgroundColor: "#141414", minHeight: "30rem", p: "4rem" }}>
          <Paper elevation={4} />
          <FormControl fullWidth>
            <TextField
              color="secondary"
              sx={{ input: { color: "blue" } }}
              // onChange={(e) => setToAddress(e.target.value)}
              // value={toAddress}
              label="Enter name of organization"
              variant="outlined"
            />
          </FormControl>
          <Button
            variant="contained"
            sx={{
              textAlign: "center",
              alignItems: "center",
              marginTop: "3rem",
            }}
          >
            CREATE
          </Button>
        </Box>
      </Container>
    </Fragment>
  );
};
