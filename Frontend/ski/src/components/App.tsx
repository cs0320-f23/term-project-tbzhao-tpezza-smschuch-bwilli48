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
import {
  getMockStartResorts,
  getStartResorts,
  mockResorts,
  Resort,
} from "./resorts/ResortClass";

function App() {
  const { isAuthenticated } = useAuth0(); // Get the authentication status
  const [resortList, setResortList] = useState<Resort[]>(getStartResorts);
  const [mockMode, setMockMode] = useState<boolean>(false);
  const [mockString, setMockString] = useState<string>("Mock Mode: Off");
  const [mockID, setMockID] = useState<string>("mockOffButton");

  function handleSubmit() {
    if (mockMode) {
      setMockMode(false);
      setMockString("Mock Mode: Off");
      setMockID("mockOffButton");
      setResortList(getStartResorts);
    } else {
      setMockMode(true);
      setMockString("Mock Mode: On");
      setMockID("mockOnButton");
      setResortList(getMockStartResorts);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Alpine Advisor</h1>
      </header>
      <button
        className="search-button"
        id={mockID}
        onClick={() => handleSubmit()}
        aria-label="Click the Search button to perform the search"
      >
        {mockString}
      </button>
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
            <Preferences
              resortList={resortList}
              setResortList={setResortList}
              mockMode={mockMode}
            />
            <div className="search-sort-resorts">
              <div className="search-sort">
                <div className="sort">
                  <Sort
                    resortList={resortList}
                    setResortList={setResortList}
                    mockMode={mockMode}
                  />
                </div>
                <div className="search">
                  <Search
                    resortList={resortList}
                    setResortList={setResortList}
                    mockMode={mockMode}
                  />
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
