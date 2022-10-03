import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <>
      <footer>
        <div>
          <div class="Signup__text">
            Give us your e-mail so we can give you 25% off next time you visit
            us
          </div>
          <form class="Signup__form" id="newsletter">
            <input required id="email" type="email" placeholder="Your e-mail" />
            <button form="newsletter" type="submit" class="Signup__button">
              Get offers
            </button>
          </form>
        </div>
      </footer>
    </>
  );
};

export default Footer;
