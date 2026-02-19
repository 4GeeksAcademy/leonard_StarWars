import React, { useEffect, useMemo, useState } from 'react';
import fallbackImage from '../assets/img/rigo-baby.jpg';
import "../Styles/DetailModal.css";
const DetailModal = ({ isOpen, onClose, item, type }) => {
  const getDetailFields = () => {
    if (!item) return [];
    const properties = item.properties || item;
    
    if (properties.loading) {
      return [{ label: 'Loading', value: 'Please wait...' }];
    }
    
    switch(type) {
      case 'characters':
        return [
          { label: 'Height', value: properties.height },
          { label: 'Mass', value: properties.mass },
          { label: 'Birth Year', value: properties.birth_year },
          { label: 'Gender', value: properties.gender },
          { label: 'Hair Color', value: properties.hair_color },
          { label: 'Skin Color', value: properties.skin_color },
          { label: 'Eye Color', value: properties.eye_color }
        ];
      
      case 'planets':
        return [
          { label: 'Diameter', value: properties.diameter },
          { label: 'Rotation Period', value: properties.rotation_period },
          { label: 'Orbital Period', value: properties.orbital_period },
          { label: 'Gravity', value: properties.gravity },
          { label: 'Population', value: properties.population },
          { label: 'Climate', value: properties.climate },
          { label: 'Terrain', value: properties.terrain }
        ];
      
      case 'species':
        return [
          { label: 'Classification', value: properties.classification },
          { label: 'Designation', value: properties.designation },
          { label: 'Average Height', value: properties.average_height },
          { label: 'Skin Colors', value: properties.skin_colors },
          { label: 'Hair Colors', value: properties.hair_colors },
          { label: 'Eye Colors', value: properties.eye_colors },
          { label: 'Language', value: properties.language }
        ];
      
      case 'starships':
        return [
          { label: 'Model', value: properties.model },
          { label: 'Manufacturer', value: properties.manufacturer },
          { label: 'Length', value: properties.length },
          { label: 'Max Atmosphering Speed', value: properties.max_atmosphering_speed },
          { label: 'Crew', value: properties.crew },
          { label: 'Passengers', value: properties.passengers },
          { label: 'Cargo Capacity', value: properties.cargo_capacity },
          { label: 'Consumables', value: properties.consumables }
        ];
      
      case 'vehicles':
        return [
          { label: 'Model', value: properties.model },
          { label: 'Manufacturer', value: properties.manufacturer },
          { label: 'Length', value: properties.length },
          { label: 'Max Atmosphering Speed', value: properties.max_atmosphering_speed },
          { label: 'Crew', value: properties.crew },
          { label: 'Passengers', value: properties.passengers },
          { label: 'Cargo Capacity', value: properties.cargo_capacity },
          { label: 'Consumables', value: properties.consumables }
        ];
      
      default:
        return [];
    }
  };
  const getImageUrl = () => {
    const baseUrl = 'https://starwars-visualguide.com/assets/img';
    if (!item?.uid) return fallbackImage;
    
    if (type === 'characters') {
      return `${baseUrl}/characters/${item.uid}.jpg`;
    } else if (type === 'planets') {
      return `${baseUrl}/planets/${item.uid}.jpg`;
    } else if (type === 'species') {
      return `${baseUrl}/species/${item.uid}.jpg`;
    } else if (type === 'starships') {
      return `${baseUrl}/starships/${item.uid}.jpg`;
    } else if (type === 'vehicles') {
      return `${baseUrl}/vehicles/${item.uid}.jpg`;
    }
    return fallbackImage;
  };
  const initialImageUrl = useMemo(() => getImageUrl(), [item?.uid, type]);
  const [imageSrc, setImageSrc] = useState(initialImageUrl);
  useEffect(() => {
    setImageSrc(initialImageUrl);
  }, [initialImageUrl]);
  if (!isOpen || !item) return null;
  const fields = getDetailFields();
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-body">
          <div className="modal-image">
            <img
              src={imageSrc}
              alt={item.name}
              onError={() => setImageSrc(fallbackImage)}
            />
          </div>
          
          <div className="modal-info">
            <h2>{item.name}</h2>
            
            <div className="modal-details">
              {fields.map((field, index) => (
                <div key={index} className="detail-row">
                  <span className="detail-label">{field.label}:</span>
                  <span className="detail-value">{field.value || 'N/A'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailModal;