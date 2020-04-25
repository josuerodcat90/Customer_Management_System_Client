import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
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
	AccountCircle,
	Close,
	Home,
	CalendarToday,
	AccountBox,
	PersonAdd,
	People,
	Brightness7,
	Brightness4,
} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import UserThemeProvider from './UserThemeProvider';
import { CirclePicker } from 'react-color';

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexGrow: 1,
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
	const pathname = window.location.pathname;
	const path = pathname === '/' ? 'home' : pathname.substr(1);
	const [open, setOpen] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const [selectedItem, setSelectedItem] = useState(path);
	const [anchorEl, setAnchorEl] = useState(null);
	const [sysTheme, setSysTheme] = useState(true);
	const [sysColor, setSysColor] = useState('#008B02');
	const openMenu = Boolean(anchorEl);

	const handleColorChange = (color, event) => {
		setSysColor(color.hex);
	};

	const handleSwithcChange = () => {
		setSysTheme(!sysTheme);
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
						<Tooltip title='Theme & color'>
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
							titleStyle={{ textAlign: 'center' }}
						>
							<DialogTitle id='customized-dialog-title' onClose={handleDialogClose}>
								Configuraciones de tema y color
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
											colors={[
												'#008B02',
												'#f44336',
												'#e91e63',
												'#9c27b0',
												'#673ab7',
												'#3f51b5',
												'#2196f3',
												'#03a9f4',
												'#00bcd4',
												'#009688',
												'#4caf50',
												'#8bc34a',
												'#cddc39',
												'#ffeb3b',
												'#ffc107',
											]}
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
												label={`Modo ${sysTheme ? 'Oscuro' : 'Claro'}`}
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
								<AccountCircle />
							</IconButton>
						</Tooltip>
						<Menu
							id='menu-appbar'
							anchorEl={anchorEl}
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
							<MenuItem onClick={handleClose}>My account</MenuItem>
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
		</UserThemeProvider>
	);
};

export default MenuBar;
