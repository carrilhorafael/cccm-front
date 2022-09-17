import React from 'react'
import CustomRoutes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import { AuthProvider } from './context/AuthContext';
import { OverlayProvider } from './context/OverlayContext';
import { ChurchProvider } from './context/ChurchContext';


function App() {
  return (
    <ChurchProvider>
      <OverlayProvider>
        <AuthProvider>
          <CustomRoutes/>
        </AuthProvider>
      </OverlayProvider>
    </ChurchProvider>
  );
}

export default App;
