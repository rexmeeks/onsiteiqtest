import { render, screen } from '@testing-library/react';
import App from './App';
import {BrowserRouter} from "react-router-dom";

// const mockedUsedRoutes = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useRoutes: () => mockedUsedRoutes,
// }));
//
// test('renders main page', () => {
//   render(<App />, {wrapper: BrowserRouter});
//   const linkElement = screen.getByText('HR Application Portal');
//   expect(linkElement).toBeInTheDocument();
// });
