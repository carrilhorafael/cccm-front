import React from 'react'
import { AuthProvider } from './context/AuthContext';
import CustomRoutes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/index.css"
import './styles/forms.css'

function App() {
  return (
    <AuthProvider>
      <CustomRoutes/>
    </AuthProvider>
  );
}

export default App;
