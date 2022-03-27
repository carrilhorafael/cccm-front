import React from 'react'
import { AuthProvider } from './context/AuthContext';
import CustomRoutes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import { ChurchesProvider } from './context/ChurchesContext';

function App() {
  return (
    <ChurchesProvider>
      <AuthProvider>
        <CustomRoutes/>
      </AuthProvider>
    </ChurchesProvider>
  );
}

export default App;
