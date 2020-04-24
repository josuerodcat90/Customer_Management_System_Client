import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';

const UserThemeProvider = ({ children, userColor, userTheme }) => {
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

	return (
		<>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</>
	);
};

export default UserThemeProvider;
