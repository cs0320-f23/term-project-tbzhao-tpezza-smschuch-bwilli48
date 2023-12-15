import { useAuth0 } from "@auth0/auth0-react";

/**
 * Properties accepted by the LoginButton component.
 */
type LoginButtonProps = {
	className: string;
};

/**
 * Renders a button that triggers the Auth0 login flow.
 */
const LoginButton: React.FC<LoginButtonProps> = ({ className }) => {
	const { loginWithRedirect } = useAuth0();

	return (
		<button className={className} onClick={() => loginWithRedirect()} aria-label="Log in">
			Log In
		</button>
	);
};

export default LoginButton;
