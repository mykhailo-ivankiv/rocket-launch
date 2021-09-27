import React from 'react';

type Props = {
    date: Date
}

const Time: React.FC<Props> = ({date}) => <time dateTime={date.toISOString()}>
    {date.toISOString()}
</time>

export default Time
