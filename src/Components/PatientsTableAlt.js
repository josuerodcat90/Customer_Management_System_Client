import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { Paper, CssBaseline } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { GET_PATIENTS_QUERY } from '../Utils/Queries';

const PatientsTable = () => {
	const [patients, setPatients] = useState([]);
	const { loading, data } = useQuery(GET_PATIENTS_QUERY);

	useEffect(() => {
		if (data) {
			setPatients(data.getPatients);
			console.log(data.getPatients);
		}
	}, [data]);

	const columns = [
		{
			name: '_id',
			label: 'ID',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'firstname',
			label: 'First Name',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'lastname',
			label: 'Last Name',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'birthDate',
			label: 'Birth',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'phoneNumber',
			label: 'Phone',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'email',
			label: 'Email',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'idDocument.docType',
			label: 'ID Doc',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'idDocument.docNumber',
			label: 'ID Number',
			options: {
				filter: true,
				sort: true,
			},
		},
	];

	const options = {
		filter: true,
		filterType: 'dropdown',
	};

	return (
		<>
			<Paper style={{ maxWidth: '100%', margin: '15px' }} elevation={3} square>
				<CssBaseline />
				<MUIDataTable title={'Patients List'} data={patients} columns={columns} options={options} />
			</Paper>
		</>
	);
};

export default PatientsTable;
