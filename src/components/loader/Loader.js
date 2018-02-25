import React from 'react';
import loaderImage from '../../assets/finger-print.gif';

export const Loader = () => {
    return <div className="loader-container">
        <img src={loaderImage} />
    </div>
};
