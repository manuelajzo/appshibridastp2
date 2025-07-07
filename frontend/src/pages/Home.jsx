import { useState } from 'react';
import DlcList from '../components/DlcList';
import Games from '../components/Games';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
        <h1>Welcome to The Sims Database</h1>
      <div className="banner">
        <img 
          src="/banner.jpg" 
          alt="Banner The Sims" 
          className="banner-image" 
        />
      </div>

      <div className="button-group">
        <button className="btn btn-primary"> <Link to="/games">See all games</Link></button>
        <button className="btn btn-primary"><Link to="/dlcs" >See all DLCs</Link></button>
      </div>
    </div>
  );
};

export default Home;