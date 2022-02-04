import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { StyleSheetTestUtils } from 'aphrodite';

test('renders learn react link', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
