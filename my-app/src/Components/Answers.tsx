import CSS from "csstype";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getAllRecords } from "../api/prevRecordsHandler";
import { useEffect, useState } from "react";
import { Record } from "../types";

const styles: CSS.Properties = {
  height: "500px",
  width: "90%",
};

interface AnswersProps {
  setInAnswerState: Function;
}

export default function Answers({ setInAnswerState }: AnswersProps) {
  const [masterRowsState, setMasterRowsState] = useState<Record[]>([]);
  const [rowsState, setRowsState] = useState<Record[]>([]);
  const [nameFilterState, setNameFilterState] = useState("");
  const [categoryFilterState, setCategoryFilterState] = useState("");
  const [difficultyFilterState, setDifficultyFilterState] = useState("");

  /**
   * Handles the filtering of results from our records API.
   * Since data is small we can filter client-side. But once our database
   * gets full, we transition to use specific query requests from our API
   */
  const handleFilterResultsClick = () => {
    let rows = masterRowsState;
    if (nameFilterState && nameFilterState.length > 0) {
      rows = rows.filter((r) => r.name.includes(nameFilterState));
    }
    if (categoryFilterState && categoryFilterState.length > 0) {
      rows = rows.filter((r) => r.category === categoryFilterState);
    }
    if (difficultyFilterState && difficultyFilterState.length > 0) {
      rows = rows.filter((r) => r.difficulty === difficultyFilterState);
    }
    setRowsState(rows);
  };

  /**
   * Define the column headers to display in the DataGrid
   */
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "name", headerName: "Name", width: 70 },
    { field: "difficulty", headerName: "Difficulty", width: 80 },
    { field: "category", headerName: "Category", width: 160 },
    {
      field: "question",
      headerName: "Question",
      width: 690,
    },
    {
      field: "answer",
      headerName: "Answer Given",
      width: 300,
    },
  ];

  /**
   * Perform first load setup by fetching all the Records from our API
   */
  useEffect(() => {
    getAllRecords().then((r) => {
      console.log(JSON.stringify(r));
      setMasterRowsState(r);
      setRowsState(r);
    });
  }, []);

  return (
    <div style={styles}>
      <div style={{ display: "inline-flex" }}>
        <TextField
          id="filled-basic"
          label="Query by name"
          value={nameFilterState}
          onChange={(e) => setNameFilterState(e.target.value)}
          variant="filled"
          sx={{ margin: "10px" }}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
          <Select
            labelId="difficulty-select-label"
            id="difficulty-select"
            value={difficultyFilterState}
            onChange={(e) => setDifficultyFilterState(e.target.value)}
            label="Difficulty"
            sx={{ width: "120px", margin: "10px" }}
          >
            <MenuItem value={""}>None</MenuItem>
            <MenuItem value={"easy"}>Easy</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"hard"}>Hard</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={categoryFilterState}
            onChange={(e) => setCategoryFilterState(e.target.value)}
            label="Category"
            sx={{ width: "220px", margin: "10px" }}
          >
            <MenuItem value={""}>None</MenuItem>
            <MenuItem value={"General Knowledge"}>General Knowledge</MenuItem>
            <MenuItem value={"Entertainment: Books"}>
              Entertainment: Books
            </MenuItem>
            <MenuItem value={"Entertainment: Film"}>
              Entertainment: Film
            </MenuItem>
            <MenuItem value={"Entertainment: Music"}>
              Entertainment: Music
            </MenuItem>
            <MenuItem value={"Entertainment: Musicals & Theatres"}>
              Entertainment: Musicals & Theatres
            </MenuItem>
            <MenuItem value={"Entertainment: Television"}>
              Entertainment: Television
            </MenuItem>
            <MenuItem value={"Entertainment: Video Games"}>
              Entertainment: Video Games
            </MenuItem>
            <MenuItem value={"Entertainment: Board Games"}>
              Entertainment: Board Games
            </MenuItem>
            <MenuItem value={"Entertainment: Comics"}>
              Entertainment: Comics
            </MenuItem>
            <MenuItem value={"Entertainment: Cartoons & Animations"}>
              Entertainment: Cartoons & Animations
            </MenuItem>
            <MenuItem value={"Entertainment: Japanese Anime & Manga"}>
              Entertainment: Japanese Anime & Manga
            </MenuItem>
            <MenuItem value={"Science and Nature"}>Science and Nature</MenuItem>
            <MenuItem value={"Science: Computers"}>Science: Computers</MenuItem>
            <MenuItem value={"Science: Mathematics"}>
              Science: Mathematics
            </MenuItem>
            <MenuItem value={"Science: Gadgets"}>Science: Gadgets</MenuItem>
            <MenuItem value={"Mythology"}>Mythology</MenuItem>
            <MenuItem value={"Sports"}>Sports</MenuItem>
            <MenuItem value={"Geography"}>Geography</MenuItem>
            <MenuItem value={"History"}>History</MenuItem>
            <MenuItem value={"Politics"}>Politics</MenuItem>
            <MenuItem value={"Art"}>Art</MenuItem>
            <MenuItem value={"Celebrities"}>Celebrities</MenuItem>
            <MenuItem value={"Animals"}>Animals</MenuItem>
            <MenuItem value={"Vehicles"}>Vehicles</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          size="large"
          sx={{ margin: "10px" }}
          onClick={handleFilterResultsClick}
        >
          Filter results
        </Button>
      </div>
      <DataGrid rows={rowsState} columns={columns} autoPageSize />
      <Button
        variant="outlined"
        size="large"
        sx={{ margin: "10px" }}
        onClick={() => setInAnswerState(false)}
      >
        Go Back
      </Button>
    </div>
  );
}
