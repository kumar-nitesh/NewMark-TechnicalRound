import React from "react";

const Space = ({ space }) => {
  return (
    <div className="space">
      <h4>{space.name}</h4>
      <ul>
        {Object.entries(space.rentRoll).map(([month, amount]) => (
          <li key={month}>
            {month}: {amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Space;
