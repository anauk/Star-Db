import React from 'react';

import './header.css';

const Header = () => {
    return (
        <div className='header d-flex'>
            <h3>
                <a href="#"> Star DB</a>
            </h3>
        <ul className="d-flex">
            <ul><a href="#">People</a></ul>
            <ul><a href="#">Planets</a></ul>
            <ul><a href="#">Starships</a></ul>

        </ul>
            </div>
    );
};
export default Header;