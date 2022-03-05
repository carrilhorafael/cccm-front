import React from 'react'
import { AuthProvider } from './context/AuthContext';
import CustomRoutes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import { ChurchProvider } from './context/ChurchContext';

function App() {
  return (
    <AuthProvider>
      <ChurchProvider>
        <CustomRoutes/>
      </ChurchProvider>
    </AuthProvider>
  );
}

export default App;
