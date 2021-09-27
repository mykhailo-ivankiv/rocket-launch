import React, {useState} from 'react';
import './App.css';
import {useAsync} from "react-use";
import {memoizeWith, map} from "ramda";
import {jsonToQueryString} from "../utils/data";
// styles
import BEM from "../utils/BEM";
import "./App.css"
const b = BEM("App")


const getUrl = (baseUrl: string, params: Object): string => {
    const queryString = jsonToQueryString(params)

    return `${baseUrl}${queryString ? ` ?${queryString}` : ""}`;
}

const get = memoizeWith(
    (url: string, params: Object = {}): string => getUrl(url, params),
    async (url: string, params: Object) => await (await fetch(getUrl(url, params))).json())

type NumberInterval = { start: number, end: number }
type DateInterval = { start: Date, end: Date }
type Interval = NumberInterval | DateInterval

type LaunchRequestParams = {}
type LaunchResponse = {
    results: {
        name: string,
        slug: string,
        window_start: string
        window_end: string
    }[]
}
type Launch = {
    name: string,
    slug: string,
    window: DateInterval
}

const upcomingLunchesAdapter = (rawData: LaunchResponse): Launch[] => map(({name, slug, window_start, window_end}) => ({
    name,
    slug,
    window: {
        start: new Date(window_start),
        end: new Date(window_end)
    }
}), rawData.results)

// const getLunches = async (params: LaunchRequestParams): Promise<LaunchResponse> => get("https://lldev.thespacedevs.com/2.2.0/launch", params)

// @ts-ignore
const getUpcomingLunches = async (params: LaunchRequestParams): Promise<Launch> => upcomingLunchesAdapter(
    (await get("https://lldev.thespacedevs.com/2.2.0/launch/upcoming", params) as LaunchResponse)
)


const App = () => {
    const [lunchesParams] = useState<LaunchRequestParams>({});
    const launch = useAsync(() => getUpcomingLunches(lunchesParams), [lunchesParams])


    return (
        <div className={b()}>
            {launch.loading && launch.value && "Loading..."}
            {launch.error && <div>Error: {JSON.stringify(launch.error)}</div>}
            {/*// @ts-ignore*/}
            {map(({name, slug}: Launch) => <div key={slug}>{name}</div>, launch.value || [])}
        </div>
    );
};

export default App;
