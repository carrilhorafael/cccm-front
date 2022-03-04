import React from 'react'
import { AuthProvider } from './context/AuthContext';
import CustomRoutes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

function App() {
  return (
    <AuthProvider>
      <CustomRoutes/>
    </AuthProvider>
  );
}

export default App;
