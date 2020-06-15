import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
	Paper,
	Container,
	CssBaseline,
	Dialog,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
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
import CalendarForm from './CalendarForm';

const Calendar = () => {
	const [appointments, setAppointments] = useState([]);
	const [calendarWeekends, setWeekends] = useState(true);
	const [openForm, setOpenForm] = useState(false);
	const [formAction, setFormAction] = useState('');
	const [eventData, setEventData] = useState({});

	const { loading, data } = useQuery(GET_APPOINTMENTS_QUERY);

	useEffect(() => {
		if (data) {
			setAppointments(data.getAppointments);
		}
	}, [data]);

	const handleDateClick = async (arg) => {
		await setFormAction('new');
		await setEventData(arg.dateStr);
		await setOpenForm(!openForm);
	};

	const handleEventClick = async (info) => {
		await setFormAction('edit');
		await setEventData(info.event);
		await setOpenForm(!openForm);
	};

	const handleClose = () => {
		setOpenForm(!openForm);
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
					<>
						<FullCalendar
							defaultView='dayGridMonth'
							customButtons={{
								custom1: {
									text: 'Weekends',
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
						<Dialog
							open={openForm}
							onClose={handleClose}
							aria-labelledby='form-dialog-title'
							maxWidth='sm'
						>
							<DialogTitle id='form-title'>
								{formAction === 'new' ? 'Add new Appointment' : 'Edit Appointment'}
							</DialogTitle>
							<DialogContent>
								<Container
									maxWidth='sm'
									component={Paper}
									elevation={4}
									style={{ marginBottom: '15px' }}
								>
									<CssBaseline />
									<CalendarForm event={eventData} action={formAction} />
								</Container>
							</DialogContent>
						</Dialog>
					</>
				)}
			</Paper>
		</>
	);
};

export default Calendar;
