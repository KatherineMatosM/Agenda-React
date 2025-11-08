import React, { useState } from 'react';
import AgregarContacto from './components/AgregarContacto';
import ListaContactos from './components/ListaContactos';
import CherryBlossom from './components/CherryBlossom';
import './index.css';

export default function App() {
  const [isListVisible, setIsListVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleContactoAgregado = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <CherryBlossom />
      <div className="background-glow"></div>
      
      <div className="container">
        <header className="app-header">
          <div className="logo">
            <i className="fas fa-address-book"></i>
          </div>
          <h1>Agenda de Contactos</h1>
          <div className="decoration">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </header>
        
        <AgregarContacto onContactoAgregado={handleContactoAgregado} />
        
        <ListaContactos 
          key={refreshKey}
          isVisible={isListVisible}
          refreshKey={refreshKey}
          onToggleVisibility={() => setIsListVisible(!isListVisible)}
        />
      </div>
    </div>
  );
}