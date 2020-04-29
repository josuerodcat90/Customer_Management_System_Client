import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import { randomColors } from '../Utils/SystemColors';

const RandomThemeProvider = ({ children }) => {
	const randomColor = randomColors[~~(Math.random() * randomColors.length)];

	const theme = createMuiTheme({
		palette: {
			common: {
				black: '#000000',
				white: '#FFFFFF',
			},
			type: 'dark',
			primary: {
				main: randomColor,
			},
		},
	});

	return (
		<>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</>
	);
};

export default RandomThemeProvider;
