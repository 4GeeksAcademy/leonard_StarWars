import React, { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';
import DetailModal from '../components/DetailModal';
import "../Styles/Home.css";
const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        const baseURL = 'https://www.swapi.tech/api';
        const [charRes, planRes, specRes, shipRes, vehRes] = await Promise.all([
          fetch(`${baseURL}/people/`),
          fetch(`${baseURL}/planets/`),
          fetch(`${baseURL}/species/`),
          fetch(`${baseURL}/starships/`),
          fetch(`${baseURL}/vehicles/`)
        ]);
        const charData = await charRes.json();
        const planData = await planRes.json();
        const specData = await specRes.json();
        const shipData = await shipRes.json();
        const vehData = await vehRes.json();
        setCharacters(charData.results || []);
        setPlanets(planData.results || []);
        setSpecies(specData.results || []);
        setStarships(shipData.results || []);
        setVehicles(vehData.results || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);
  const handleLearnMore = async (item, type) => {
    try {
      setIsModalOpen(true);
      setSelectedType(type);
      setSelectedItem({ ...item, properties: { loading: true } });
      const response = await fetch(item.url);
      const data = await response.json();
      
      const fullItem = {
        ...item,
        ...data.result,
        properties: data.result.properties
      };
      
      setSelectedItem(fullItem);
    } catch (error) {
      console.error('Error fetching item details:', error);
      setSelectedItem(item);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setSelectedType(null);
  };
  if (loading) {
    return (
      <div className="home">
        <div className="loading-container">
          <h2>Loading the galaxy...</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="home">
      <div className="content-wrapper">
        <header className="home-header">
          <h1 className="star-wars-title">STAR WARS</h1>
          <h2 className="subtitle">Explore the Galaxy</h2>
        </header>
        <main className="home-main">
          <section className="items-section" style={{ '--section-color': '#E91E63' }}>
            <h2>CHARACTERS</h2>
            <div className="items-scroll-container">
              <div className="items-grid">
                {characters.slice(0, 10).map((character) => (
                  <ItemCard
                    key={character.uid}
                    item={character}
                    type="characters"
                    onLearnMore={() => handleLearnMore(character, 'characters')}
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="items-section" style={{ '--section-color': '#4A90E2' }}>
            <h2>PLANETS</h2>
            <div className="items-scroll-container">
              <div className="items-grid">
                {planets.slice(0, 10).map((planet) => (
                  <ItemCard
                    key={planet.uid}
                    item={planet}
                    type="planets"
                    onLearnMore={() => handleLearnMore(planet, 'planets')}
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="items-section" style={{ '--section-color': '#8BC34A' }}>
            <h2>SPECIES</h2>
            <div className="items-scroll-container">
              <div className="items-grid">
                {species.slice(0, 10).map((specie) => (
                  <ItemCard
                    key={specie.uid}
                    item={specie}
                    type="species"
                    onLearnMore={() => handleLearnMore(specie, 'species')}
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="items-section" style={{ '--section-color': '#FF9800' }}>
            <h2>STARSHIPS</h2>
            <div className="items-scroll-container">
              <div className="items-grid">
                {starships.slice(0, 10).map((starship) => (
                  <ItemCard
                    key={starship.uid}
                    item={starship}
                    type="starships"
                    onLearnMore={() => handleLearnMore(starship, 'starships')}
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="items-section" style={{ '--section-color': '#9C27B0' }}>
            <h2>VEHICLES</h2>
            <div className="items-scroll-container">
              <div className="items-grid">
                {vehicles.slice(0, 10).map((vehicle) => (
                  <ItemCard
                    key={vehicle.uid}
                    item={vehicle}
                    type="vehicles"
                    onLearnMore={() => handleLearnMore(vehicle, 'vehicles')}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      <DetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={selectedItem}
        type={selectedType}
      />
    </div>
  );
};
export default Home;
