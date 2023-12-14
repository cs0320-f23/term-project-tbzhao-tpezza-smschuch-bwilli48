import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
	<Auth0Provider
		domain="dev-7cpkmpuleq3yr3t6.us.auth0.com"
		clientId="MmL9q8hkGq5BS9PfJM21uBDWAPrPkpDs"
		authorizationParams={{
			redirect_uri: window.location.origin,
		}}
	>
		<App />
	</Auth0Provider>
);
