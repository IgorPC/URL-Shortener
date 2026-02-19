import {useParams} from 'react-router-dom';
import {useEffect} from "react";
import './Redirect.css';
import type { RedirectPageParams } from "../../types/Params/RedirectPageParams.ts";

const Redirect = () => {
    const { id } = useParams<RedirectPageParams>();

    useEffect(() => {
        document.title = "Redirecting...";
        const fetchData = async () => {
            //Simulate a request to the API then a redirect
            try {
                setTimeout(() => {
                    console.log(`Redirecting to ${id}`);
                    // window.location.href = `redirect to the decoded url`;
                }, 1000)
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="home-container">
            <div className="home-glass-card ">
                <h1>Redirecting</h1>
                <div className="divider divider-footer"></div>
                <span className="loading loading-dots loading-lg text-secondary redirect-loading"></span>
            </div>
        </div>
    );
};

export default Redirect;