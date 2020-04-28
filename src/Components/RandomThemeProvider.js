import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import { systemColors } from '../Utils/SystemColors';

const RandomThemeProvider = ({ children }) => {
	const randomColor = systemColors[~~(Math.random() * systemColors.length)];

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
