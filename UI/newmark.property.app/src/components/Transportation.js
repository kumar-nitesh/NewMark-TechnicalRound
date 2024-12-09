import React from "react";

const Transportation = ({ data }) => {
  if (!data || data.length === 0) {
    return <p><strong>Transportation:</strong> No transportation details available.</p>;
  }

  return (
    <div>
      <strong>Transportation:</strong>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.type} ({item.distance})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transportation;
