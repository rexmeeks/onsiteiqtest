import { render, screen } from '@testing-library/react';
import App from './App';
import {BrowserRouter} from "react-router-dom";


test('renders main page', () => {
  render(<App />, {wrapper: BrowserRouter});
  const linkElement = screen.getByText('HR Application Portal');
  expect(linkElement).toBeInTheDocument();
});
