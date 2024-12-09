import React, { useState } from "react";

const PropertyList = ({ properties }) => {
  // Function to format rent as currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // State to manage visibility of property and space sections
  const [openPropertyIndex, setOpenPropertyIndex] = useState(null);
  const [openSpaceIndexes, setOpenSpaceIndexes] = useState({});

  // Toggle Property Visibility
  const toggleProperty = (index) => {
    setOpenPropertyIndex(openPropertyIndex === index ? null : index);
  };

  // Toggle Space Visibility for each property
  const toggleSpace = (propertyIndex, spaceIndex) => {
    const key = `${propertyIndex}-${spaceIndex}`;
    setOpenSpaceIndexes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div>
      {/* Displaying each property */}
      {properties.map((property, propertyIndex) => (
        <div key={propertyIndex} className="property">
          <h2 onClick={() => toggleProperty(propertyIndex)} style={{ cursor: 'pointer' }}>
            Property {propertyIndex + 1}: {property.name}
          </h2>

          {/* Collapsible property details */}
          {openPropertyIndex === propertyIndex && (
            <div>
              <div>
                <strong>Features:</strong>
                <span className="bullet">{property.features.join(", ")}</span>
              </div>
              <div>
                <strong>Highlights:</strong>
                <span className="bullet">{property.highlights.join(", ")}</span>
              </div>
              <div>
                <strong>Transportation:</strong>
                <span className="bullet">
                  {property.transportation.map(t => `${t.type} (${t.distance})`).join(", ")}
                </span>
              </div>

              {/* Collapsible Spaces */}
              <div className="spaces">
                <h3>Spaces:</h3>
                {property.spaces.map((space, spaceIndex) => (
                  <div key={spaceIndex} className="space">
                    <h4 onClick={() => toggleSpace(propertyIndex, spaceIndex)} style={{ cursor: 'pointer' }}>
                    {space.name || `Space ${spaceIndex + 1}`}
                    </h4>

                    {/* Collapsible rent roll details for space */}
                    {openSpaceIndexes[`${propertyIndex}-${spaceIndex}`] && (
                      <div className="rent-roll">
                        {space.rentRoll.map((rent, rentIndex) => (
                          <div key={rentIndex}>
                            <ul>
                              <li>
                                {rent.month}: {formatCurrency(rent.rent)}
                              </li>
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PropertyList;