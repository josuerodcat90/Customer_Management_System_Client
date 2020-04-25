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
