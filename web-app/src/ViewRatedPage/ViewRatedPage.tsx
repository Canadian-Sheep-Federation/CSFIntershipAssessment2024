import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Masonry from "react-responsive-masonry"
import Card from 'react-bootstrap/Card';

function ViewRatedPage(): JSX.Element {
    const [ratedTVShows, setRatedTVShows] = useState<[]>([]);

    // Show all the rated tv shows that we get from the api.
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const jsonData = await response.json();
                setRatedTVShows(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    return (
        <Container >
            <h2>All Rated Shows</h2>

            <Masonry columnsCount={3} gutter="10px" style={{"marginTop": "30px"}}>
                {ratedTVShows.map((tvShow: any, i) => (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card key={i} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={tvShow.imageUrl} />
                            <Card.Body>
                                <Card.Title>{tvShow.name}</Card.Title>
                                <Card.Text>
                                    Rating: {tvShow.rating}<br />
                                    Comment: {tvShow.comment}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </Masonry>
        </Container>
    );
};

export default ViewRatedPage;