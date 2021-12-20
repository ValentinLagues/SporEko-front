import React from 'react';

import Connection from './Connection';
import Header from './Header';

const Home = () => {
  return (
    <div className="home">
      <div className="headerHome">
        <Header />
      </div>
      <div className="homeContainer">
        <h1>Bienvenue chez SporEko</h1>
      </div>
      <Connection />
    </div>
  );
};

export default Home;
