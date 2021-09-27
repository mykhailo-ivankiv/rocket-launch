import React, {useState} from "react";
import RelativeDate from "../RelativeDate/RelativeDate";
import {useInterval} from "react-use";

type Props = {
    date: Date
}

const RelativeDateFromNow: React.FC<Props> = ({date}) => {
    const [nowDate, setNowDate] = useState<Date>(new Date());

    useInterval(() => setNowDate(new Date()), 1000)

    return <RelativeDate baseDate={nowDate} date={date}/>
}

export default RelativeDateFromNow
