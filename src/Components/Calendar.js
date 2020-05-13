import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Paper, CssBaseline } from '@material-ui/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import momentPlugin from '@fullcalendar/moment';
import 'moment/locale/es-us';

///Styles for fullcalendar Plugins
import '@fullcalendar/core/main.min.css';
import '@fullcalendar/daygrid/main.min.css';
import '@fullcalendar/timegrid/main.min.css';

import { GET_APPOINTMENTS_QUERY } from '../Utils/Queries';
import CalendarPlaceholder from '../Placeholders/CalendarPlaceholder';

const Calendar = () => {
	const [appointments, setAppointments] = useState([]);
	const [calendarWeekends, setWeekends] = useState(true);
	const { loading, data } = useQuery(GET_APPOINTMENTS_QUERY);

	useEffect(() => {
		if (data) {
			setAppointments(data.getAppointments);
		}
	}, [data]);

	const handleDateClick = (arg) => {
		alert(arg.dateStr);
	};

	const handleEventClick = (info) => {
		info.jsEvent.preventDefault();
		const evento = info.event;
		alert('Event: ' + evento.title);
		alert('Description: ' + evento.extendedProps.description);
		alert(
			'Patient: ' +
				evento.extendedProps.patient.firstname +
				' ' +
				evento.extendedProps.patient.lastname
		);
		alert(
			'Doctor: ' +
				evento.extendedProps.doctor.firstname +
				' ' +
				evento.extendedProps.doctor.lastname
		);
		alert('Start: ' + evento.start);
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
						}}
						locale='es-us'
						header={{
							left: 'prev,next custom1 today',
							center: 'title',
							right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
						}}
						businessHours={{
							daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
							startTime: '08:00',
							endTime: '18:00',
						}}
						plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, momentPlugin, listPlugin]}
						weekends={calendarWeekends}
						dateClick={handleDateClick}
						eventClick={handleEventClick}
						events={appointments}
						firstDay={1}
						eventLimit={true}
						navLinks={true}
						nowIndicator={true}
						weekNumbers={true}
					/>
				)}
			</Paper>
		</>
	);
};

export default Calendar;
