import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {task1, task2} from "./index";

test('renders learn react link', () => {
  const { getByText } = render(<App task1={task1}  task2={task2} />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
