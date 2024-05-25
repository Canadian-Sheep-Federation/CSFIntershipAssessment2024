import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SaveBtn from './SaveBtn'; // Adjust the import path according to your project structure

describe('SaveBtn', () => {
  // Mock localStorage
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  

  it('appends new data to an existing list in localStorage', () => {
    const existingData = JSON.stringify([{ breed: 'Labrador', imageUrl: 'http://example.com/labrador.jpg' }]);
    Storage.prototype.getItem.mockReturnValue(existingData);

    const newBreed = 'Poodle';
    const newImageUrl = 'http://example.com/poodle.jpg';

    render(<SaveBtn breed={newBreed} imageUrl={newImageUrl} />);

    const saveButton = screen.getByRole('button', { name: /save to memories/i });
    fireEvent.click(saveButton);

    // Verify that localStorage.setItem was called to update the existing list
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'breeds',
      JSON.stringify([
        { breed: 'Labrador', imageUrl: 'http://example.com/labrador.jpg' },
        { breed: 'Poodle', imageUrl: 'http://example.com/poodle.jpg' }
      ])
    );
  });
});
