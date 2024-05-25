import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer'; // Adjust the import path according to your project structure

describe('Footer', () => {
  it('renders correctly', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo'); // Using ARIA role for more accessible queries
    expect(footerElement).toBeInTheDocument();
  });

  it('contains the correct text', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/© 2024 Dog Breeds Explorer. All rights reserved./i);
    expect(copyrightText).toBeInTheDocument();
  });

  it('has the correct background color', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toHaveClass('bg-blue-800');
  });

  it('has the correct text color and alignment', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toHaveClass('text-white');
    expect(footerElement).toHaveClass('text-center');
  });
});
