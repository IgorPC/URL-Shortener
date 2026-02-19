import { useParams } from 'react-router-dom';
import {useEffect} from "react";
import type {StatisticsPageParams} from "../types/Params/StatisticsPageParams.ts";

const Statistics = () => {
    const { id } = useParams<StatisticsPageParams>();

    useEffect(() => {
        document.title = "Statistics";
    }, []);

    return (
        <div>
            <h1>Statistics Page</h1>
            <p>Checking ID: <strong>{id}</strong></p>
        </div>
    );
};

export default Statistics;