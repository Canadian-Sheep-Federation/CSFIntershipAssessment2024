import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Saved from './Saved'; // Adjust the import path according to your project structure

describe('Saved', () => {
  beforeEach(() => {
    // Mock localStorage
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('loads breeds from localStorage on initial render', () => {
    const breeds = JSON.stringify([
      { breed: 'Labrador', imageUrl: 'http://example.com/labrador.jpg' },
      { breed: 'Beagle', imageUrl: 'http://example.com/beagle.jpg' }
    ]);
    Storage.prototype.getItem.mockReturnValue(breeds);

    render(<Saved />);

    expect(screen.getByText('Labrador')).toBeInTheDocument();
    expect(screen.getByText('Beagle')).toBeInTheDocument();
  });

  it('deletes a breed from the list when delete button is clicked', () => {
    const breeds = JSON.stringify([
      { breed: 'Labrador', imageUrl: 'http://example.com/labrador.jpg' },
      { breed: 'Beagle', imageUrl: 'http://example.com/beagle.jpg' }
    ]);
    Storage.prototype.getItem.mockReturnValue(breeds);

    render(<Saved />);

    // Corrected function name here
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    expect(deleteButtons.length).toBe(2); // Ensure there are 2 delete buttons initially

    // Click the delete button for the first item
    fireEvent.click(deleteButtons[0]);

    // Confirm the first item is removed
    expect(screen.queryByText('Labrador')).not.toBeInTheDocument();
    expect(screen.getByText('Beagle')).toBeInTheDocument();

    // Confirm localStorage is updated
    expect(localStorage.setItem).toHaveBeenCalledWith('breeds', JSON.stringify([
      { breed: 'Beagle', imageUrl: 'http://example.com/beagle.jpg' }
    ]));
});

});
