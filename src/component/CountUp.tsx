import React from 'react';

interface CountUpProps {
    count: number,
    totalWords: number,
}
function CountUp({ count, totalWords }: CountUpProps) {

    return (
        <div className='count-up'>
            {count + 1} /&nbsp;
            {totalWords}
        </div>
    );
}
export default CountUp;