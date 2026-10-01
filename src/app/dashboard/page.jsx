import React from "react";
import Counter from "../components/Counter";

const DashBoardPage = () => {
  console.log("Dashboard page rendered");
  return (
    <div>
      <h1>Dashboard Page...</h1>
      <Counter></Counter>
      <ul>
        <li>Dashboard Item-1</li>
        <li>Dashboard Item-2</li>
        <li>Dashboard Item-3</li>
      </ul>
    </div>
  );
};

export default DashBoardPage;
