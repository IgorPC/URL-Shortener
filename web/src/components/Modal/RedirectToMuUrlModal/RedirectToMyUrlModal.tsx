import {useState, useId} from "react";
import "./RedirectToMyUrlModal.css"
import { useNavigate } from "react-router-dom";
import {extractUrlId} from "../../../utils/urlHelper.ts";

const RedirectToMyUrlModal = () => {
    const [url, setUrl] = useState<string>("");
    const id = useId();
    const navigate = useNavigate();

    const openModal = () => {
        const modal = document.getElementById(id) as HTMLDialogElement;

        if (modal) {
            modal.showModal();
        }
    }

    const closeModal = () => {
        const modal = document.getElementById(id) as HTMLDialogElement;

        if (modal) {
            modal.close();
        }
    }

    const redirectToMyUrl = () => {
        if (url.trim()) {
            const finalId = extractUrlId(url);

            if (!finalId) {
                return;
            }

            navigate(`/statistics/${encodeURIComponent(finalId)}`);
        }
    }

    const isUrlEmpty = url.trim() === "";

    return (
        <div>
            <button className="btn btn-info statistics-btn" onClick={() => openModal()}>I wanna see the statistics of my Link</button>

            <dialog id={id} className="modal">
                <div className="modal-box w-2/4 statistics-modal-box">
                    <h3 className="font-bold text-lg">Paste your URL below!</h3>

                    <div className="statistics-modal-input-group">
                        <input
                            type="text"
                            className="input shortener-input "
                            placeholder="https://example.com.br/rd/your-link"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />

                        <button
                            className="btn default-btn statistics-redirect-btn"
                            disabled={isUrlEmpty}
                            onClick={() => redirectToMyUrl()}
                        >
                            { isUrlEmpty ? "Paste your URL" : "Redirect" }
                        </button>
                    </div>

                    <div className="modal-action statistics-modal-footer">
                        <form method="dialog">
                            <button onClick={() => closeModal()} className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default RedirectToMyUrlModal;