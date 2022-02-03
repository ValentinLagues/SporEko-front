import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import authMenu from './auth';
import Connection from './components/mobile/connection/Connection';
import Footer from './components/mobile/layout/Footer';
import Header from './components/mobile/layout/Header';
import CurrentUserContext from './contexts/CurrentUser';
import menuList from './menu';

function App() {
  const { idUser, accepted } = useContext(CurrentUserContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          {menuList.map(({ path, Component }, index) => (
            <Route path={path} key={index} element={<Component />} />
          ))}
          <Route path={idUser || accepted ? '' : '*'} element={<Connection />} />
        </Routes>
        <Routes>
          {(idUser || accepted) &&
            authMenu.map(({ path, Component }, index) => (
              <Route path={path} key={index} element={<Component />} />
            ))}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
