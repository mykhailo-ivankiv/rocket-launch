import React from "react";
import {DateIntervalType} from "../utils/commonTypes";
import RelativeDateFromNow from "../RelativeDateFromNow/RelativeDateFromNow";
import RelativeDateIntervalFromNow from "../DateInterval/RelativeDateIntervalFromNow";
// style
import "./Launch.css"
import BEM from "../utils/BEM"

const b = BEM("Launch")

type Props = {
    name: string;
    window: DateIntervalType
}

const Launch: React.FC<Props> = ({name, window}) => (
    <div className={b()}>
        <span>{name}</span>
        <span><RelativeDateIntervalFromNow interval={window}/></span>
    </div>)

export default Launch;
