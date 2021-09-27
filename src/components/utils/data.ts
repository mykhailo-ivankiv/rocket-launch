import {pipe, reduce} from "ramda";

export const jsonToQueryString = pipe(
    (obj: Record<string, any>) => Object.entries(obj),
    reduce((acc: URLSearchParams, [key, value]) => {
        acc.append(key, String(value))
        return acc;
    }, new URLSearchParams()),
    (params: URLSearchParams) => params.toString(),
);
