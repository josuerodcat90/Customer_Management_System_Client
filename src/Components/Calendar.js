import React, { useState, createRef, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Paper, CssBaseline } from '@material-ui/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import momentPlugin from '@fullcalendar/moment';

///Styles for fullcalendar Plugins
import '@fullcalendar/core/main.min.css';
import '@fullcalendar/daygrid/main.min.css';
import '@fullcalendar/timegrid/main.min.css';

import { GET_APPOINTMENTS_QUERY } from '../Utils/Queries';
import CalendarPlaceholder from '../Placeholders/CalendarPlaceholder';

const Calendar = () => {
	const calendarComponentRef = createRef();
	const [appointments, setAppointments] = useState([]);
	const [calendarWeekends, setWeekends] = useState(true);
	const { loading, data } = useQuery(GET_APPOINTMENTS_QUERY);

	useEffect(() => {
		if (data) {
			setAppointments(data.getAppointments);
		}
	}, [data]);

	const gotoPast = () => {
		let calendarApi = calendarComponentRef.current.getApi();
		calendarApi.gotoDate('1990-04-27');
	};

	const handleDateClick = (arg) => {
		alert(arg.dateStr);
	};

	const handleEventClick = (info) => {
		alert('Event: ' + info.event.title);
		alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
		alert('ClassName: ' + info.event.className);
		alert('View: ' + info.view.type);
		info.el.style.borderColor = 'red';
	};

	const toggleWeekends = () => {
		setWeekends(!calendarWeekends);
	};

	return (
		<>
			<Paper elevation={3} square className='Calendar'>
				<CssBaseline />
				{loading ? (
					<CalendarPlaceholder />
				) : (
					<FullCalendar
						defaultView='dayGridMonth'
						customButtons={{
							custom1: {
								text: 'Toggle Weekends',
								click: toggleWeekends,
							},
							custom2: {
								text: 'Go to Date',
								click: gotoPast,
							},
						}}
						header={{
							left: 'prev,next custom1 today',
							center: 'title',
							right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek custom2',
						}}
						plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, momentPlugin]}
						ref={calendarComponentRef}
						weekends={calendarWeekends}
						dateClick={handleDateClick}
						eventClick={handleEventClick}
						events={appointments}
					/>
				)}
			</Paper>
		</>
	);
};

export default Calendar;
