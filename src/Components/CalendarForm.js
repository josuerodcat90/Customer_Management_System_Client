import React from 'react';
import { Button, Grid, TextField, makeStyles } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import { useForm } from '../Utils/Hooks';

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

const CalendarForm = ({ data, action }) => {
	const classes = useStyles();

	const { handleChange, handleSubmit, values } = useForm(newEventCallback, {
		title: action === 'new' ? '' : data.title,
		description: action === 'new' ? '' : data.extendedProps.description,
	});

	function newEventCallback() {
		console.log('New Event');
	}

	return (
		<>
			<form noValidate onSubmit={handleSubmit}>
				<Grid container spacing={2} alignItems='flex-end'>
					<Grid item xs={1}>
						<AccountCircle className={classes.loginIcons} />
					</Grid>
					<Grid item xs={5}>
						<TextField
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
					<Grid item xs={6}>
						<TextField
							required
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
