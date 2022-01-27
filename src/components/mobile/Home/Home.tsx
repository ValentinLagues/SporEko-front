import React from 'react';

import Logo from '../../../../resources/Logo_dark.png';

const Home = () => {
  return (
    <div className="home">
      <div className="home__Container">
        <img src={Logo} alt="Sporeko" />

        <p>Dépensez moins, pour vous dépenser plus!</p>
        <form>
          <input className="btn" type="text" placeholder="Recherchez sur SPOREKO" />
        </form>
      </div>
    </div>
  );
};

export default Home;
