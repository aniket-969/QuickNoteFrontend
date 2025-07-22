import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { paths } from '../config/paths';
import { Spinner } from '../components/ui/spinner';

export function ProtectedRoute() {
  const location = useLocation();
let raw = localStorage.getItem("session");
  let session = raw ? JSON.parse(raw) : null;

  if (!session) {
    console.log("data not found so redirecting")
    const loginPath = paths.auth.login.getHref(location.pathname);
    return <Navigate to={loginPath} replace />;
  }

  return <Outlet />;
}
