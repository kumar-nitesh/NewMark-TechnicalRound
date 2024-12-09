import React from "react";
import Space from "./Space";

const Property = ({ property }) => {
  return (
    <div className="property">
      <h2>{property.name}</h2>
      <p><strong>Features:</strong> {property.features.join(", ")}</p>
      <p><strong>Highlights:</strong> {property.highlights.join(", ")}</p>
      <p><strong>Transportation:</strong> {property.transportation.join(", ")}</p>

      <div className="spaces">
        <h3>Spaces:</h3>
        {property.spaces.map((space, index) => (
          <Space key={index} space={space} />
        ))}
      </div>
    </div>
  );
};

export default Property;
