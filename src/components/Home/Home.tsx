import React from 'react';

import Logo from '../../../resources/Logo_transparent.png';
import Loupe from '../../../resources/loupe.png';

const Home = () => {
  return (
    <div className="home">
      <div className="home__Container">
        <img src={Logo} alt="Sporeko" />

        <p>Dépensez moins, pour vous dépenser plus!</p>
        <form>
<<<<<<< HEAD
          <img src={Loupe} alt="loupe" />

=======
          <button onClick={() => console.log('youpi')}>
            <img src={Loupe} alt="loupe" />
          </button>
>>>>>>> fcf6002e7d6c7ced089aca3748a4d616bc4cbc0e
          <input className="btn" type="text" placeholder="Recherchez sur SPOREKO" />
        </form>
      </div>
    </div>
  );
};

export default Home;
