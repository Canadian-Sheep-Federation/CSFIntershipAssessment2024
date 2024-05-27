import { useState } from 'react'

import { Button, TextField, Slider } from '@mui/material'

function Submission({ setUpdateRows, updateRows} : {updateRows: boolean, setUpdateRows : React.Dispatch<React.SetStateAction<boolean>>}) {
  const [name, setName] = useState<string>("");
  const [uselessFact, setUselessFact] = useState<string>("");
  const [rating, setRating] = useState<number>(0.5);

  function submitFact() {
    //this is so I can use async await, this function is immediatly executed
    (async () => {
      let result = await fetch("http://localhost:4000/", {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          name: name,
          uselessFact: uselessFact,
          rating: rating
        })
      });

      if(result.status !== 200) {
        alert(`status code ${result.status}: ${(await getBody(result)).error}`)
      }
      setUpdateRows(!updateRows);
    })();
  }
  async function getBody(result: Response) {
    let contentType = result.headers.get("content-type");
    if(contentType && contentType.indexOf('application/json') !== -1) return await result.json();
    
    return undefined;
  }
  
  return (
    <>
    <br/><br/><br/><br/>
    <p>You think you have a better useless fact, add it here so others can see it.</p>

    <p>your name: </p>
    <TextField
      id="outlined-uncontrolled"
      label="name"
      onChange={(event) => {
        setName(event.target.value);
      }}
      />

    <p>useless fact:</p>
    <TextField
      id="outlined-textarea"
      label="useless fact"
      placeholder="Over 1000 birds a year die from smashing into windows!"
      multiline
      style={{width: "100%"}}
      onChange={(event) => {
        setUselessFact(event.target.value);
      }}
      />

    <p>rating: </p>
    <Slider defaultValue={rating * 100} aria-label="Default" valueLabelDisplay="auto" onChange={(_event, value) => {
      if(typeof value === 'number') {
        setRating(value / 100);
      }
    }}/>
    
    <br/>
    <Button variant="contained" onClick={submitFact}>Submit</Button>
    </>
  )
}

export default Submission