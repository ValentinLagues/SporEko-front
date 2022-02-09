import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../../../resources/Logo_dark.png';

const Home = () => {
  return (
    <div className="home">
      <div className="home__Container">
        <img src={Logo} alt="Sporeko" />

        <p>Dépensez moins, pour vous dépenser plus !</p>
        <Link to="/offers">
          <button type="button" className="btn">
            Consultez les offres et trouvez votre bonheur !
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
