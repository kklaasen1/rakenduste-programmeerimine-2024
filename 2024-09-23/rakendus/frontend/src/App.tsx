import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [cats, setCats] = useState([]);
  
  useEffect(() => {
    const fetchCats = async () => {
      const response = await fetch('http://localhost:8080/cats')
      const data = await response.json();

      setCats(data);
    };

    fetchCats();
  }, []);
  
  return (
    <div>
      <h1>Cats</h1>
      <ul>
        {cats.map((cat) => (
          <li>{JSON.stringify(cat)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
