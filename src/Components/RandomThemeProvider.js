import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';

const RandomThemeProvider = ({ children }) => {
	const colors = [
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
	];
	const themes = ['light', 'dark'];

	const randomTheme = themes[~~(Math.random() * themes.length)];
	const randomColor = colors[~~(Math.random() * colors.length)];

	const theme = createMuiTheme({
		palette: {
			common: {
				black: '#000000',
				white: '#FFFFFF',
			},
			type: randomTheme,
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
