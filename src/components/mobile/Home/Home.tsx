import React from 'react';

<<<<<<< HEAD:src/components/Home/Home.tsx
import Logo from '../../../resources/Logo_dark.png';
=======
import Loupe from '../../../../resources/loupe.png';
>>>>>>> 6f8bb38907107544fb6a169767e00eaed7d6048d:src/components/mobile/Home/Home.tsx

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
