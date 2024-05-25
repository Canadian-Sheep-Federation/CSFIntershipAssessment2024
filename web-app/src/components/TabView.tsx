import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import Form from "./Form";
import Reviews from "./Reviews";

const TabPanel: React.FC<{ value: number, index: number }> = ({ value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <div>
          {index === 0 && <Reviews />}
          {index === 1 && <Form />}
        </div>
      )}
    </div>
  );
}

const TabView: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="View Reviews" />
        <Tab label="Make a Review" />
      </Tabs>
      <TabPanel value={value} index={0} />
      <TabPanel value={value} index={1} />
    </div>
  );
}

export default TabView;
