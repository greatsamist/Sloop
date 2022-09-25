import { FC, Fragment, useState } from "react";
import { strapsFactoryABI, strapsFactoryAddress } from "@lib";
import CheckIcon from "@mui/icons-material/Check";
import { LoadingButton } from "@mui/lab";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Fade,
  FormControl,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useAccount, useContractWrite } from "wagmi";
import { usePrepareContractWrite } from "wagmi";

import {
  chatStyle,
  inputLabelProps,
  styledLoadingButton,
  styledTextField,
} from "./form.styles";

export const CreateForm: FC = () => {
  const { address } = useAccount();
  const [adminAddress, setAdminAddress] = useState<String | undefined>(address);
  const [companyName, setCompanyName] = useState<String>("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  // usePrepareContractWrite
  const { config } = usePrepareContractWrite({
    addressOrName: strapsFactoryAddress,
    contractInterface: strapsFactoryABI,
    functionName: "createStraps",
    args: [],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const handleClose = () => setOpen(false);
  function handleClick() {
    setLoading(true);
    setOpen(true);
    write();
  }
  return (
    <Fragment>
      <Container sx={{ m: "8rem auto" }}>
        <Box sx={{ backgroundColor: "#141414", p: "4rem" }}>
          <Paper elevation={6} />
          <Typography textAlign="center" variant="h6">
            CREATE STRAP
          </Typography>
          <FormControl fullWidth>
            <TextField
              //@ts-ignore
              InputLabelProps={inputLabelProps}
              sx={styledTextField}
              onChange={(e) => setCompanyName(e.target.value)}
              value={companyName}
              label="Enter name of organization"
              variant="outlined"
            />
            <TextField
              //@ts-ignore
              InputLabelProps={inputLabelProps}
              sx={styledTextField}
              onChange={(e) => setAdminAddress(e.target.value)}
              value={adminAddress}
              label={`${address ? address : "Enter admin address"}`}
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
            CREATE
          </LoadingButton>
        </Box>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={chatStyle}>
              <Container
                sx={{
                  width: "30%",
                  p: "1.5rem",
                  background: " #e3aec0",
                  height: "100%",
                  borderRadius: "10px 0 0 10px",
                }}
              >
                {loading && (
                  <CircularProgress
                    size={68}
                    sx={{
                      color: "#4CAF50",
                      position: "absolute",
                      top: -6,
                      left: -6,
                      zIndex: 1,
                    }}
                  />
                )}
                {success ? <CheckIcon /> : ""}
              </Container>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </Fragment>
  );
};
