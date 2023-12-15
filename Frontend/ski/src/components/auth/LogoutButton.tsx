import { useAuth0 } from "@auth0/auth0-react";

/**
 * Renders a button for logging out the user.
 */
const LogoutButton = () => {
	const { logout } = useAuth0();

	return (
		<button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} aria-label="Log out">
			Log Out
		</button>
	);
};

export default LogoutButton;
