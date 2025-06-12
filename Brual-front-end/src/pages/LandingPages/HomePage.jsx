import pic from "../../assets/images/react.png";
import React from 'react';
const HomePage = () => {
    return (
<div className="homepage">
<h1>Home Page</h1>
<img src={pic} alt="pic" className="pic" />
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eros lectus, dapibus blandit tempor nec</p>
   </div>
    );
};
export default HomePage;