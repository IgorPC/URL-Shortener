import { Link } from 'react-router-dom';
import {useEffect} from "react";

const Error = () => {
    useEffect(() => {
        document.title = "Unexpected Error";
    }, []);

    return (
        <div className="home-container">
            <div className="home-glass-card">
                <h1>Unexpected Error</h1>
                <span>An unexpected error happened, please return to the home page and try again.</span>
                <button className="btn default-btn"><Link to="/">Home page</Link></button>
            </div>
        </div>
    );
};

export default Error;