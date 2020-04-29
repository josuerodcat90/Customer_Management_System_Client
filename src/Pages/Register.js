import React, { useState, useContext } from 'react';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Grid,
	Box,
	Paper,
	Backdrop,
	CircularProgress,
	Typography,
	Container,
	InputAdornment,
	IconButton,
} from '@material-ui/core';
import {
	AccountCircle,
	AlternateEmail,
	LockOutlined,
	Visibility,
	VisibilityOff,
	NoEncryptionOutlined,
} from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER_MUTATION } from '../Utils/Mutations';

import { AuthContext } from '../Context/Auth';
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

const Register = (props) => {
	const classes = useStyles();
	const context = useContext(AuthContext);
	const [open, setOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
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
					showIcon: true,
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

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
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
		<Grid container className={classes.root}>
			<Grid item direction='column' xs={false} sm={false} md={3}></Grid>
			<Grid item direction='column' xs={12} sm={12} md={6}>
				<div className={classes.mainContainer}>
					<Container maxWidth='xs' component={Paper} elevation={6}>
						<CssBaseline />
						<div className={classes.paper}>
							<Avatar className={classes.avatar}>
								<LockOutlined />
							</Avatar>
							<Typography component='h1' variant='h5'>
								Sign up
							</Typography>
							<form className={classes.form} noValidate onSubmit={handleSubmit}>
								<Grid container spacing={2} alignItems='flex-end'>
									<Grid item xs={1}>
										<AccountCircle className={classes.loginIcons} />
									</Grid>
									<Grid item xs={5}>
										<TextField
											autoComplete='fname'
											name='firstname'
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
									<Grid item xs={6}>
										<TextField
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
								</Grid>
								<Grid container spacing={2} alignItems='flex-end'>
									<Grid item xs={1}>
										<AlternateEmail className={classes.loginIcons} />
									</Grid>
									<Grid item xs={11}>
										<TextField
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
								</Grid>
								<Grid container spacing={2} alignItems='flex-end'>
									<Grid item xs={1}>
										{showPassword ? (
											<NoEncryptionOutlined className={classes.loginIcons} />
										) : (
											<LockOutlined className={classes.loginIcons} />
										)}
									</Grid>
									<Grid item xs={11}>
										<TextField
											required
											fullWidth
											name='password'
											label='Password'
											type={showPassword ? 'text' : 'password'}
											id='password'
											autoComplete='current-password'
											onFocus={resetErrors}
											error={errors.password ? true : false}
											onChange={handleChange}
											InputProps={{
												endAdornment: (
													<InputAdornment position='end'>
														<IconButton onClick={handleShowPassword}>
															{showPassword ? <Visibility /> : <VisibilityOff />}
														</IconButton>
													</InputAdornment>
												),
											}}
										/>
									</Grid>
								</Grid>
								<Grid container spacing={2} alignItems='flex-end'>
									<Grid item xs={1}>
										{showPassword ? (
											<NoEncryptionOutlined className={classes.loginIcons} />
										) : (
											<LockOutlined className={classes.loginIcons} />
										)}
									</Grid>
									<Grid item xs={11}>
										<TextField
											required
											fullWidth
											name='confirmPassword'
											label='Confirm Password'
											type={showPassword ? 'text' : 'password'}
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
								{Object.keys(errors).length > 0 &&
									Object.values(errors).map((value) => (
										<Alert className={classes.alert} variant='filled' severity='error'>
											{value}
										</Alert>
									))}
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
								{Object.values(errors).length < 1 && (
									<Grid container justify='center'>
										<Grid item className={classes.login}>
											<Typography
												className={classes.links}
												component={Link}
												to='/login'
												variant='body2'
											>
												Already have an account? Sign in
											</Typography>
										</Grid>
									</Grid>
								)}
							</form>
						</div>
						{Object.values(errors).length < 1 && (
							<Box className={classes.copyright}>
								<Copyright />
							</Box>
						)}
					</Container>
				</div>
			</Grid>
			<Grid item direction='column' xs={false} sm={false} md={3}></Grid>
		</Grid>
	);
};

export default Register;
