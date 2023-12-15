import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";

type ProfileProps = {
	className?: string;
};

const Profile: React.FC<ProfileProps> = ({ className }) => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	if (!isAuthenticated || !user) {
		return null;
	}

	return (
		<div className={className}>
			<img src={user.picture} alt={user.name} />
			<h2>{user.name}</h2>
			<p>{user.email}</p>
			<LogoutButton />
		</div>
	);
};

export default Profile;