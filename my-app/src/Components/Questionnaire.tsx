import { Box, Button, TextField, Typography } from "@mui/material";
import CSS from "csstype";
import { useEffect, useState } from "react";
import { getQuestions } from "../api/openTriviaHandler";
import { postAnswer } from "../api/prevRecordsHandler";

const MAX_QUESTIONS = 5;

const styles: CSS.Properties = {
  margin: "100px 100px",
  justifyContent: "center",
};

interface QuestionnaireProps {
  setInQuestionState: Function;
  name: string;
}

export default function Questionnaire({
  setInQuestionState,
  name,
}: QuestionnaireProps) {
  const [questionsState, setQuestionsState] = useState<any>(null);
  const [qNumberState, setQNumberState] = useState<number>(1);
  const [textAnswerState, setTextAnswerState] = useState("");

  const [submitButtonColor, setSubmitButtonColor] = useState<
    "primary" | "success" | "error"
  >("primary");
  const [submitButtonText, setSubmitButtonText] = useState("Submit");

  /**
   * Attempts to iterate to the next question retrieved,
   * if not available then calls a method to fetch another
   * set of trivia questions.
   */
  const getNextQuestion = () => {
    if (qNumberState + 1 <= MAX_QUESTIONS) {
      setQNumberState(qNumberState + 1);
      setTextAnswerState("");
    } else getNewQuestionSet();
  };

  /**
   * Resets input states and fetches a new set of trivia questions.
   */
  const getNewQuestionSet = () => {
    setQuestionsState(null);
    setTextAnswerState("");
    getQuestions(MAX_QUESTIONS).then((qs) => {
      if (qs) setQuestionsState(qs);
      setQNumberState(1);
    });
  };

  /**
   * On submit attempts to post the answer to our API to store.
   * If on fail will display "Failed!" on the submit button.
   */
  const handleSubmitClick = () => {
    postAnswer({
      name,
      answer: textAnswerState,
      ...questionsState[qNumberState - 1],
    })
      .then(() => {
        setSubmitButtonColor("success");
        setSubmitButtonText("Submitted!");
        setTimeout(() => {
          setSubmitButtonColor("primary");
          setSubmitButtonText("Submit");
        }, 1500);
        getNextQuestion();
      })
      .catch((err) => {
        console.error(err);
        setSubmitButtonColor("error");
        setSubmitButtonText("Failed!");
        setTimeout(() => {
          setSubmitButtonColor("primary");
          setSubmitButtonText("Submit");
        }, 1500);
      });
  };

  /**
   * Perform first load setup by fetching the first question set to load
   */
  useEffect(() => {
    getNewQuestionSet();
  }, []);

  return (
    <div style={styles}>
      {questionsState && questionsState.length ? (
        <Typography variant="h2">
          {questionsState[qNumberState - 1].question}
        </Typography>
      ) : (
        <Typography variant="h2">Thinking of a question...</Typography>
      )}
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
          id="filled-basic"
          label="Your Answer Here"
          variant="filled"
          value={textAnswerState}
          onChange={(e) => setTextAnswerState(e.target.value)}
        />
      </Box>
      <Button
        variant="outlined"
        size="large"
        sx={{ margin: "10px" }}
        onClick={() => setInQuestionState(false)}
      >
        Go Back
      </Button>
      <Button
        variant="outlined"
        size="large"
        sx={{ margin: "10px" }}
        onClick={() => getNextQuestion()}
      >
        Skip
      </Button>
      <Button
        variant="outlined"
        size="large"
        sx={{ margin: "10px" }}
        onClick={handleSubmitClick}
        color={submitButtonColor}
      >
        {submitButtonText}
      </Button>
    </div>
  );
}
