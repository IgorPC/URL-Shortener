import './Home.css';
import RedirectToMyUrlModal from "../../components/Modal/RedirectToMuUrlModal/RedirectToMyUrlModal.tsx";
import {useEffect, useState} from "react";
import type {CreateShortenedUrlDTO} from "../../types/DTOs/CreateShortenedUrlDTO.ts";
import type {ErrorDTO} from "../../types/DTOs/ErrorDTO.ts";
import {createShortenedUrl} from "../../services/UrlShortenerService.ts";
import { useNavigate } from "react-router-dom";
import type {ShortenedUrlDTO} from "../../types/DTOs/ShortenedUrlDTO.ts";

const Home = () => {
    useEffect(() => {
        document.title = "Url Shortener";
    }, []);

    const navigate = useNavigate();
    const [link, setLink] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const isLinkEmpty = link.trim() === "";
    const [errorMsg, setErrorMsg] = useState<string>('');

    const shortenUrl = async (): Promise<void> => {
        if (isLinkEmpty) {
            return;
        }

        setLoading(true);

        const body = {
            link: link,
        } as CreateShortenedUrlDTO;

        try {
            setErrorMsg('');
            const response: ShortenedUrlDTO | ErrorDTO = await createShortenedUrl(body);

            if ('error' in response) {
                if ('link' in response.error && Array.isArray(response.error.link)) {
                    setErrorMsg(response.error.link[0]);
                }

                setLoading(false);
                return;
            }

            setTimeout(() => {
                setLoading(false);
                setLink("");

                navigate(`/statistics/${encodeURIComponent(response.identifier)}`);
            }, 1000)
        } catch (error) {
            setLoading(false);
            navigate(`/error`);
        }
    }

    const updateLink = (value: string): void => {
        setErrorMsg('')
        setLink(value);
    }

    const error = errorMsg.length ? (
        <div role="alert" className="alert alert-error invalid-link-alert">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none"
                 viewBox="0 0 24 24">
                <path strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span> { errorMsg } </span>
        </div>
    ) : '';

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
                        onChange={(e) => updateLink(e.target.value)}
                    />

                    { error }

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