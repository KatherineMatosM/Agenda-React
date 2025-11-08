import React, { useState, useEffect } from 'react';

const API_URL = 'http://www.raydelto.org/agenda.php';

export default function ListaContactos({ isVisible, onToggleVisibility, refreshKey }) {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cargarContactos = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al cargar contactos');
      }

      const data = await response.json();
      setContactos(data);
    } catch (err) {
      setError(err.message);
      setContactos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      cargarContactos();
    }
  }, [refreshKey, isVisible]);

  const handleToggle = () => {
    if (!isVisible) {
      cargarContactos();
    }
    onToggleVisibility();
  };

  return (
    <div className="contacts-section">
      <h2>
        <i className="fas fa-list header-icon"></i>
        Lista de Contactos
      </h2>
      
      <button
        className="btn-primary btn-show"
        onClick={handleToggle}
        disabled={loading}
      >
        {loading ? (
          <>
            <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
            Cargando...
          </>
        ) : isVisible ? (
          <>
            <i className="fas fa-eye-slash" style={{ marginRight: '8px' }}></i>
            Ocultar Contactos
          </>
        ) : (
          <>
            <i className="fas fa-eye" style={{ marginRight: '8px' }}></i>
            Mostrar Contactos
          </>
        )}
      </button>

      {loading && (
        <div className="loading">
          <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
          Cargando contactos...
        </div>
      )}

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {isVisible && !loading && !error && (
        <>
          {contactos.length === 0 ? (
            <div className="no-contacts">
              <i className="fas fa-info-circle" style={{ marginRight: '8px' }}></i>
              No hay contactos guardados.
            </div>
          ) : (
            <ul className="contact-list">
              {contactos.map((contact, index) => (
                <li key={index} className="contact-item">
                  <i className="fas fa-user-circle"></i>
                  <div className="contact-details">
                    <strong>{contact.nombre} {contact.apellido}</strong><br />
                    <i className="fas fa-phone"></i>
                    <span className="phone-number">{contact.telefono}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}