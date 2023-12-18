import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For custom matchers like `toBeInTheDocument`
import userEvent from '@testing-library/user-event';
import Notifier from '../notifier';
import { useDispatch, useSelector } from 'react-redux';
import { setShowNofificationCopiedModal } from '../../features/setting/settingSlice';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('Notifier component', () => {
  it('renders correctly when showNotificationCopiedModal is true', () => {
    // Mock the useSelector hook to return true
    useSelector.mockReturnValue(true);

    // Mock the useDispatch hook
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    // Render the component
    render(<Notifier />);

    // Verify that the component renders with the correct content
    expect(screen.getByText('Token Copied to Clipboard!')).toBeInTheDocument();

    // Simulate the close button click
    userEvent.click(screen.getByRole('button', { name: /close/i }));

    // Verify that the dispatch function is called with the correct action
    expect(dispatchMock).toHaveBeenCalledWith(setShowNofificationCopiedModal(false));
  });

  it('renders correctly when showNotificationCopiedModal is false', () => {
    // Mock the useSelector hook to return false
    useSelector.mockReturnValue(false);

    // Render the component
    render(<Notifier />);

    // Verify that the component renders without the Toast
    expect(screen.queryByText('Token Copied to Clipboard!')).toBeNull();
  });
});
