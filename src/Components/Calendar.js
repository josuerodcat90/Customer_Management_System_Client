import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
	Paper,
	Grid,
	Button,
	Container,
	CssBaseline,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	makeStyles,
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

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
		backgroundImage:
			'url(https://source.unsplash.com/featured/?developer,code,software,web,javascript)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	loginIcons: {
		color: theme.palette.common.white,
	},
	mainContainer: {
		paddingTop: theme.spacing(9),
	},
	paper: {
		display: 'flex',
		padding: '15px',
		flexDirection: 'column',
		alignItems: 'center',
	},
	show: {
		cursor: 'pointer',
	},
	copyright: {
		padding: '15px',
	},
	alert: {
		marginBottom: '5px',
	},
	errors: {
		padding: theme.spacing(3),
	},
	hidden: {
		display: 'none',
	},
	login: {
		display: 'flex',
		flexDirection: 'row',
		alignContent: 'center',
	},
	links: {
		textDecoration: 'none',
		color: theme.palette.common.white,
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		color: theme.palette.primary.contrastText,
	},
}));

const Calendar = () => {
	const classes = useStyles();
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
						<Dialog open={openForm} onClose={handleClose} aria-labelledby='form-dialog-title'>
							<DialogTitle id='form-title'>
								{formAction === 'new' ? 'Add new Appointment' : 'Edit Appointment'}
							</DialogTitle>
							<DialogContent>
								<Grid container className={classes.root}>
									<Grid item xs={false} sm={false} md={3}></Grid>
									<Grid item xs={12} sm={12} md={6}>
										<Container maxWidth='xs' component={Paper} elevation={6}>
											<CssBaseline />
											<CalendarForm data={eventData} action={formAction} />
										</Container>
									</Grid>
									<Grid item xs={false} sm={false} md={3}></Grid>
								</Grid>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose} color='primary'>
									Cancel
								</Button>
								<Button onClick={handleClose} color='primary'>
									Save
								</Button>
							</DialogActions>
						</Dialog>
					</>
				)}
			</Paper>
		</>
	);
};

export default Calendar;
