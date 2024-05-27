import { useState, useEffect } from 'react'
import List from "../components/entries";
import "../styles.css";
import axios from 'axios';

import { useParams } from "react-router-dom";

function ID() {
    const [allData, setAllData] = useState([])
    const { id } = useParams();

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/${id}`);
                setAllData(data);
            } catch (err) {
                console.log("HERE");
                console.error(err);
            }
        };
        fetch();
    }, []);

    return (
        <List listItems={[allData]} ></List>
    )
}

export default ID;