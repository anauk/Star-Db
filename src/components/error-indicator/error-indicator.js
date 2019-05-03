import React from 'react';
import './error-indicator.css';
import icon from './dart-wader.png';
const ErrorIndicator=()=>{
    return (
       <div className="error-indicator">
           <img src={icon} alt="error icon" />
           <span className="boom">Boom!</span>
           <span>Somthing has gone terribly wrong</span>
           <span>(but we already here to help you)</span>
       </div>
    );
};
export default ErrorIndicator;