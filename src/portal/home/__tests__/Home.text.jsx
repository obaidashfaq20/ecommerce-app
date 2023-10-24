import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For custom matchers like `toBeInTheDocument`
import Home from '../Home';

test('renders welcome message', () => {
  const { getByText } = render(<Home />);
  const welcomeMessage = getByText('Welcome Home.');
  expect(welcomeMessage).toBeInTheDocument();
});

test('renders with the correct class name', () => {
  const { container } = render(<Home />);
  const containerElement = container.querySelector('.py-3');
  expect(containerElement).toBeInTheDocument();
  expect(containerElement).toHaveTextContent('Welcome Home.');
});
