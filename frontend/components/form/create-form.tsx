import { FC, Fragment, useMemo, useState } from "react";
import type { TransactionReceipt } from "@ethersproject/providers";
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
import { useRouter } from "next/router";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";

import {
  chatStyle,
  inputLabelProps,
  styledLoadingButton,
  styledTextField,
} from "./form.styles";

export const CreateForm: FC<CreateFormProps> = (props: CreateFormProps) => {
  const { onError, onSuccess } = props;

  const { address } = useAccount();
  const [adminAddress, setAdminAddress] = useState<String | undefined>(address);
  const [companyName, setCompanyName] = useState<String>("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorReason, setErrorReason] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  // usePrepareContractWrite
  const creation = useContractWrite({
    addressOrName: strapsFactoryAddress,
    contractInterface: strapsFactoryABI,
    functionName: "createStraps",
    onSettled: async (_, error) => {
      if (error) {
        const reason = (error as unknown as { reason: string }).reason;
        const reasonString = reason.split(":")[1];
        setErrorReason(reasonString);
        await onError(error);
      }
    },
  });

  const waitCreation = useWaitForTransaction({
    wait: creation.data?.wait,
    hash: creation.data?.hash,
    onSuccess: async (data: TransactionReceipt) => {
      await onSuccess(data);
      console.log(data);
    },
  });

  const isLoading = useMemo<boolean>(() => {
    return Boolean(creation.isLoading || waitCreation.isLoading);
  }, [creation.isLoading, waitCreation.isLoading]);

  const handleClose = () => setOpen(false);
  const handleClick = async () => {
    setLoading(true);
    setOpen(true);
    try {
      await creation.writeAsync({
        args: [companyName, adminAddress],
      });
    } catch (error) {
      return;
    }
    // setLoading(false);

    setSuccess(true);
    router.push("/dashboard");
  };

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
      </Container>
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
            <Box
              sx={{
                p: "1.5rem",
              }}
            >
              {isLoading ? (
                <CircularProgress
                  size={68}
                  sx={{
                    color: "#4CAF50",
                    // position: "absolute",
                    // top: -6,
                    // left: -6,
                    zIndex: 1,
                  }}
                />
              ) : (
                ""
              )}
              {success ? <CheckIcon /> : errorReason ? errorReason : ""}
              {success ? (
                <Typography>Straps Creation successful</Typography>
              ) : (
                ""
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Fragment>
  );
};

interface CreateFormProps {
  onError: (error: Error) => Promise<void>;
  onSuccess: (data: TransactionReceipt) => Promise<void>;
}
