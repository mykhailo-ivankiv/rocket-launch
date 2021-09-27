import React, {useState} from 'react';
import './App.css';
import {useAsync} from "react-use";
import {memoizeWith, map} from "ramda";
import {jsonToQueryString} from "../utils/data";

const getUrl = (baseUrl: string, params: Object): string => {
    const queryString = jsonToQueryString(params)

    return `${baseUrl}${queryString ? ` ?${queryString}` : ""}`;
}

const get = memoizeWith(
    (url: string, params: Object = {}): string => getUrl(url, params),
    async (url: string, params: Object) => await (await fetch(getUrl(url, params))).json())


type LaunchRequestParams = {}
type Launch = {
    name: string,
    slug: string
}
type LaunchResponse = {
    results: Launch[]
}


const getLunches = async (params: LaunchRequestParams): Promise<LaunchResponse> => get("https://lldev.thespacedevs.com/2.2.0/launch", params)


function App() {
    const [lunchesParams, setLunchesRequestParams] = useState<LaunchRequestParams>({});
    const launch = useAsync(() => getLunches(lunchesParams), [lunchesParams])


    return (
        <div className="App">
            {launch.loading && launch.value && "Loading..."}
            {/*// @ts-ignore*/}
            {map(({name, slug}: object) => <div key={slug}>{name}</div>, launch.value?.results || [])}
        </div>
    );
}

export default App;
