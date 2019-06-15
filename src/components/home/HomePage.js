import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
            <div className="jumbotron">
                <h1>Pluralsight Administration</h1>
                <p>React, React Router, and Redux for ultra responsive web apps.</p>
                <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
            </div>
);

export default HomePage;
