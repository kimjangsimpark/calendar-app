import { useEffect } from "react";

interface PropTypes {
    width: number;
    height: number;
}

const Calendar = ({width, height}: PropTypes) => {
    useEffect(() => {
        require('kjsp-calendar-core');
    }, [])

    const calendarWrapperStyle = {
        width: `${width}px`,
        height: `${height}px`
    }

    return (
        <div style={calendarWrapperStyle}>
            <kjsp-index />
        </div>
    )
}

export default Calendar;