import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import Header from './Header'; // Adjust the import path according to your project structure

describe('Header', () => {
  it('renders sidebar toggle button and responds to mouse enter', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    // Trigger sidebar to open
    const toggleButton = screen.getByRole('button');
    fireEvent.mouseEnter(toggleButton);

    // Use getAllByText to ensure all instances of "Home" are checked
    const homeLinks = screen.getAllByText('Home');
    homeLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '/');
    });

    const memoriesLinks = screen.getAllByText('Memories');
    memoriesLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '/memories');
    });
  });

  it('closes the sidebar when mouse leaves the sidebar area', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

     });
});
