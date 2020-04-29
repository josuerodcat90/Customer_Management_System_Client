import React, { useState, useContext, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
	Avatar,
	Badge,
	Drawer,
	Menu,
	Grid,
	MenuItem,
	AppBar,
	Toolbar,
	Tooltip,
	List,
	Switch,
	FormGroup,
	FormControlLabel,
	CssBaseline,
	Typography,
	Divider,
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemText,
	Dialog,
	DialogTitle,
	DialogContent,
} from '@material-ui/core';
import {
	ChevronLeft,
	Close,
	Home,
	CalendarToday,
	AccountCircle,
	People,
	Brightness7,
	Brightness4,
} from '@material-ui/icons';
import { AuthContext } from '../Context/Auth';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { systemColors } from '../Utils/SystemColors';
import UserThemeProvider from './UserThemeProvider';
import RandomThemeProvider from './RandomThemeProvider';
import { CirclePicker } from 'react-color';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import { CHANGE_USER_COLOR_MUTATION, CHANGE_USER_THEME_MUTATION } from '../Utils/Mutations';

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexGrow: 1,
	},
	dialogtitle: {
		textAlign: 'center',
	},
	hidden: {
		display: 'none',
	},
	avatar: {
		color: theme.palette.common.black,
		backgroundColor: theme.palette.common.white,
	},
	title: {
		flexGrow: 1,
	},
	colorContent: {
		padding: '35px',
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		fontSize: theme.typography.fontSize,
		[theme.breakpoints.up('sm')]: {
			fontSize: '25px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '16px',
		},
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	menu: {
		marginTop: theme.spacing(7),
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		// [theme.breakpoints.up('sm')]: {
		// 	width: theme.spacing(9) + 1,
		// },
		// [theme.breakpoints.down('sm')]: {
		// 	width: 'auto',
		// 	display: 'none',
		// },
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));

const StyledBadge = withStyles((theme) => ({
	badge: {
		backgroundColor: '#44b700',
		color: '#44b700',
		boxShadow: `0 0 0 1px ${theme.palette.common.black}`,
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			animation: '$ripple 1.2s infinite ease-in-out',
			border: '1px solid currentColor',
			content: '""',
		},
	},
	'@keyframes ripple': {
		'0%': {
			transform: 'scale(.8)',
			opacity: 1,
		},
		'100%': {
			transform: 'scale(2.4)',
			opacity: 0,
		},
	},
}))(Badge);

