import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Paper, CssBaseline } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { GET_PATIENTS_QUERY } from '../Utils/Queries';

const PatientsTable = () => {
	const [patients, setPatients] = useState([]);
	const { loading, data } = useQuery(GET_PATIENTS_QUERY);

	useEffect(() => {
		if (data) {
			setPatients(data.getPatients);
		}
	}, [data]);

	return (
		<>
			<Paper style={{ maxWidth: '100%', margin: '15px' }} elevation={3} square>
				<CssBaseline />
				<MaterialTable
					title='Patients Table'
					options={{
						padding: 'default',
						grouping: true,
					}}
					isLoading={loading}
					columns={[
						{ title: 'First Name', field: 'firstname' },
						{ title: 'Last Name', field: 'lastname' },
						{ title: 'Birth', field: 'birthDate', type: 'date' },
						{ title: 'Phone', field: 'phoneNumber' },
						{ title: 'Email', field: 'email' },
						{ title: 'ID Type', field: 'idDocument.docType' },
						{ title: 'ID Number', field: 'idDocument.docNumber' },
						{ title: 'Added At', field: 'createdAt', type: 'datetime' },
						{ title: 'Updated At', field: 'updatedAt', type: 'datetime' },
						{ title: 'Status', field: 'status' },
					]}
					data={patients}
					editable={{
						onRowAdd: (newData) =>
							new Promise((resolve) => {
								setTimeout(() => {
									resolve();
									setPatients((prevState) => {
										const data = [...prevState.data];
										data.push(newData);
										return { ...prevState, data };
									});
								}, 600);
							}),
						onRowUpdate: (newData, oldData) =>
							new Promise((resolve) => {
								setTimeout(() => {
									resolve();
									if (oldData) {
										setPatients((prevState) => {
											const data = [...prevState.data];
											data[data.indexOf(oldData)] = newData;
											return { ...prevState, data };
										});
									}
								}, 600);
							}),
						onRowDelete: (oldData) =>
							new Promise((resolve) => {
								setTimeout(() => {
									resolve();
									setPatients((prevState) => {
										const data = [...prevState.data];
										data.splice(data.indexOf(oldData), 1);
										return { ...prevState, data };
									});
								}, 600);
							}),
					}}
				/>
			</Paper>
		</>
	);
};

export default PatientsTable;
