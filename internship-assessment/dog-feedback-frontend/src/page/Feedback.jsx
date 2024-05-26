import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Feedback = () => {

    const [data, setData] = useState();

    useEffect(() => {
        // getting all the feedback from sqlite database
        const getAllFeedBack = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/feedback/`);
                setData(data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getAllFeedBack();
    }, [])


    return (
        <main className='py-5 px-2'>
            {/* checking the length of the data if 0 then there is no feedback so throw the no feedback found */}
            {data?.length > 0 ? <div className='flex flex-col gap-4'>{
                data.map(el => (
                    <div className='flex gap-4 flex-col  items-center' key={el.id}>
                        {/* Displaying the iamge and the link to the individual page */}
                        <img className='w-full  object-contain' src={`${el.img}`} alt={`${el.nickname} doggo`} />
                        <button className='p-2 border-2 w-fit' ><Link to={`${el.id}`}> Learn More</Link></button>
                    </div>
                ))
            }</div> :

                <h2>No Feedback found, Please create feedback before viewing</h2>
            }
        </main>
    )
}

export default Feedback