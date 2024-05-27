import { useEffect, useState } from 'react'
import './App.css'
import { Button } from '@mui/material'
import Submission from './components/Submittion';
import Responses from './components/Responses';
import SpecificFact from './components/SpecificFact';


function App() {
  const [randomFact, setRandomFact] = useState<string>("");
  const [todayRandFactDisp, setTodayRandFactDisp] = useState<boolean>(true);
  const [updateRows, setUpdateRows] = useState<boolean>(false); //whenever this is switched it will update the table

  //fetch todays useless fact
  useEffect(() => {
      fetch("https://uselessfacts.jsph.pl/api/v2/facts/today").then((resp) => resp.json()).then(val => {
        setRandomFact(val.text);
      }).catch(() => {
        alert("There was an issue with fetching todays useless fact.");
      });
  }, []);
  
  return (
    <>
    {/* this first displays todays useless fact and then each time the button is clicked it will display a random one. */}
    <p>{todayRandFactDisp ? "Today's Random Fact" : "A Random Fact"}: {randomFact}</p> 
    <Button variant="contained" onClick={() => {
      fetch("https://uselessfacts.jsph.pl/api/v2/facts/random").then((resp) => resp.json()).then((val) => {
        setRandomFact(val.text);
        setTodayRandFactDisp(false);
      }).catch(() => {
        alert("There was an issue with fetching another useless fact.");
      });
    }}>Another One?</Button>

      <Submission setUpdateRows={setUpdateRows} updateRows={updateRows}/>

      <SpecificFact />
      <Responses updateRows={updateRows}/>
    </>
  )
}

export default App
