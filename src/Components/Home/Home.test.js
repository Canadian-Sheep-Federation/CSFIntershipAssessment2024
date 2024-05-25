import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home'; // Adjust the import path according to your project structure

describe('Home', () => {
  it('renders the component with all elements', () => {
    render(<Home />);

    // Check if the logo image is rendered
    const logo = screen.getByRole('img', { name: /logopicture/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', expect.stringContaining('Dogs.png'));

    // Check if the header text is rendered
    const headerText = screen.getByText(/select a dog breed from the list to view a random image of the dog./i);
    expect(headerText).toBeInTheDocument();

    // Optional: Check for specific styles if needed
    const container = screen.getByText(/select a dog breed from the list to view a random image of the dog./i).closest('div');
    expect(container).toHaveClass('bg-gradient-to-br', 'from-purple-600', 'to-blue-500');
  });
});
