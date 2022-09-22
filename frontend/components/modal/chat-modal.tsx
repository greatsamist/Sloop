import {
  ChangeEvent,
  FC,
  Fragment,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
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
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Client } from "@xmtp/xmtp-js";
import { useNetwork, useSigner, useSwitchNetwork } from "wagmi";

import { chatStyle } from "./modal.styles";

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

export const ChatModal: FC<ListChildComponentProps> = (
  props: ListChildComponentProps
) => {
  const scrollBottomRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);
  // set xmtp client
  const [client, setClient] = useState<Client>();
  // set load conversations
  const [loadingConversations, setLoadingConversations] =
    useState<boolean>(false);
  // set receiver address
  const [receiverAddress, setReceiverAddress] = useState<string>(
    "0x14254ce9aB9B3aaD797aF7e55374fE97dC981e8C"
  );
  // set content
  const [content, setContent] = useState<string>("Sample XMTP text");
  // set peers
  const [peers, setPeers] = useState<{ id: number; address: string }[]>([]);
  // set conversations
  const [conversations, setConversations] = useState<
    { id: string; contentTopic: string | undefined; content: string }[]
  >([]);

  // set message
  const [message, setMessage] = useState<string>("Hello xmtp");

  const handleOpen = () => {
    if (!signer) {
      alert("Please connect wallet");
      return;
    }
    // if (chains[1].id !== chain?.id) {
    //   switchNetwork?.(chains[1].id);
    //   alert("switch network in wallet");
    //   return;
    // }
    // if (isLoading && pendingChainId) {
    //   alert("Switching");
    //   return;
    // }
    xmtp();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  ////////////////////////////////
  // xmtp config
  const { data: signer } = useSigner();
  // Create new conversations
  const xmtp = async () => {
    if (!signer) {
      alert("Please connect wallet");
      return;
    }
    // if (client !== undefined) return client;
    setClient(
      await Client.create(signer, {
        env: "dev",
      })
    );
  };

  // Start conversations
  const sendMessage = async () => {
    // if (!client) return;
    const conversation = await client?.conversations.newConversation(
      receiverAddress
    );
    await conversation?.send(message);
    setMessage("");
  };

  // get peer address
  useEffect(() => {
    const getPeers = async () => {
      if (!client) return;
      let chats = [];
      let conversations = await client.conversations.list();

      for (let i = 0; i < conversations.length; i++) {
        let messageStructure = {
          id: i,
          address: conversations[i].peerAddress,
        };
        chats.push(messageStructure);
        setPeers(chats);
      }
    };
    getPeers();
  }, [client]);

  ////////////////////////////////////////
  /// Handle Address
  const selectedPeer: string = "";
  const handleAddressChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setReceiverAddress(event.target.value);
  };

  useEffect(() => {
    const listConversations = async () => {
      setLoadingConversations(true);
      const xm = await Client.create(signer, {
        env: "dev",
      });
      let conversation = await xm.conversations.newConversation(selectedPeer);
      let getMessage = await conversation!.messages();

      for (let i = 0; i < getMessage.length; i++) {
        let messageStructure = {
          id: getMessage[i].id,
          contentTopic: getMessage[i].contentTopic,
          content: getMessage[i].content,
        };
        setConversations([...conversations, messageStructure]);
      }
      if (scrollBottomRef.current) {
        scrollBottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    };
    listConversations();
    setLoadingConversations(false);
  }, [conversations]);

  ////////////////////////////////////
  // scrolLWithUseRef
  const scrolLWithUseRef = () => {
    scrollBottomRef.current?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  };
  // const handleUserChange = (event) => {
  //   setUser(event.target.value);
  // };

  // Handle Message input
  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleEnterKey = (event: KeyboardEvent<HTMLImageElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const listChatMessages = conversations.map((chatMessageDto, index) => (
    <ListItem key={index}>
      {/* <ListItemButton> */}
      <ListItemText
        sx={{
          backgroundColor: "#D9D9D9",
          width: "auto",
          padding: "0.8rem",
          border: "1px solid rgba(255, 162, 167, 0.2)",
          borderRadius: "5px",
          color: "#3E4347",
        }}
        secondary={`${chatMessageDto.id}: ${chatMessageDto.content}`}
      />
      {/* </ListItemButton> */}
    </ListItem>
  ));
  // const { index } = props;
  // const listChatMessages = () => {
  //   <ListItem key={index} component="div" disablePadding>
  //     <ListItemButton>
  //       <ListItemText primary={`Item ${index + 1}`} />
  //     </ListItemButton>
  //   </ListItem>;
  // };

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
              sx={{
                width: "30%",
                p: "1.5rem",
                background: " #e3aec0",
                height: "100%",
                borderRadius: "10px 0 0 10px",
              }}
            >
              <Typography variant="h2">MESSAGING</Typography>

              {/* <Avatar {...stringAvatar(peers[0].address)} /> */}
              {/* <Avatar {...stringAvatar("Jed Watson")} />
              <Avatar {...stringAvatar("Product Manager")} /> */}
            </Container>

            <Container
              sx={{
                width: "70%",
                height: "400px",
                // p: "1.5rem",
                background: " #fff",
                borderRadius: "0 10px 10px 0",
              }}
            >
              <Box p={1}>
                <Grid container spacing={1} alignItems="center">
                  <Grid xs={12} item>
                    <FormControl fullWidth>
                      <TextField
                        color="secondary"
                        sx={{ input: { color: "blue" } }}
                        onChange={handleAddressChange}
                        value={receiverAddress}
                        label="input address here"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>
                  <Grid id="chat-window" xs={12} item>
                    <button
                      onClick={scrolLWithUseRef}
                      style={{ background: "green", color: "white" }}
                    >
                      Scroll using useRef
                    </button>
                    {/* <FixedSizeList
                      height="100%"
                      width="100%"
                      itemSize={46}
                      itemCount={13}
                      overscanCount={5}
                    > */}
                    {/* {renderRow} */}
                    <List id="chat-window-messages">
                      {listChatMessages}
                      <ListItem ref={scrollBottomRef}></ListItem>
                    </List>
                  </Grid>
                  {/* <Grid xs={2} item>
                    <FormControl fullWidth>
                      <TextField
                        // onChange={handleUserChange}
                        // value={user}
                        label="Nickname"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid> */}
                  <Grid xs={11} item>
                    {!loadingConversations ? (
                      <FormControl fullWidth>
                        <TextField
                          color="secondary"
                          sx={{ input: { color: "#000" } }}
                          onChange={handleMessageChange}
                          onKeyDown={handleEnterKey}
                          value={message}
                          label="Type your message..."
                          variant="outlined"
                        />
                      </FormControl>
                    ) : (
                      "Wait for convo to load"
                    )}
                  </Grid>
                  <Grid xs={1} item>
                    <IconButton
                      onClick={sendMessage}
                      aria-label="send"
                      color="secondary"
                    >
                      <Send />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box>
        </Fade>
      </Modal>
    </Fragment>
  );
};
