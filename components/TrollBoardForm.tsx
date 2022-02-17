import * as React from "react";
import { useMediaQuery, TextField, Button } from "@mui/material";
// import { useAnalytics } from "use-analytics";
import { useTheme } from "@mui/material/styles";
type TrollBoardFormProps = {
  onSubmit: (name: string, text: string) => void;
};

const BANNED_WORDS = [
  "nigg",
  "paki",
  "faggot",
  "dyke",
  "coon",
  "chink",
  "chinky",
  "nigger",
  "nigga",
];
const TrollBoardForm: React.FC<TrollBoardFormProps> = ({ onSubmit }) => {
  const theme = useTheme();
  // const { track } = useAnalytics();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [text, setText] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const arr = text.split(" ");
    arr.map((each: string) => {
      if (BANNED_WORDS.includes(each)) {
        // track("troll tried to use racist language");
        alert("Come on, man. It's a trollboard not the British Legion.");
        return setText("");
      }
    });
    onSubmit(name, text);
    setText("");
    setName("");
    // track(`troll: ${text}`);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <form
        className="whiteboard__form"
        style={{
          display: "flex",
          width: isMobile ? "100%" : "70%",
          flexDirection: "column",
          marginTop: 16,
          marginBottom: 16,
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Your name"
          id="trollboard__user"
          variant="outlined"
          value={name}
          onChange={handleChangeName}
          sx={{ mb: 2 }}
        />
        <TextField
          id="trollboard__text"
          label="Type trolly comments here...."
          variant="outlined"
          value={text}
          onChange={handleChangeText}
        />
        <Button
          disabled={text === "" || name === ""}
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default TrollBoardForm;
