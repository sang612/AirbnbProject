import React from "react";
import Locations from "./Locations";
import SearchMenu from "./SearchMenu";

const HomePage = () => {
  return (
    <div className="px-20 homepage">
      <SearchMenu />
      <Locations />
    </div>
  );
};

export default HomePage;
