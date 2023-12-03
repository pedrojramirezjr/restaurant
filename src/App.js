import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {

  const [diner, setDiner] = useState([]);
  const [value, setValue] = useState('');

  const fetch = () => {
    axios.get(`http://localhost:3001/api/name/${value}`)
    .then((response) => {
      setDiner(response.data)
      console.log(response.data)
    })
    .catch((error) => {
      console.log("Error", error)
    })
  };

  const test = () => {
    fetch();
  }

  const getValue = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {

  }, [diner]);

  return (
    <div className="container">
      <h1>Restaurant searcher</h1>
      <p>Hello there. You can search a restaurant that you wish to find and dine.</p>
      <input type="text" onChange={getValue} value={value} placeholder='Find a restaurant'></input>
      <button onClick={test}>Search</button>
      <div className="result-container">
        {diner.map((data) => (
          <div key={data.id} className="restaurant">
            <h2>{data.name}</h2>
            <p>{data.description}</p>
            <p>{data.address}</p>
            <p>{data.phone_number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
