import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Preferences } from "./Preferences";
import { ResortsList } from "./ResortsList";
import { Search } from "./Search";
import { Sort } from "./Sort";
import LoginButton from "./auth/LoginButton";
import Profile from "./auth/Profile"; // Import the Profile component
import "../styles/App.css";
import "../styles/index.css";
import "../styles/main.css";
import { mockResorts, Resort } from "./resorts/ResortClass";

function App() {
	const { isAuthenticated } = useAuth0(); // Get the authentication status
	const [resortList, setResortList] = useState<Resort[]>(mockResorts);

	return (
		<div className="App">
			<header className="App-header">
				<h1>Alpine Advisor</h1>
			</header>
			<main>
				<section className="user-panel">
					{isAuthenticated ? (
						<>
							<Profile className="profile-container" />
						</>
					) : (
						<LoginButton className="login-button" />
					)}
				</section>
				<section className="content-panel">
					<div>
						<Preferences resortList={resortList} setResortList={setResortList} />
						<div className="search-sort-resorts">
							<div className="search-sort">
								<div className="sort">
									<Sort resortList={resortList} setResortList={setResortList} />
								</div>
								<div className="search">
									<Search resortList={resortList} setResortList={setResortList} />
								</div>
							</div>
							<div className="resorts">
								<ResortsList resortList={resortList} />
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default App;
