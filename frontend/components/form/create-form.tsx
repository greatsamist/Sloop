import { FC, Fragment, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Container, FormControl, Paper, TextField } from "@mui/material";

export const CreateForm: FC = () => {
  const [loading, setLoading] = useState(false);
  function handleClick() {
    setLoading(true);
  }
  return (
    <Fragment>
      <Container sx={{ m: "8rem auto" }}>
        <Box sx={{ backgroundColor: "#141414", p: "4rem" }}>
          <Paper elevation={6} />
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{
                style: {
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  width: "100%",
                  color: "#5E5E5E",
                },
              }}
              sx={{
                color: "#fff",
                input: { color: "#fff" },
                "& label.Mui-focused": {
                  color: "#FFF",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#FFA1A7",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#FFA1A7",
                  },
                },
                "&:hover fieldset": {
                  borderColor: "yellow",
                },
              }}
              // onChange={(e) => setToAddress(e.target.value)}
              // value={toAddress}
              label="Enter name of organization"
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
            sx={{
              color: "#171B24",
              backgroundColor: "#FFA1A7",
              borderColor: "#FFA1A7",
              margin: "3rem auto 0",
              "&:hover": {
                outline: "1px solid #FFA1A7",
                boxShadow: "none",
                backgroundColor: "#141414",
                color: "#fff",
              },
              "&:active": {
                boxShadow: "none",
                backgroundColor: "#FFA1A7",
                borderColor: "1px solid #FFA1A7",
              },
              "&:focus": {
                boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
              },
              "& .MuiLoadingButton-loading": {
                backgroundColor: "#FFA1A7",
              },
            }}
          >
            CREATE
          </LoadingButton>
        </Box>
      </Container>
    </Fragment>
  );
};
