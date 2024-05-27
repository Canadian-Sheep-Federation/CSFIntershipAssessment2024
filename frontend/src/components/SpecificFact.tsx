import { TextField } from '@mui/material'
import { useState, useEffect } from 'react';

function SpecificFact() {
  const [specificFact, setSpecificFact] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if(id.length === 24) {
      
      fetch("http://localhost:4000/" + id).then((resp) => resp.json()).then((json) => {
        if(json.uselessFact) {
          setSpecificFact(json.uselessFact);
          setError(false);
        } else {
          setError(true);
          alert("There was an issue when fetching your specific useless fact by id.");
        }
      });

    } else if(id.length === 0) {
      setSpecificFact("");
      setError(false);
    } else {
      setError(true);
      setSpecificFact("");
    }
  }, [id]);


  return <>
    <br/><br/>
    <br/><br/>
    <TextField error={error} style = {{width: "28ch"}} id="standard-basic" label="Query by ID" variant="standard" onChange={(event) => {
        setId(event.target.value);
    }}/>
    <p>Queried Useless Fact: {specificFact}</p>
  </>
  
}

export default SpecificFact