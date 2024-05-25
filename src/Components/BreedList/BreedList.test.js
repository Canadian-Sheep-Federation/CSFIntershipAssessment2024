import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import BreedList from './BreedList';

// Mocking fetch globally
beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        message: {
          labrador: [],
          poodle: [],
          spaniel: []
        }
      })
    }));
  });
  

describe('BreedList', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches breeds and renders them on mount', async () => {
    const onSelectBreed = jest.fn();
    render(<BreedList onSelectBreed={onSelectBreed} />);
  
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("https://dog.ceo/api/breeds/list/all");
      const breedItems = screen.getAllByRole('listitem');
      expect(breedItems.length).toBeGreaterThan(0); // Expect at least one breed to be rendered
    });
  });

  it('calls onSelectBreed when a breed is clicked', async () => {
    const onSelectBreed = jest.fn();
    render(<BreedList onSelectBreed={onSelectBreed} />);
    
    // Wait for breeds to be displayed
    await waitFor(() => {
      const breedItem = screen.getByText('labrador');
      fireEvent.click(breedItem);
      expect(onSelectBreed).toHaveBeenCalledWith('labrador');
    });
  });
});
