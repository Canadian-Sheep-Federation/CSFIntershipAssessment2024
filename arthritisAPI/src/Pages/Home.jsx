import { useState, useEffect } from 'react'
import List from "../components/entries";
import "../styles.css";
import axios from 'axios';

function Home() {
    const [formData, setFormData] = useState({
        Location: "",
        Symptoms: "",
        Severity: "",
    });
    const [allData, setAllData] = useState([])
    const [error, setError] = useState(false)

    const apiCall = async () => {
        const response = await axios.get(
            `http://localhost:8080/`
        );
        setAllData(response.data);
    }

    useEffect(() => {
        apiCall();
    }, []);

    const handleChange = (event) => {

        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));

        if (name === "Location") {
            setError(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                console.log('Success');

                // clear form after data submission successful
                setFormData({ Location: "", Symptoms: "", Severity: "" });

                // get all data submitted to display
                apiCall();
            } else {
                console.error('HTTP error');
                setError(true);
            }
        } catch(error) {
            console.error('Promise rejected');
        }
    };

    return (
        <>
            <div className="form">
                <form onSubmit={handleSubmit} action="/data" method="POST">

                    <label>
                        Geographical Location:
                        <input required type="text" name="Location" value={formData.Location} onChange={handleChange} />
                        { error && (<div className='error'> * Location not found </div>)}
                    </label>

                    <label>
                        Symptom(s):
                        <input required type="text" maxLength="15" name="Symptoms" value={formData.Symptoms} onChange={handleChange} />
                    </label>

                    <label>
                        Severity:
                        <select required name="Severity" value={formData.Severity} onChange={handleChange}>
                        <option value="" disabled>Please select</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    </label>

                    <input className="button" type="submit" value="Submit" />
                    
                </form>
            </div>
            <List listItems={[allData]}></List>
        </>
    )
}

export default Home;