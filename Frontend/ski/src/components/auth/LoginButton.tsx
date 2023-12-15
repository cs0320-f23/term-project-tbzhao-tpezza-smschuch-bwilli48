import { useAuth0 } from "@auth0/auth0-react";

type LoginButtonProps = {
	className?: string;
};

const LoginButton: React.FC<LoginButtonProps> = ({ className }) => {
	const { loginWithRedirect } = useAuth0();

	return (
		<button className={className} onClick={() => loginWithRedirect()}>
			Log In
		</button>
	);
};

export default LoginButton;
