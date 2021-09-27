import {DateIntervalType} from "../utils/commonTypes";
import RelativeDateFromNow from "../RelativeDateFromNow/RelativeDateFromNow";
// Styles
import "./RelativeDateIntervalFromNow.css"
import BEM from "../utils/BEM";

const b = BEM("RelativeDateIntervalFromNow")

type Props = {
    interval: DateIntervalType
}
const RelativeDateIntervalFromNow: React.FC<Props> = ({interval}) => <>
    <span className={b()}>
        <span className={b("time")}><RelativeDateFromNow date={interval.start}/></span>
        &nbsp;—&nbsp;
        <span className={b("time")}><RelativeDateFromNow date={interval.end}/></span>
    </span>
</>

export default RelativeDateIntervalFromNow
