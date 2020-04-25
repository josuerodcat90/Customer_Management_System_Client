import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import { LOGIN_USER_MUTATION } from '../Utils/Mutations';
import { useMutation } from '@apollo/react-hooks';

import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/Auth';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import { useForm } from '../Utils/Hooks';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	errors: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	links: {
		textDecoration: 'none',
		color: theme.palette.primary.main,
	},
	image: {
		backgroundImage:
			'url(https://source.unsplash.com/featured/?developer,code,software,web,javascript)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		color: theme.palette.primary.contrastText,
	},
}));

const Login = (props) => {
	const classes = useStyles();
	const context = useContext(AuthContext);
	const [open, setOpen] = useState(false);
	const [errors, setErrors] = useState({});

	const { handleChange, handleSubmit, values } = useForm(registerUserCallback, {
		email: '',
		password: '',
	});

	const [loginUser] = useMutation(LOGIN_USER_MUTATION, {
		update(_, { data: { login: userData } }) {
			context.login(userData);
			props.history.push('/');

			const { firstname, lastname } = userData;

			store.addNotification({
				title: `Welcome ${firstname + ' ' + lastname}!`,
				message: "You're now online",
				type: 'success',
				insert: 'top',
				showIcon: true,
				container: 'bottom-right',
				animationIn: ['animated', 'slideInRight'],
				animationOut: ['animated', 'fadeOut'],
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

	function registerUserCallback() {
		loginUser();
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
			<Grid container component='main' className={classes.root}>
				<CssBaseline />
				<Grid item xs={false} sm={4} md={7} className={classes.image} />
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Sign in
						</Typography>
						<form className={classes.form} noValidate onSubmit={handleSubmit}>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								autoFocus
								onFocus={resetErrors}
								error={errors.email ? true : false}
								onChange={handleChange}
							/>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								onFocus={resetErrors}
								autoComplete='current-password'
								error={errors.password ? true : false}
								onChange={handleChange}
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
							>
								Sign In
							</Button>
							{Object.keys(errors).length > 0 && (
								<div classNamee={classes.errors}>
									{Object.values(errors).map((value) => (
										<Collapse in={true}>
											<Alert severity='error' key={value}>
												{value}
											</Alert>
										</Collapse>
									))}
								</div>
							)}
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
							<Grid container>
								<Grid item xs>
									<Typography
										className={classes.links}
										component={Link}
										to='/recover'
										color='primary'
										variant='body2'
									>
										Forgot password?
									</Typography>
								</Grid>
								<Grid item>
									<Typography
										className={classes.links}
										color='primary'
										component={Link}
										to='/register'
										variant='body2'
									>
										Don't have an account? Sign Up
									</Typography>
								</Grid>
							</Grid>
							<Box mt={5}>
								<Copyright />
							</Box>
						</form>
					</div>
				</Grid>
			</Grid>
		</>
	);
};

export default Login;
