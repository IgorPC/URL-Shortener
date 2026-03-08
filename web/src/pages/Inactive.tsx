import { Link } from 'react-router-dom';
import {useEffect} from "react";

const Inactive = () => {
    useEffect(() => {
        document.title = "Link Inactive or Not Found";
    }, []);

    return (
        <div className="home-container">
            <div className="home-glass-card ">
                <h1>Link Inactive or Not Found</h1>
                <button className="btn default-btn"><Link to="/">Home page</Link></button>
            </div>
        </div>
    );
};

export default Inactive;