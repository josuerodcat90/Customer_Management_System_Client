import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER_MUTATION } from '../Utils/Mutations';

import { AuthContext } from '../Context/Auth';
import { useForm } from '../Utils/Hooks';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	errors: {
		padding: theme.spacing(3),
	},
	hidden: {
		display: 'none',
	},
	links: {
		textDecoration: 'none',
		color: theme.palette.primary.main,
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

const Register = (props) => {
	const classes = useStyles();
	const context = useContext(AuthContext);
	const [open, setOpen] = useState(false);
	const [errors, setErrors] = useState({});

	const { handleChange, handleSubmit, values } = useForm(registerUser, {
		firstname: '',
		lastname: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [addUser] = useMutation(CREATE_USER_MUTATION, {
		update(_, { data: { createUser: userData } }) {
			context.login(userData);
			props.history.push('/');

			const { email } = userData;

			store.addNotification({
				title: `Your Email ${email} is registered succesfully!`,
				message: "And now, you're online",
				type: 'info',
				insert: 'top',
				showIcon: true,
				container: 'top-center',
				animationIn: ['animated', 'slideInDown'],
				animationOut: ['animated', 'slideOutUp'],
				dismiss: {
					duration: 4000,
					onScreen: true,
					pauseOnHover: true,
				},
			});
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values,
	});

	function registerUser() {
		addUser();
		setErrors({});
		setOpen(!open);
	}

	const resetErrors = () => {
		setErrors({});
		setOpen(false);
	};

	const Copyright = () => {
		return (
			<Typography variant='body2' color='textSecondary' align='center'>
				{'Copyright © '}
				<a
					className={classes.links}
					href='https://github.com/josuerodcat90'
					target='_blank'
					rel='noopener noreferrer'
				>
					Josue Rodriguez
				</a>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		);
	};

	return (
		<>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign up
					</Typography>
					<form className={classes.form} noValidate onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete='fname'
									name='firstname'
									variant='outlined'
									required
									fullWidth
									id='firstName'
									label='First Name'
									autoFocus
									onFocus={resetErrors}
									error={errors.firstname ? true : false}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant='outlined'
									required
									fullWidth
									id='lastName'
									label='Last Name'
									name='lastname'
									autoComplete='lname'
									onFocus={resetErrors}
									error={errors.lastname ? true : false}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant='outlined'
									required
									fullWidth
									id='email'
									label='Email Address'
									name='email'
									autoComplete='email'
									onFocus={resetErrors}
									error={errors.email ? true : false}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant='outlined'
									required
									fullWidth
									name='password'
									label='Password'
									type='password'
									id='password'
									autoComplete='current-password'
									onFocus={resetErrors}
									error={errors.password ? true : false}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant='outlined'
									required
									fullWidth
									name='confirmPassword'
									label='Confirm Password'
									type='password'
									id='confirm-password'
									autoComplete='current-password'
									onFocus={resetErrors}
									error={errors.confirmPassword ? true : false}
									onChange={handleChange}
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
						<div className={classes.hidden}>
							{Object.keys(errors).length > 0 &&
								Object.values(errors).map((value) => {
									return store.addNotification({
										title: 'Error',
										message: value,
										type: 'danger',
										insert: 'bottom',
										container: 'top-right',
										animationIn: ['animated', 'slideInDown'],
										animationOut: ['animated', 'slideOutRight'],
										dismiss: {
											duration: 5000,
											onScreen: false,
											showIcon: true,
										},
									});
								})}
						</div>
						{Object.values(errors).length < 1 && (
							<Backdrop
								className={classes.backdrop}
								open={open}
								onClick={() => {
									setOpen(!open);
								}}
							>
								<CircularProgress color='inherit' />
							</Backdrop>
						)}
						<Grid container justify='flex-end'>
							<Grid item>
								<Typography className={classes.links} component={Link} to='/login' variant='body2'>
									Already have an account? Sign in
								</Typography>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={5}>
					<Copyright />
				</Box>
			</Container>
		</>
	);
};

export default Register;
