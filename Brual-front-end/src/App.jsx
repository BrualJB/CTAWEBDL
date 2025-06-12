import './App.css';
import Layout from './components/Layout';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticlePage from './pages/LandingPages/ArticlePage';
import HomePage from './pages/LandingPages/HomePage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/LandingPages/NotFoundPage';
import LoginPage from './pages/LandingPages/Loginpage';
import RegisterPage from './pages/LandingPages/RegisterPage';
import AuthLayout from './components/AuthLayout'; 
import DashLayout from './components/DashLayout';
import DashboardPage from './pages/DashboardPages/DashboardPage';
import UsersPage from './pages/DashboardPages/UsersPage';
import ReportsPage from './pages/DashboardPages/ReportsPage';
import DashArticleListPage from './pages/DashboardPages/DashArticlePage';
import React from 'react';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'articles', element: <ArticleListPage /> },
      { path: 'articles/:name', element: <ArticlePage /> },
    ],
  },
  {
    path: '/login',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [{ path: '', element: <LoginPage /> }],
  },
  {
    path: '/register',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [{ path: '', element: <RegisterPage /> }],
  },
  {
    path: '/dashboard',
    element: <DashLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <DashboardPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'articles', element: <DashArticleListPage /> }, // <-- consistent path here
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