const MenuBar = ({ children }) => {
	const classes = useStyles();
	const context = useContext(AuthContext);
	const { user, logout } = useContext(AuthContext);
	const [sysTheme, setSysTheme] = useState(false);
	const [sysColor, setSysColor] = useState('');
	const [errors, setErrors] = useState({});
	const pathname = window.location.pathname;
	const path = pathname === '/' ? 'home' : pathname.substr(1);
	const [open, setOpen] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const [selectedItem, setSelectedItem] = useState(path);
	const [anchorEl, setAnchorEl] = useState(null);
	const openMenu = Boolean(anchorEl);

	useEffect(() => {
		if (user) {
			const { userColor, userTheme } = user;

			setSysColor(userColor);
			setSysTheme(userTheme);
		}
	}, [user]);

	const [changeSysColor] = useMutation(CHANGE_USER_COLOR_MUTATION, {
		update(_, { data: { changeSysColor: userData } }) {
			context.login(userData);
			const notiID =
				Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

			store.addNotification({
				id: notiID,
				title: 'System Color',
				message: 'System Color changed',
				type: 'info',
				insert: 'bottom',
				showIcon: true,
				container: 'bottom-right',
				animationIn: ['animated', 'slideInUp'],
				animationOut: ['animated', 'slideOutDown'],
				dismiss: {
					duration: 2000,
					onScreen: true,
					pauseOnHover: false,
					showIcon: true,
				},
			});
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: {
			userId: user ? user._id : '',
			userColor: sysColor,
		},
	});

	const [changeSysTheme] = useMutation(CHANGE_USER_THEME_MUTATION, {
		update(_, { data: { changeSysTheme: userData } }) {
			context.login(userData);
			const { userTheme } = userData;
			const message = <strong>{`Dark mode ${userTheme ? 'ON' : 'OFF'}`}</strong>;
			const notiID =
				Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

			store.addNotification({
				id: notiID,
				title: 'Dark Mode',
				message: message,
				type: 'info',
				insert: 'bottom',
				showIcon: true,
				container: 'bottom-right',
				animationIn: ['animated', 'slideInUp'],
				animationOut: ['animated', 'slideOutDown'],
				dismiss: {
					duration: 2000,
					onScreen: true,
					pauseOnHover: false,
					showIcon: true,
				},
			});
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: {
			userId: user ? user._id : '',
			userTheme: sysTheme,
		},
	});

	const handleColorChange = async (color, event) => {
		await setSysColor(color.hex);
		changeSysColor();
	};

	const handleSwithcChange = async () => {
		await setSysTheme(!sysTheme);
		changeSysTheme();
	};

	const handleDialogOpen = () => {
		setOpenDialog(true);
	};

	const handleDialogClose = () => {
		setOpenDialog(false);
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		handleClose();
		logout();
	};

	const handleListItemClick = (event, index) => {
		setSelectedItem(index);
		setOpen(false);
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<>
			{user ? (
				<UserThemeProvider userTheme={sysTheme} userColor={sysColor}>
					<div className={classes.root}>
						<CssBaseline />
						<AppBar
							position='fixed'
							className={clsx(classes.appBar, {
								[classes.appBarShift]: open,
							})}
						>
							<Toolbar>
								<IconButton
									color='inherit'
									aria-label='open drawer'
									onClick={handleDrawerOpen}
									edge='start'
									className={clsx(classes.menuButton, {
										[classes.hide]: open,
									})}
								>
									<MenuIcon />
								</IconButton>
								<Typography variant='h6' noWrap className={classes.title}>
									Customer Management System
								</Typography>
								<Tooltip title='Color & Theme'>
									<IconButton
										edge='start'
										color='inherit'
										aria-label='open drawer'
										onClick={handleDialogOpen}
									>
										{sysTheme ? <Brightness4 /> : <Brightness7 />}
									</IconButton>
								</Tooltip>
								<Dialog
									onClose={handleDialogClose}
									aria-labelledby='customized-dialog-title'
									open={openDialog}
									fullWidth={true}
									maxWidth='sm'
								>
									<DialogTitle
										id='customized-dialog-title'
										className={classes.dialogtitle}
										onClose={handleDialogClose}
									>
										Color and Theme Settings
										<IconButton
											aria-label='close'
											className={classes.closeButton}
											onClick={handleDialogClose}
										>
											<Close />
										</IconButton>
									</DialogTitle>
									<DialogContent dividers>
										<Grid
											container
											spacing={3}
											direction='row'
											alignItems='center'
											justify='center'
											className={classes.colorContent}
										>
											<Grid item container xs={8}>
												<CirclePicker
													circleSize={30}
													color={sysColor}
													colors={systemColors}
													onChange={handleColorChange}
												/>
											</Grid>
											<Grid item container xs={4}>
												<FormGroup aria-label='position' row>
													<FormControlLabel
														value='bottom'
														control={
															<Switch
																checked={sysTheme}
																onChange={handleSwithcChange}
																color='primary'
															/>
														}
														label={`${sysTheme ? 'Dark' : 'Light'} Mode`}
														labelPlacement='top'
													/>
												</FormGroup>
											</Grid>
										</Grid>
									</DialogContent>
								</Dialog>
								<Tooltip title='Profile'>
									<IconButton
										aria-label='account of current user'
										aria-controls='menu-appbar'
										aria-haspopup='true'
										onClick={handleMenu}
										color='inherit'
									>
										<StyledBadge
											overlap='circle'
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'right',
											}}
											variant='dot'
										>
											{user ? (
												<Avatar className={classes.avatar}>{`${
													user.firstname.charAt(0) + user.lastname.charAt(0)
												}`}</Avatar>
											) : (
												<AccountCircle />
											)}
										</StyledBadge>
									</IconButton>
								</Tooltip>
								<Menu
									id='menu-appbar'
									anchorEl={anchorEl}
									className={classes.menu}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={openMenu}
									onClose={handleClose}
								>
									<MenuItem onClick={handleClose}>Profile</MenuItem>
									<MenuItem onClick={handleLogout}>Logout</MenuItem>
								</Menu>
							</Toolbar>
						</AppBar>
						<Drawer
							variant='permanent'
							className={clsx(classes.drawer, {
								[classes.drawerOpen]: open,
								[classes.drawerClose]: !open,
							})}
							onMouseEnter={handleDrawerOpen}
							onMouseLeave={handleDrawerClose}
							classes={{
								paper: clsx({
									[classes.drawerOpen]: open,
									[classes.drawerClose]: !open,
								}),
							}}
						>
							<div className={classes.toolbar}>
								<IconButton onClick={handleDrawerClose}>
									<ChevronLeft />
								</IconButton>
							</div>
							<Divider />
							<List>
								<ListItem
									button
									key={'Home'}
									component={Link}
									to='/'
									selected={selectedItem === 'home'}
									onClick={(event) => handleListItemClick(event, 'home')}
								>
									<ListItemIcon>
										<Home />
									</ListItemIcon>
									<ListItemText primary={'Home'} />
								</ListItem>
								<ListItem
									button
									key={'Calendar'}
									component={Link}
									to='/calendar'
									selected={selectedItem === 'calendar'}
									onClick={(event) => handleListItemClick(event, 'calendar')}
								>
									<ListItemIcon>
										<CalendarToday />
									</ListItemIcon>
									<ListItemText primary={'Calendar'} />
								</ListItem>
								<ListItem
									button
									key={'Patients'}
									component={Link}
									to='/patients'
									selected={selectedItem === 'patients'}
									onClick={(event) => handleListItemClick(event, 'patients')}
								>
									<ListItemIcon>
										<People />
									</ListItemIcon>
									<ListItemText primary={'Patients'} />
								</ListItem>
							</List>
						</Drawer>
						<div className={classes.hidden}>
							{Object.keys(errors).length > 0 &&
								Object.values(errors).map((value) => {
									return store.addNotification({
										title: 'Error',
										message: value,
										type: 'danger',
										insert: 'bottom',
										container: 'bottom-right',
										animationIn: ['animated', 'slideInRight'],
										animationOut: ['animated', 'slideOutDown'],
										dismiss: {
											duration: 5000,
											onScreen: false,
											showIcon: true,
										},
									});
								})}
						</div>
						<main className={classes.content}>
							<div className={classes.toolbar} />
							{children}
						</main>
					</div>
				</UserThemeProvider>
			) : (
				<RandomThemeProvider>{children}</RandomThemeProvider>
			)}
		</>
	);
};

export default MenuBar;
