import gql from 'graphql-tag';

export const LOGIN_USER_MUTATION = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			_id
			firstname
			lastname
			userIcon
			userColor
			userTheme
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
			userColor
			userTheme
			range
			bachTitle
			token
		}
	}
`;

export const CHANGE_USER_COLOR_MUTATION = gql`
	mutation changeSysColor($userId: ID!, $userColor: String!) {
		changeSysColor(userId: $userId, input: { userColor: $userColor }) {
			_id
			firstname
			lastname
			userIcon
			userColor
			userTheme
			range
			bachTitle
			token
		}
	}
`;

export const CHANGE_USER_THEME_MUTATION = gql`
	mutation changeSysTheme($userId: ID!, $userTheme: Boolean!) {
		changeSysTheme(userId: $userId, input: { userTheme: $userTheme }) {
			_id
			firstname
			lastname
			userIcon
			userColor
			userTheme
			range
			bachTitle
			token
		}
	}
`;
