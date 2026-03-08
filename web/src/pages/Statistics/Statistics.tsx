import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
import type {StatisticsPageParams} from "../../types/Params/StatisticsPageParams.ts";
import './Statistics.css';
import TotalClicks from "../../components/TotalClicks/TotalClicks.tsx";
import FullLoading from "../../components/FullLoading/FullLoading.tsx";

const Statistics = () => {
    const { id } = useParams<StatisticsPageParams>();

    const [clicks, setClicks] = useState<number>(0);
    const [start, setStart] = useState<string>('2026-03-08');
    const [end, setEnd] = useState<string>('2026-03-08');

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        document.title = "Statistics";
    }, []);

    if (loading) {
        return <FullLoading />
    }

    return (
        <div className="flex flex-col w-full min-h-screen lg:h-screen lg:overflow-hidden">

            <div className="w-full lg:min-h-[29%] p-6 text-primary-content text-2xl font-bold shadow-md rounded-b-box info-div grid grid-cols-1 lg:grid-cols-12 gap-6">

                <div className="lg:col-span-8 w-full">
                    <p>test</p>
                </div>

                <div className="lg:col-span-4 w-full flex flex-col gap-4">
                    <div className="w-full">
                        <TotalClicks clicks={clicks} start={start} end={end}/>
                    </div>
                    <button className="btn btn-warning w-full">Mark as Inactive</button>
                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend">Time Period:</legend>
                        <select className="select w-full select-period">
                            <option selected>Past 7 Days</option>
                            <option>Past 15 Days</option>
                            <option>Past 30 Days</option>
                            <option>Past 90 Days</option>
                            <option>All time</option>
                        </select>
                    </fieldset>
                </div>

            </div>

            <div className="w-full h-4 lg:h-[1%]"></div>

            <div className="w-full flex-1 min-h-[400px] lg:min-h-0 lg:h-[70%] bg-base-100/20 text-2xl font-bold shadow-inner rounded-t-box graph-div">
                Graph DIV
            </div>

        </div>
    );
};

export default Statistics;