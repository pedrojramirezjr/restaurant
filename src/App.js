import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState(null);
  const [data, setData] = useState([]);

  // Función para obtener datos de la API
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Realiza una solicitud GET a la API con el término de búsqueda
      const response = await axios.get(`http://localhost:3000/api?search=${search}`);
      setRestaurants(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error', error);
      setError('Hubo un problema cargando los datos');
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la búsqueda de restaurantes
  const handleSearch = async () => {
    fetchData();

    // Si el término de búsqueda no está vacío, realiza otra solicitud para obtener detalles de un restaurante específico
    if (search.trim() !== '') {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`http://localhost:3000/api/name/${search}`);

        // Verifica si hay datos en la respuesta y actualiza el estado de resultado
        if (response.data && response.data.length > 0) {
          setResult(response.data[0]);
        } else {
          setResult(null);
        }
      } catch (error) {
        console.error('Error', error);
        setError('Hubo un problema cargando los datos');
      } finally {
        setLoading(false);
      }
    }
  };

  // Función para renderizar la lista de restaurantes
  const renderRestaurants = () => {
    if (loading) {
      return <p>Cargando...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (result) {
      // Renderiza los detalles del restaurante encontrado
      return (
        <div>
          <h2>Restaurante encontrado</h2>
          <div key={result.id}>
            <h3>{result.name}</h3>
            <p>{result.description}</p>
            <p>Dirección: {result.address}</p>
            <p>Teléfono: {result.phone_number}</p>
          </div>
        </div>
      );
    }

    if (restaurants.length === 0) {
      return <p>No se encontraron restaurantes.</p>;
    }

    // Renderiza la lista de restaurantes
    return (
      <div>
        <h2>Restaurantes encontrados</h2>
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.description}</p>
              <p>Dirección: {restaurant.address}</p>
              <p>Teléfono: {restaurant.phone_number}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Renderización principal del componente App
  return (
    <div className="App">
      {/* Componente Navbar con el nombre de la marca */}
      <Navbar brand="Restaurant Finder" />
      
      {/* Componente Search con funciones de búsqueda y resultado */}
      <Search onSearch={(term) => setSearch(term)} onSearchClick={handleSearch} result={result} />

      {/* Contenedor para renderizar la lista de restaurantes */}
      <div className="container">
        {renderRestaurants()}
      </div>
    </div>
  );
};

// Componente Navbar simple que muestra el nombre de la marca
const Navbar = ({ brand }) => {
  return <div>{brand}</div>;
};

// Componente Search que incluye un campo de entrada y un botón de búsqueda
const Search = ({ onSearch, onSearchClick, result }) => {
  const [search, setSearch] = useState('');

  // Función para manejar la búsqueda al hacer clic en el botón
  const handleSearchClick = () => {
    onSearch(search);
    onSearchClick();
  };

  // Renderiza el campo de entrada y el botón de búsqueda
  return (
    <div className="mt-3 mb-3">
      <div className="input-group">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ingrese el lugar"
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={handleSearchClick}>
            Buscar
          </button>
          {result && (
            // Renderiza los detalles del restaurante encontrado (si existe)
            <div key={result.id}>
              <h4>{result.name}</h4>
              <h4>{result.description}</h4>
              <h4>{result.address}</h4>
              <h4>{result.phone_number}</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
