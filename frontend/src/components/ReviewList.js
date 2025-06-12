import React from 'react';

const ReviewList = ({ reviews }) => (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
        {reviews.map(r => (
            <li
                key={r.id}
                style={{
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    background: '#f9f9f9',
                    borderRadius: '6px',
                    wordBreak: 'break-word',
                }}
            >
                <div>
                    <strong>{r.name}</strong>
                </div>
                <div style={{ margin: '4px 0'}}>
                    <em>{r.anime}</em>
                </div>
    
                <div style={{ margin: '4px 0' }}>
                    <strong>Comments: </strong>
                    <span style={{ whiteSpace: 'pre-wrap' }}>
                        {r.comment}
                    </span>
                </div>
    
                <div>
                    Recommended: <strong>{r.recommended}</strong> | Rating:{' '}
                    <strong>{r.rating}/10</strong>
                </div>
            </li>
        ))}
    </ul>
);

export default ReviewList;
