import React from 'react';
import './Profile.css';

const Profile = ({ name }) => {
    const hobbies = ['Lugemine', 'Reisimine', 'Jooga', 'Rattasõit', 'Küpsetamine'];
  
    return (
      <div className="profile-container">
        <h1>{name}</h1>
        <h2>Hobid:</h2>
        <ul>
          {hobbies.map((hobby, index) => (
            <li key={index}>{hobby}</li>
          ))}
        </ul>
        <form className="contact-form">
          <input type="email" placeholder="Teie e-mail" required />
          <textarea placeholder="Teie sõnum" required></textarea>
          <button type="button">Saada</button>
        </form>
      </div>
    );
  };
  
  export default Profile;