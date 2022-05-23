import React from 'react'
import CustomRoutes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CustomRoutes/>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
