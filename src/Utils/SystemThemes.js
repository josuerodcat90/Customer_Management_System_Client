import { createMuiTheme } from '@material-ui/core/styles';

export const darkTheme = createMuiTheme({
	palette: {
		common: {
			black: '#000000',
			white: '#FFFFFF',
		},
		type: 'dark',
		primary: {
			main: '#606060',
		},
	},
});

export const lightTheme = createMuiTheme({
	palette: {
		common: {
			black: '#000000',
			white: '#FFFFFF',
		},
		type: 'light',
		primary: {
			main: '#D60093',
			contrastText: '#fafafa',
		},
		secondary: {
			main: '#FF4081',
			contrastText: '#fafafa',
		},
	},
});
