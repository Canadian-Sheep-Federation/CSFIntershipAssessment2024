import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Detail = () => {

    const [data, setData] = useState();
    const { id } = useParams();

    useEffect(() => {
        const getAllFeedBack = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/feedback/${id}`);
                setData(data)
            }
            catch (err) {
                console.log(err)
            }
        }

        getAllFeedBack();
    }, [])

    return (
        <main className='flex items-center justify-center py-4 px-2'>
            {data && <div className='flex flex-col gap-2' key={data.id}>
                <img className='max-h-96' src={`${data.img}`} alt={`${data.nickname} doggo`} />
                <div className='flex flex-col gap-4'>
                    <h2>Name: {data.nickname}</h2>
                    <p>Cuteness: {data.cuteness}</p>
                    <p>Comments: {data.comment}</p>
                </div>
            </div>
            }
        </main>
    )
}

export default Detail