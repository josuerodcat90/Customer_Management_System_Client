import React, { useState, useContext } from 'react';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Paper,
	Box,
	Grid,
	Backdrop,
	CircularProgress,
	Typography,
	InputAdornment,
	IconButton,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
	LockOutlined,
	AccountCircle,
	Visibility,
	VisibilityOff,
	NoEncryptionOutlined,
} from '@material-ui/icons';
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
		padding: theme.spacing(3),
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	loginIcons: {
		color: theme.palette.common.white,
	},
	alert: {
		marginBottom: '5px',
	},
	links: {
		textDecoration: 'none',
		color: theme.palette.common.white,
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
	const [showPassword, setShowPassword] = useState(false);
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
					showIcon: true,
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
		<>
			<Grid container component='main' className={classes.root}>
				<CssBaseline />
				<Grid item xs={false} sm={3} md={8} className={classes.image} />
				<Grid item xs={12} sm={9} md={4} component={Paper} elevation={6} square>
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlined />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Sign in
						</Typography>
						<form className={classes.form} noValidate onSubmit={handleSubmit}>
							<Grid container spacing={2} alignItems='flex-end'>
								<Grid item xs={1}>
									<AccountCircle className={classes.loginIcons} />
								</Grid>
								<Grid item xs={11}>
									<TextField
										margin='normal'
										required
										size='small'
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
								</Grid>
							</Grid>
							<Grid container spacing={1} alignItems='flex-end'>
								<Grid item xs={1}>
									{showPassword ? (
										<NoEncryptionOutlined className={classes.loginIcons} />
									) : (
										<LockOutlined className={classes.loginIcons} />
									)}
								</Grid>
								<Grid item xs={11}>
									<TextField
										margin='normal'
										required
										fullWidth
										name='password'
										label='Password'
										type={showPassword ? 'text' : 'password'}
										id='password'
										onFocus={resetErrors}
										autoComplete='current-password'
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
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
							>
								Sign In
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
							)}
							{Object.values(errors).length < 1 && (
								<Box mt={5}>
									<Copyright />
								</Box>
							)}
						</form>
					</div>
				</Grid>
			</Grid>
		</>
	);
};

export default Login;
