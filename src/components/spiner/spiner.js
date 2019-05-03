import React from 'react';
import './spiner.css';

const Spiner = () => {
    return (
        <div className="lds-css">
            <div className="lds-double-ring">
                <div></div>
                <div></div>
            </div>
        </div>
    );
};
export  default Spiner;