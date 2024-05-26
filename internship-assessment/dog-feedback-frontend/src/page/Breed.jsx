import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Breed = () => {

    const { breed } = useParams();
    const [data, setData] = useState();
    const [nickname, setNickname] = useState('');
    const [cuteness, setCuteness] = useState('');
    const [comment, setComment] = useState('');
    const [success, setSuccess] = useState();

    useEffect(() => {
        const getRandomBreedImage = async () => {
            const { data } = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
            setData(data)
        }

        getRandomBreedImage();
    }, [])

    const addFeedback = async (e) => {
        e.preventDefault();

        try {
            // You can use nickname, cuteness, and comment here to send the feedback
            console.log('Nickname:', nickname);
            console.log('Cuteness Rating:', cuteness);
            console.log('Comment:', comment);
            const feedbackData = {
                nickname,
                cuteness,
                comment,
                img: data.message
            };

            const resData = await axios.post(`http://localhost:3000/feedback`, feedbackData);
            setSuccess(`Response saved successfully in id ${resData.data.id}`)

            // Reset the form after submitting
            setNickname('');
            setCuteness('');
            setComment('');
        } catch (error) {
            console.error('Error adding feedback:', error);
        }
    }

    return (
        <div>
            {
                data ?
                    <div className='flex flex-col gap-2 p-2'>
                        <img className='w-full object-contain max-h-96' src={data.message} alt={`${breed} photo`} />

                        <form className='my-4 flex gap-4 flex-col items-start' onSubmit={addFeedback}>
                            <div className='flex gap-2'>
                                <label htmlFor="nickname">Nickname:</label>
                                <input required className='border-2  text-black' type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                            </div>
                            <div className='flex gap-2'>
                                <label htmlFor="cuteness">Cuteness:</label>
                                <input className='border-2  text-black' type="number" id="cuteness" name="cuteness" min="1" max="5" value={cuteness} onChange={(e) => setCuteness(e.target.value)} required />
                            </div>
                            <div className='flex gap-2'>
                                <label htmlFor="comment">Comments:</label>
                                <textarea className='h-8 border-2  text-black' id="comment" name="comment" rows="4" value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
                            </div>

                            <button className='px-2.5 py-1 border-2 rounded-md' type="submit">Submit</button>
                        </form>
                    </div> :

                    <div>
                        <h2 className='text-3xl font-bold'> Loading</h2>
                    </div>
            }
            {success && <p>{success}</p>}
        </div>
    )
}

export default Breed;
