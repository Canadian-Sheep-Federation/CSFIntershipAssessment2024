import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useState, useRef } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export interface ShowOption {
    id: number;
    label: string;
    imageUrl: string;
}

function RatingPage(): JSX.Element {
    const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<ShowOption[]>([]);
    const [selectedShowOption, setSelectedShowOption] = useState<ShowOption | null>(null);
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');

    const typeaheadRef = useRef<any>(null);

    // handle searching from the tv maze api for tv shows
    const handleSearch = async (query: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setOptions(data.map((item: any) => ({
                id: item.show.id,
                label: item.show.name,
                imageUrl: item.show.image.medium
            })));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setIsLoading(false);
    };

    // handle rating slider change
    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        setRating(value);
    };

    // handle tv show selection from search
    const handleShowSelection = (selected: any) => {
        if (selected.length > 0) {
            setSelectedShowOption(selected[0]);
        }
    };

    // handle comment section text changes
    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    // handle form submit to api
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": selectedShowOption?.id,
                    "rating": rating,
                    "comment": comment,
                    "name": selectedShowOption?.label,
                    "imageUrl": selectedShowOption?.imageUrl
                })
            });

            if (!response.ok) {
                setAlert({ show: true, message: 'Submission failed', variant: 'danger' });
                throw new Error('Failed to submit form data');
            }

            console.log('Form data submitted successfully');
            setAlert({ show: true, message: 'Submission successful', variant: 'success' });


            // Reset state variables and the inputs
            setRating(0);
            setSelectedShowOption(null);
            setComment('');
            typeaheadRef.current.clear();

        } catch (error) {
            console.error('Error submitting form data:', error);
        } finally {
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 5000);
        }
    };

    return (
        <Container>
            <h2>Rate a TV Show</h2>

            <Alert show={alert.show} variant={alert.variant}>
                {alert.message}
            </Alert>

            <div style={{ "textAlign": "left" }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Search TV Show</Form.Label>
                        <AsyncTypeahead
                            id="search-tv-show"
                            isLoading={isLoading}
                            labelKey="label"
                            onSearch={handleSearch}
                            options={options}
                            placeholder="Type to search..."
                            inputProps={{ required: true }}
                            onChange={handleShowSelection}
                            ref={typeaheadRef}
                            renderMenuItemChildren={(option: any) => {
                                return (
                                    <div>
                                        <img
                                            src={option.imageUrl}
                                            alt={""}
                                            style={{
                                                height: '120px',
                                                marginRight: '10px',
                                                width: '80px',
                                            }}
                                        />
                                        <strong>{option.label}</strong>
                                    </div>
                                );
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Rating</Form.Label>
                        <Form.Range value={rating} min={0} max={10} step={0.1} onChange={handleRatingChange} required />
                        <Form.Text className="text-muted">
                            Current Rating: {rating.toFixed(1)}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Comment (Optional)</Form.Label>
                        <Form.Control as="textarea" rows={3} value={comment} onChange={handleCommentChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default RatingPage;