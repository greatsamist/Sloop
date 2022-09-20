import { FC, Fragment, useState } from "react";
import { stringAvatar } from "@components/utils";
import { Chat, Send } from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  Badge,
  Box,
  Container,
  Fade,
  FormControl,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Client } from "@xmtp/xmtp-js";
// import { ethers, Wallet } from "ethers";
import { useSigner } from "wagmi";

import { chatStyle } from "./modal.styles";

export const ChatModal: FC = () => {
  const [open, setOpen] = useState(false);
  // Handle xmtp client
  const [client, setClient] = useState<Client>();
  // handle load conversations
  const [loadingConversations, setLoadingConversations] =
    useState<boolean>(false);

  const { getMessages, dispatchMessages } = useMessageStore();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  ////////////////////////////////
  // xmtp config
  const { data: signer } = useSigner();
  // Create new conversations
  const xmtp = async () => {
    if (!signer) return;
    setClient(
      await Client.create(signer, {
        env: "dev",
      })
    );
  };

  // List existing conversations
  const listConversations = async () => {
    if (!client) return;
    console.log("Listing conversations");
    setLoadingConversations(true);
    const convos = await client.conversations.list();
    convos.forEach((convo: Conversation) => {
      dispatchConversations([convo]);
    });
    setLoadingConversations(false);
  };
  listConversations();

  return (
    <Fragment>
      <Badge color="secondary" badgeContent={0} showZero>
        <Chat onClick={handleOpen} sx={{ cursor: "pointer" }} />
      </Badge>
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
              sx={{ width: "30%", background: " #e3aec0", height: "500px" }}
            >
              <Typography variant="h2">MESSAGING</Typography>

              <Avatar {...stringAvatar("Branch Manager")} />
              <Avatar {...stringAvatar("Jed Watson")} />
              <Avatar {...stringAvatar("Product Manager")} />
            </Container>
            <Container sx={{ width: "70%", background: " #fff" }}>
              <FormControl fullWidth>
                <TextField
                  //   onChange={handleUserChange}
                  value={"user"}
                  label="Nickname"
                  variant="outlined"
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  //   onChange={handleMessageChange}
                  //   onKeyDown={handleEnterKey}
                  value={"message"}
                  label="Type your message..."
                  variant="outlined"
                />
              </FormControl>

              <IconButton
                // onClick={sendMessage}
                aria-label="send"
                color="primary"
              >
                <Send />
              </IconButton>
            </Container>
          </Box>
        </Fade>
      </Modal>
    </Fragment>
  );
};
