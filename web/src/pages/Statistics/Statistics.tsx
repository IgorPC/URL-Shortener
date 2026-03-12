import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import type {StatisticsPageParams} from "../../types/Params/StatisticsPageParams.ts";
import './Statistics.css';
import TotalClicks from "../../components/TotalClicks/TotalClicks.tsx";
import FullLoading from "../../components/FullLoading/FullLoading.tsx";
import { getStatistics } from "../../services/UrlShortenerService.ts";
import type {StatisticsFilterValidated} from "../../constants/StatisticsFilter.ts";
import {StatisticsFilter} from "../../constants/StatisticsFilter.ts";
import type {ErrorDTO} from "../../types/DTOs/ErrorDTO.ts";
import type {StatisticsDTO} from "../../types/DTOs/StatisticsDTO.ts";

const Statistics = () => {
    const navigate = useNavigate();

    const { id } = useParams<StatisticsPageParams>();

    const [statistics, setStatistics] = useState<StatisticsDTO>({} as StatisticsDTO);
    const [filter, setFilter] = useState<StatisticsFilterValidated>(StatisticsFilter.SEVEN_DAYS);

    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async (identifier: string, filter: StatisticsFilterValidated): Promise<void> => {
        try {
            setLoading(true);

            const response: ErrorDTO | StatisticsDTO = await getStatistics(identifier, filter);

            if (response.hasOwnProperty('error')) {
                console.log(response)
            }

            setStatistics(response as StatisticsDTO);
            setLoading(false);
        } catch (error) {
            navigate(`/error`);
        }
    }

    const removeTimeFromDate = (date: string): string => {
        return date.split(' ')[0];
    }

    const handleFilterChange = async (selectedFilter: StatisticsFilterValidated): Promise<void> => {
        setFilter(selectedFilter);
        fetchData(statistics.identifier, selectedFilter);
    }

    useEffect(() => {
        document.title = "Statistics";

        if (!id) {
            navigate(`/not-found`);
        }

        fetchData(String(id), StatisticsFilter.SEVEN_DAYS)
    }, []);

    if (loading) {
        return <FullLoading />
    }

    if (!statistics.identifier) {
        navigate(`/not-found`);
        return;
    }

    const actionButton = statistics.is_active ? (
        <button className="btn btn-warning w-full">Mark as Inactive</button>
    ) : (
        <button className="btn btn-success w-full">Make it Active</button>
    );

    const filterElement = (
        <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Time Period:</legend>
            <select
                className="select w-full select-period"
                value={filter}
                onChange={(e) => handleFilterChange(e.target.value as StatisticsFilterValidated)}
            >
                <option value={StatisticsFilter.SEVEN_DAYS}>Past 7 Days</option>
                <option value={StatisticsFilter.HALF_MONTH}>Past 15 Days</option>
                <option value={StatisticsFilter.MONTH}>Past 30 Days</option>
                <option value={StatisticsFilter.THREE_MONTHS}>Past 90 Days</option>
                <option value={StatisticsFilter.ALL}>All time</option>
            </select>
        </fieldset>
    );

    return (
        <div className="flex flex-col w-full min-h-screen lg:h-screen lg:overflow-hidden">

            <div className="w-full lg:min-h-[29%] p-6 text-primary-content text-2xl font-bold shadow-md rounded-b-box info-div grid grid-cols-1 lg:grid-cols-12 gap-6">

                <div className="lg:col-span-8 w-full">
                    <h1><span className="header-text">Identifier:</span> { statistics.identifier }</h1>
                    <div className="divider"/>
                    <p><span className="header-text">Created At:</span> { statistics.created_at }</p>
                    <p><span className="header-text">Total Clicks:</span> { statistics.total_clicks }</p>
                    <div className="divider"/>
                    <p><span className="header-text">Original Link:</span> <a href={statistics.original_url} target="_blank" className="link-text"> { statistics.original_url } </a></p>
                    <p><span className="header-text">Shortened Link:</span> <a href={statistics.short_url} target="_blank" className="link-text"> { statistics.short_url } </a></p>
                </div>

                <div className="lg:col-span-4 w-full flex flex-col gap-4">
                    <div className="w-full">
                        <TotalClicks
                            clicks={statistics.clicks.length}
                            start={removeTimeFromDate(statistics.period.to)}
                            end={removeTimeFromDate(statistics.period.from)}
                        />
                    </div>
                    { actionButton }
                    { filterElement }
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