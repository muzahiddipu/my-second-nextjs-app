"use client";

import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const handleIncrease = () => {
    console.log("Increase button clicked");
    setCount(count + 1);
  };

  console.log("Counter Componte Rendared");
  return (
    <div>
      <h1 className="text-4xl">Counter : {count} </h1>
      <button className="btn btn-primary" onClick={handleIncrease}>
        Increase!
      </button>
    </div>
  );
};

export default Counter;
