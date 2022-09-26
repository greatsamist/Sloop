export const inputLabelProps = {
  //   PointerEvents: "none",
  style: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "100%",
    color: "#5E5E5E",
  },
};

export const styledTextField = {
  mt: "2rem",
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
};

export const styledLoadingButton = {
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
};

export const chatStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  height: "500px",
  bgcolor: "#e3aec0",
  borderRadius: "10px",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
};
