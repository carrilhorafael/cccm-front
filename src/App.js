import React from 'react'
import CustomRoutes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import { AuthProvider } from './context/AuthContext';
import { OverlayProvider } from './context/OverlayContext';
import { ChurchProvider } from './context/ChurchContext';


function App() {
  return (
    <OverlayProvider>
      <ChurchProvider>
        <AuthProvider>
          <CustomRoutes/>
        </AuthProvider>
      </ChurchProvider>
    </OverlayProvider>
  );
}

export default App;
