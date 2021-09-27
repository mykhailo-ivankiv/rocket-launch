import React, {useState} from 'react';
import {useAsync, useDebounce} from "react-use";
import {memoizeWith, map} from "ramda";
import {jsonToQueryString} from "../utils/data";
// styles
import BEM from "../utils/BEM";
import "./App.css"
import {DateIntervalType} from "../utils/commonTypes";
import Launch from "../Launch/Launch";

const b = BEM("App")


const getUrl = (baseUrl: string, params: Object): string => {
    const queryString = jsonToQueryString(params)

    return `${baseUrl}${queryString ? `?${queryString}` : ""}`;
}

const get = memoizeWith(
    (url: string, params: Object = {}): string => getUrl(url, params),
    async (url: string, params: Object) => await (await fetch(getUrl(url, params))).json())

type LaunchRequestParams = {
    search?: string
}
type LaunchResponse = {
    results: {
        name: string,
        slug: string,
        window_start: string
        window_end: string
        location__id: number,
    }[]
}
type LaunchType = {
    name: string,
    slug: string,
    window: DateIntervalType
}

const upcomingLunchesAdapter = (rawData: LaunchResponse): LaunchType[] =>
    map(({name, slug, window_start, window_end, location__id}) => ({
        name,
        slug,
        window: {
            start: new Date(window_start),
            end: new Date(window_end)
        },
        locationId: location__id,
    }), rawData.results)

const getLunches = async (params: LaunchRequestParams): Promise<LaunchResponse> => get("https://lldev.thespacedevs.com/2.2.0/launch", params)

// @ts-ignore
const getUpcomingLunches = async (params: LaunchRequestParams): Promise<LaunchType> => upcomingLunchesAdapter(
    (await get("https://lldev.thespacedevs.com/2.2.0/launch/upcoming", params) as LaunchResponse)
)


const App = () => {
    const [lunchesParams, setLunchesParams] = useState<LaunchRequestParams>({});
    const launch = useAsync(() => getUpcomingLunches(lunchesParams), [lunchesParams])
    const [search, setSearch] = useState<string>("");

    useDebounce(() => setLunchesParams((lunchesParams) => ({...lunchesParams, search})), 400, [search]);

    return (
        <div className={b()}>
            <input className={b("search-input")} type="text" value={search}
                   onChange={({target}) => setSearch(target.value.trim())}/>
            {launch.loading && !launch.value && <div>Loading...</div>}
            {launch.error && <div>Error: {JSON.stringify(launch.error)}</div>}

            <div className={b("result", {loading: launch.loading})}>
                {// @ts-ignore*/
                    launch.value?.length !== 0
                        // @ts-ignore*/
                        ? map(({name, slug, window}: LaunchType) => <Launch name={name} window={window}/>, launch.value || [])
                        : <span>"No data"</span>}
            </div>

        </div>
    );
};

export default App;
