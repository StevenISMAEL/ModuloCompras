// client/src/App.jsx
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hacemos la llamada a la API usando la ruta relativa.
    // Vite se encargará de redirigirla al backend gracias al proxy.
    fetch('/api/proveedores')
      .then(response => {
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue correcta');
        }
        return response.json();
      })
      .then(data => {
        setProviders(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez

  return (
    <>
      <h1>Módulo de Compras</h1>
      <h2>Lista de Proveedores desde la API</h2>
      {loading && <p>Cargando proveedores...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul>
        {providers.map(provider => (
          <li key={provider.cedula_ruc}>
            <strong>{provider.nombre}</strong> ({provider.email})
          </li>
        ))}
      </ul>
    </>
  )
}

export default App