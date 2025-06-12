import pic from "../../assets/images/react.png";

import React from 'react';
const AboutPage = () => {
    return (
<div className="aboutpage">
<h1>ABOUT</h1>
<img src={pic} alt="pic" className="pic" />
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
   </div>
    );
};
export default AboutPage;