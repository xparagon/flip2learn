import React from 'react';


interface StatusBarProps {
    countNo: number,
    countYes: number,
    totalWords: number,
}
function StatusBar({ countNo, countYes, totalWords }: StatusBarProps) {

    const barNo = {
        width: (countNo / totalWords) * 100 + '%'
    }
    const barUnknown = {
        width: ((totalWords - countNo - countYes) / totalWords) * 100 + '%'
    }
    const barYes = {
        width: (countYes / totalWords) * 100 + '%'
    }

    return (
        <div className='status-bar'>
            <div style={{ display: 'flex' }}>
                <div className='bar isNo' style={barNo}></div>
                <div className='bar isUnknown' style={barUnknown}></div>
                <div className='bar isYes' style={barYes}></div>
            </div >
        </div>
    );
}
export default StatusBar;

StatusBar

