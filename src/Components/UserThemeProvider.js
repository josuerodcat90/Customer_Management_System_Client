import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';

const UserThemeProvider = ({ children, userColor, userTheme }) => {
	const systemTheme = () => {
		if (userTheme) {
			const theme = createMuiTheme({
				palette: {
					common: {
						black: '#000000',
						white: '#FFFFFF',
					},
					type: 'dark',
					primary: {
						main: userColor,
					},
				},
			});

			return theme;
		}
		if (!userTheme) {
			const theme = createMuiTheme({
				palette: {
					common: {
						black: '#000000',
						white: '#FFFFFF',
					},
					type: 'light',
					primary: {
						main: userColor,
						contrastText: '#fafafa',
					},
					secondary: {
						main: '#FF4081',
						contrastText: '#fafafa',
					},
				},
			});

			return theme;
		}
	};

	return (
		<>
			<ThemeProvider theme={systemTheme()}>{children}</ThemeProvider>
		</>
	);
};

export default UserThemeProvider;
