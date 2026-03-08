import type {TotalClicksParams} from "../../types/Params/TotalClicksParams.ts";
import "./TotalClicks.css";

const TotalClicks = (params: TotalClicksParams) => {
    return (
        <div className="stats shadow total-clicks w-full">
            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-8 w-8 stroke-current oklch(0.76 0.18 111.55)"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.141-7.313 5.611 5.418-2.51-.129z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19.5 12h-2.25M4.5 12H2.25M12 4.5V2.25m0 19.5v-2.25M17.303 6.697l-1.591 1.591M6.697 6.697L5.106 5.106"
                        />
                    </svg>
                </div>
                <div className="stat-title">Clicks</div>
                <div className="stat-value"> { params.clicks } </div>
                <div className="stat-desc"> { params.start } - { params.end } </div>
            </div>
        </div>
    )
}

export default TotalClicks;