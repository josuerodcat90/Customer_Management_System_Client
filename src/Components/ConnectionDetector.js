import React, { useState } from 'react';
import { Detector } from 'react-detect-offline';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	Typography,
	Button,
	LinearProgress,
} from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';

const ConnectionDetector = (props) => {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(!open);
	};

	return (
		<>
			<Detector
				onChange={({ online }) => {
					if (!online) {
						setOpen(true);
					}
				}}
				polling={{
					interval: 500,
				}}
				render={({ online }) => {
					return (
						<Dialog open={open} fullWidth={true} maxWidth='sm'>
							<DialogTitle>
								{online ? <Check color='action' /> : <Close color='error' />}
								{online ? ` Connection Restored` : ` Connection Error`}
							</DialogTitle>
							<DialogContent>
								<Typography>
									{online
										? `Your connection to the server has been restored, you can continue using the app.`
										: `Connection to the server was interrupted, trying to  get back online...`}
								</Typography>
								{!online && (
									<LinearProgress
										style={{ marginTop: '15px', paddingTop: '5px' }}
										variant='indeterminate'
									/>
								)}
							</DialogContent>
							<DialogActions>
								<Button disabled={!online ? true : false} onClick={handleClose}>
									OK
								</Button>
							</DialogActions>
						</Dialog>
					);
				}}
			/>
		</>
	);
};

export default ConnectionDetector;
