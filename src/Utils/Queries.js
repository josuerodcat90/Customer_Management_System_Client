import gql from 'graphql-tag';

export const GET_APPOINTMENTS_QUERY = gql`
	query {
		getAppointments {
			id
			className
			description
			editable
			end
			start
			title
			allDay
		}
	}
`;

export const GET_PATIENTS_QUERY = gql`
	query {
		getPatients {
			_id
			firstname
			lastname
			birthDate
			phoneNumber
			email
			idDocument {
				docType
				docNumber
			}
			address {
				city
				township
				street
				apartment
				zipcode
			}
			allergies
			records {
				title
				description
			}
			referedBy {
				firstname
				lastname
			}
			status
			createdAt
			updatedAt
		}
	}
`;
