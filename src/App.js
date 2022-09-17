import React from 'react'
import CustomRoutes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import { AuthProvider } from './context/AuthContext';
import { ChurchProvider } from './context/ChurchContext';
import { GlobalEnvironment } from './global';


function App() {
  return (
    <ChurchProvider>
      <AuthProvider>
        <GlobalEnvironment>
          <CustomRoutes/>
        </GlobalEnvironment>
      </AuthProvider>
    </ChurchProvider>
  );
}

export default App;
