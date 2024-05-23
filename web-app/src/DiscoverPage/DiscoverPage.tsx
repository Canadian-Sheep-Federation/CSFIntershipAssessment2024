import Container from 'react-bootstrap/Container';
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { debounce } from 'lodash';
import Masonry from "react-responsive-masonry"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DiscoverPage(): JSX.Element {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState<[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<any>(null);


    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);

    // Search for tv shows using the TV Maze api
    const debounceSearch = debounce((searchString: string) => {
        if (searchString.trim() !== '') {
            fetch(`http://api.tvmaze.com/search/shows?q=${searchString}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to search from API');
                    }
                    return response.json();
                })
                .then(data => {
                    setSearchResults(data);
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                });
        } else {
            setSearchResults([]);
        }
    }, 500);

    // Handle text change for the search bar
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchString = event.target.value;
        setSearchText(searchString);
        debounceSearch.cancel();
        debounceSearch(searchString);
    };


    // handle querying the api for show rating data
    const handleViewRating = (id: string) => {
        fetch(`http://localhost:5000/${id}`)
            .then(response => {
                if (!response.ok) {
                    setModalContent({name: "No Rating Found"});
                    handleModalShow();
                    throw new Error('Failed to fetch show rating');
                }
                return response.json();
            })
            .then(data => {
                // Update modal content with the data from api and open the modal
                setModalContent(data);
                handleModalShow();
            })
            .catch(error => {
                console.error('Error fetching show rating:', error);
            });
    };

    return (
        <Container>
            <h2>Search for Shows</h2>
            <Form.Control
                type="text"
                id="searchTest"
                placeholder="Search ..."
                value={searchText}
                onChange={handleSearchChange}
            />

            <Masonry columnsCount={3} gutter="10px" style={{ "marginTop": "40px" }}>
                {searchResults.map((tvShow: any, i) => (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card key={i} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={tvShow.show?.image?.medium} />
                            <Card.Body>
                                <Card.Title>{tvShow.show.name}</Card.Title>
                                <Button variant="primary" onClick={() => handleViewRating(tvShow.show.id)}>
                                    View Rating
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </Masonry>


            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    {modalContent && (<Modal.Title>{modalContent.name}</Modal.Title>) }
                </Modal.Header>
                <Modal.Body>
                    {modalContent && modalContent.rating && (
                        <div>
                            <p>Rating: {modalContent.rating}</p>
                            <p>Comment: {modalContent.comment}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={handleModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>

    );
};

export default DiscoverPage;