import React, { useEffect, useState } from "react";
import PropertyList from "./components/PropertyList";
import { fetchProperties } from "./services/apiService";
import "./styles/styles.css";

function App() {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProperties(setLoading); // Pass setLoading to API
        setProperties(data);
      } catch (err) {
        setError(`Error: ${err.message}`);
        console.error("Error fetching properties:", err);
      }
    };

    loadData();
  }, []);

  return (
    <div className="App">
      <h1>Properties</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <PropertyList properties={properties} />}
    </div>
  );
}

export default App;
