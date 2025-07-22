
import React from "react";
import { Outlet, useRouteError } from "react-router-dom";
import Navbar from "./navbar";

export function ErrorBoundary() {
  const error = useRouteError();
  console.error("Dashboard Error:", error);
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">
        Something went wrong in the dashboard.
      </h2>
      <pre className="whitespace-pre-wrap text-sm text-red-600">
        {error.message ?? JSON.stringify(error)}
      </pre>
    </div>
  );
}

export function AppLayout() {
    
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <Navbar />   
        <main className="p-4 flex-1 overflow-auto">
          <Outlet />  
        </main>
      </div>
    </div>
  );
}
