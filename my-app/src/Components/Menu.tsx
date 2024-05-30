import { Box, Button, TextField, Typography } from "@mui/material";
import CSS from "csstype";
import { useState } from "react";
import Questionnaire from "./Questionnaire";
import Answers from "./Answers";

const styles: CSS.Properties = {
  display: "inline-flex",
  width: "100%",
  justifyContent: "center",
};

export default function Menu() {
  const [inQuestionState, setInQuestionState] = useState(false);
  const [inAnswerState, setInAnswerState] = useState(false);
  const [nameState, setNameState] = useState("");

  return inQuestionState || inAnswerState ? (
    inQuestionState ? (
      <Questionnaire setInQuestionState={setInQuestionState} name={nameState} />
    ) : (
      <Answers setInAnswerState={setInAnswerState} />
    )
  ) : (
    <>
      <Typography variant="h2">Welcome to Trivia Questionnaire!</Typography>

      <div className="spacer" style={{ height: "40px" }} />

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch", padding: "auto 0px" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="name-text-box"
          label="Enter Your Name Here"
          variant="filled"
          value={nameState}
          onChange={(e) => setNameState(e.target.value)}
        />
      </Box>

      <div style={styles}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => setInQuestionState(true)}
          sx={{ margin: "10px" }}
        >
          Get a question
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => setInAnswerState(true)}
          sx={{ margin: "10px" }}
        >
          See previous answers
        </Button>
      </div>
    </>
  );
}
