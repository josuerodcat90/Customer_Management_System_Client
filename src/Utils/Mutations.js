import gql from 'graphql-tag';

export const LOGIN_USER_MUTATION = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			_id
			firstname
			lastname
			userIcon
			range
			bachTitle
			token
		}
	}
`;

export const CREATE_USER_MUTATION = gql`
	mutation createUser(
		$firstname: String!
		$lastname: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		createUser(
			input: {
				firstname: $firstname
				lastname: $lastname
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			_id
			firstname
			lastname
			userIcon
			range
			bachTitle
			token
		}
	}
`;
