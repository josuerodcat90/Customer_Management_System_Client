import { createMuiTheme } from '@material-ui/core/styles';

export const systemTheme = ({ userTheme, userColor }) => {
	const theme = createMuiTheme({
		palette: {
			common: {
				black: '#000000',
				white: '#FFFFFF',
			},
			type: userTheme ? 'dark' : 'light',
			primary: {
				main: userColor,
			},
		},
	});

	return theme;
};
