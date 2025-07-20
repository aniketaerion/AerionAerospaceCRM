// src/lib/utils/navigation.js
// This file assumes you are using React Router DOM v6 or newer.

import { createBrowserHistory } from 'history'; // From 'history' package, often part of react-router-dom dependencies

const history = createBrowserHistory();

/**
 * Navigates to a specified path in the application.
 * This is a workaround to allow navigation from outside React components.
 * For navigation directly within components, use the `useNavigate` hook from `react-router-dom`.
 * @param {string} path - The path to navigate to.
 */
export const navigateTo = (path) => {
  history.push(path);
};

// If you prefer to use useNavigate directly within components:
// You'd remove the above and use it like this in components:
// import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate();
// navigate('/some/path');