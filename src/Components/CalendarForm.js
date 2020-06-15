import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, makeStyles, InputAdornment } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Title, Person, Phone } from '@material-ui/icons';

import { useQuery } from '@apollo/react-hooks';

import { useForm } from '../Utils/Hooks';
import { GET_SHORT_PATIENTS_QUERY } from '../Utils/Queries';

const useStyles = makeStyles((theme) => ({
	loginIcons: {
		color: theme.palette.common.white,
	},
	alert: {
		marginBottom: '5px',
	},
	errors: {
		padding: theme.spacing(3),
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	fields: {
		margin: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		color: theme.palette.primary.contrastText,
	},
}));

const CalendarForm = ({ event, action }) => {
	const classes = useStyles();
	const [patients, setPatients] = useState([]);
	const { data, loading } = useQuery(GET_SHORT_PATIENTS_QUERY);

	useEffect(() => {
		if (data) {
			setPatients(data.getPatients);
			console.log(data.getPatients);
		}
	}, [data]);

	const { handleChange, handleSubmit, values } = useForm(newEventCallback, {
		title: action === 'new' ? '' : event.title,
		patient: action === 'new' ? '' : event.extendedProps.patient,
		description: action === 'new' ? '' : event.extendedProps.description,
	});

	function newEventCallback() {
		console.log('New Event');
	}

	return (
		<>
			<form noValidate onSubmit={handleSubmit}>
				<Grid container spacing={1} alignItems='flex-end'>
					<Grid item xs={1}>
						<Title className={classes.loginIcons} />
					</Grid>
					<Grid item xs={11}>
						<TextField
							className={classes.fields}
							autoComplete='title'
							name='title'
							required
							fullWidth
							id='title'
							label='Title'
							autoFocus
							onChange={handleChange}
							defaultValue={values.title}
							// onFocus={resetErrors}
							// error={errors.firstname ? true : false}
							// onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={1}>
						<Person className={classes.loginIcons} />
					</Grid>
					<Grid item xs={5}>
						<Autocomplete
							id='auto-complete'
							options={patients.map((option) => option.firstname + ' ' + option.lastname)}
							autoComplete
							includeInputInList
							defaultValue={values.patient.firstname + ' ' + values.patient.lastname}
							renderInput={(params) => <TextField {...params} label='Patient' margin='normal' />}
						/>
					</Grid>
					<Grid item xs={1}>
						<Phone className={classes.loginIcons} />
					</Grid>
					<Grid item xs={5}>
						<Autocomplete
							id='patient-phone'
							options={patients.map((option) => option.phoneNumber)}
							autoComplete
							includeInputInList
							defaultValue={values.patient.phoneNumber}
							renderInput={(params) => <TextField {...params} label='Phone' margin='normal' />}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							className={classes.fields}
							variant='outlined'
							multiline
							rows={4}
							rowsMax={8}
							fullWidth
							id='description'
							label='Description'
							name='description'
							autoComplete='desc'
							onChange={handleChange}
							defaultValue={values.description}
							// onFocus={resetErrors}
							// error={errors.lastname ? true : false}
							// onChange={handleChange}
						/>
					</Grid>
				</Grid>
				<Button
					type='submit'
					fullWidth
					variant='contained'
					color='primary'
					className={classes.submit}
				>
					Sign Up
				</Button>
			</form>
		</>
	);
};

export default CalendarForm;
