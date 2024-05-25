import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BreedImage from './BreedImage';

describe('BreedImage', () => {
  it('renders correctly', async () => {
    const mockLoadHandler = jest.fn();
    render(<BreedImage breed="labrador" onImageLoad={mockLoadHandler} />);

    const image = await waitFor(() => screen.getByRole('img'));
    expect(image).toHaveAttribute('src');
    expect(image).toHaveAttribute('alt', 'Random labrador');
    expect(mockLoadHandler).toHaveBeenCalledWith(image.src);
  });

  it('displays message when no breed is selected', () => {
    render(<BreedImage breed="" onImageLoad={jest.fn()} />);
    expect(screen.getByText('Select a breed to see the image')).toBeInTheDocument();
  });
});
