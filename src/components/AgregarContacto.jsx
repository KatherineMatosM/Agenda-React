import React, { useState } from 'react';

const API_URL = 'http://www.raydelto.org/agenda.php';

export default function AgregarContacto({ onContactoAgregado }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { nombre, apellido, telefono } = formData;
    
    if (!nombre.trim() || !apellido.trim() || !telefono.trim()) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          telefono: telefono.trim()
        })
      });

      if (!response.ok) {
        throw new Error('Error al agregar contacto');
      }

      setFormData({ nombre: '', apellido: '', telefono: '' });
      setError('');
      
      alert('Contacto agregado exitosamente.');
      onContactoAgregado();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-section">
      <h2>
        <i className="fas fa-user-plus header-icon"></i> 
        Agregar Nuevo Contacto
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <i className="fas fa-user"></i>
        </div>
        
        <div className="input-group">
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Apellido"
            required
          />
          <i className="fas fa-users"></i>
        </div>
        
        <div className="input-group">
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            required
          />
          <i className="fas fa-phone"></i>
        </div>
        
        <button type="submit" className="btn-primary btn-submit">
          <i className="fas fa-plus-circle" style={{ marginRight: '8px' }}></i>
          Agregar Contacto
        </button>
      </form>
      
      {error && (
        <div className="error" style={{ display: 'block', marginTop: '10px' }}>
          {error}
        </div>
      )}
    </div>
  );
}