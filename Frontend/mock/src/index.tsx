import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/App";
import { Auth0Provider } from "@auth0/auth0-react";

// Tim removed some boilerplate to keep things simple.
// We're using an older version of React here.

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<Auth0Provider
			domain="dev-7cpkmpuleq3yr3t6.us.auth0.com"
			clientId="MmL9q8hkGq5BS9PfJM21uBDWAPrPkpDs"
			authorizationParams={{
				redirect_uri: window.location.origin,
			}}
		>
			<App />
		</Auth0Provider>
	</React.StrictMode>
);
