import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";

/**
 * Properties that the Profile component accepts.
 */
type ProfileProps = {
	className: string;
};

/**
 * Displays the authenticated user's profile information. Shows the user's picture, name,
 * and email, and includes a logout button.
 */
const Profile: React.FC<ProfileProps> = ({ className }) => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <div role="alert">Loading ...</div>;
	}

	if (!isAuthenticated || !user) {
		return null;
	}

	return (
		<div className={className}>
			<img src={user.picture} alt={user.name} aria-label="Profile picture" />
			<h2>{user.name}</h2>
			<p>{user.email}</p>
			<LogoutButton aria-label="Log out" />
		</div>
	);
};

export default Profile;
