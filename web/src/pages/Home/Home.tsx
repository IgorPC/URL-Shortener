import './Home.css';
import RedirectToMyUrlModal from "../../components/Modal/RedirectToMuUrlModal/RedirectToMyUrlModal.tsx";
import {useEffect, useState} from "react";
import type {CreateShortenedUrlDTO} from "../../types/DTOs/CreateShortenedUrlDTO.ts";
import {createShortenedUrl} from "../../services/UrlShortenerService.ts";
import { useNavigate } from "react-router-dom";

const Home = () => {
    useEffect(() => {
        document.title = "Url Shortener";
    }, []);

    const navigate = useNavigate();
    const [link, setLink] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const isLinkEmpty = link.trim() === "";

    const shortenUrl = async () => {
        if (isLinkEmpty) {
            return;
        }

        setLoading(true);

        const body = {
            link: link,
        } as CreateShortenedUrlDTO;

        try {
            const response = await createShortenedUrl(body);

            setTimeout(() => {
                setLoading(false);
                setLink("");

                navigate(`/statistics/${encodeURIComponent(response.identifier)}`);
            }, 1000)

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="home-container">
            <div className="home-glass-card">
                <h1>Shorten your URL</h1>
                <p className="home-text">Paste your link below and let the magic happen.</p>

                <div className="input-group">
                    <input
                        type="text"
                        className="input shortener-input"
                        placeholder="https://example.com.br/your-long-link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    <button disabled={isLinkEmpty} onClick={shortenUrl} className="btn default-btn">
                        { loading ? "Loading..." : "Make it Shorter" }
                    </button>
                </div>

                <div className="divider divider-footer"></div>

                <RedirectToMyUrlModal />
            </div>
        </div>
    );
};

export default Home;