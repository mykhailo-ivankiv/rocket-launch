import {formatRelative} from 'date-fns';
import * as React from 'react';

type Props = {
    baseDate: Date,
    date: Date
}

const RelativeDate: React.FC<Props> = (({baseDate, date}) => <time dateTime={date.toISOString()}>
    {formatRelative(date, baseDate)}
</time>);

export default RelativeDate;
