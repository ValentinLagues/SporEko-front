import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <div className="home__Container">
        <h1>
          Spor<span>E</span>ko
        </h1>
        <p>Dépensez moins, pour vous dépensez plus!</p>
        <form>
          <input className="btn" type="text" placeholder="Recherchez sur SPOREKO" />
        </form>
      </div>
    </div>
  );
};

export default Home;
