import './Home.css';
import RedirectToMyUrlModal from "../../components/Modal/RedirectToMuUrlModal/RedirectToMyUrlModal.tsx";
import {useEffect} from "react";

const Home = () => {
    useEffect(() => {
        document.title = "Url Shortener";
    }, []);

    return (
        <div className="home-container">
            <div className="home-glass-card">
                <h1>Shorten your URL</h1>
                <p className="home-text">Paste your link below and let the magic happen.</p>

                <div className="input-group">
                    <input type="text" className="input shortener-input"
                           placeholder="https://example.com.br/rd/your-link"/>
                    <button className="btn default-btn">Make it Shorter</button>
                </div>

                <div className="divider divider-footer"></div>

                <RedirectToMyUrlModal />
            </div>
        </div>
    );
};

export default Home;