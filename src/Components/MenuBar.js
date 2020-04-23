import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
	Drawer,
	AppBar,
	Toolbar,
	List,
	CssBaseline,
	Typography,
	Divider,
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';
import {
	Menu,
	ChevronLeft,
	Home,
	CalendarToday,
	AccountBox,
	PersonAdd,
	People,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
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
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
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

const MenuBar = ({ children }) => {
	const classes = useStyles();
	// const theme = useTheme();
	const [open, setOpen] = useState(false);
	const pathname = window.location.pathname;
	const path = pathname === '/' ? 'home' : pathname.substr(1);
	const [selectedItem, setSelectedItem] = useState(path);

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
						<Menu />
					</IconButton>
					<Typography variant='body1' noWrap>
						Customer Management System
					</Typography>
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
						key={'Login'}
						component={Link}
						to='/login'
						selected={selectedItem === 'login'}
						onClick={(event) => handleListItemClick(event, 'login')}
					>
						<ListItemIcon>
							<AccountBox />
						</ListItemIcon>
						<ListItemText primary={'Login'} />
					</ListItem>
					<ListItem
						button
						key={'Register'}
						component={Link}
						to='/register'
						selected={selectedItem === 'register'}
						onClick={(event) => handleListItemClick(event, 'register')}
					>
						<ListItemIcon>
							<PersonAdd />
						</ListItemIcon>
						<ListItemText primary={'Register'} />
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
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{children}
			</main>
		</div>
	);
};

export default MenuBar;
