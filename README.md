# term-project-tbzhao-tpezza-smschuch-bwilli48

## Project details

### Team members and contributions

tpezza - things done - X hours

tbzhao - Cosntructed a script that scrapes data from the web using Puppeteer. Looked into options for hosting servers online through Render but this did not serve to be a viable option. Also worked with APIs to create calls that would retreive the necessary data and store it in data structures to be used in the algorithm. Designed the server endpoints and setting up the server for the data to be available and sent to the frontend. - 30 hours

bwilli48 - Spent many hours reading Firebase documentation intially, and tried to integrate before eventually deciding that it was far too complex and not what we needed for this app. Switched to Auth0 and integrated logging in and out of our app. Then connected the accounts to user preferences so that when you're logged in your preferences are saved. Mocked this initially and wrote tests for it. Wrote javadocs and README for the entire frontend. Spent a lot of time reading CSS docs and developing the aesthetic of our frontend. Added aria-labels to everything I could in the interest of accessibility. - 30 hours

smschuch - things done - X hours

Link to repo: https://github.com/cs0320-f23/term-project-tbzhao-tpezza-smschuch-bwilli48

## Design choices -- high level design of your program

### Frontend

Our webapp consists of five main panels:

1. The authentication panel is at the top of our webpage, and it holds either a login button or account details (name, email, profile picture) and a logout button. Auth0 is the platform we used for account authentication, and when the user clicks the log-in button they're redirected to Auth0's standard log-in page, and they can either sign in with their email address and password or Google's acocunt integration. Most of the logic is handled using Auth0's constant methods that contact their servers to ensure users are authenticated and that the page redirects appropriately.

2. The preferences panel follows the authentication panel, taking up the full width of the webpage. In this panel, users have the option to prioritize their different preferences in their search for ski resorts. Currently, the avaliable options are Snowfall Amount, Last Snowfall, Base-depth, Price, Lifts Open, Summit Elevation, Temperature, and Windspeed. Users can assign a weight and value to each preference, and our algorithm will produce a list of ski resorts that reflects their preferences. The "Save to Account" button is where authentication comes into play — users can set their preferences when they first make their account, and then click this button so that every time they reload the page or log out and log back in, their preferences remain as they first set them.

3. Below the preferences panel on the left side of the webpage, there's a panel labeled "Select a sort method". Here, users can use a dropdown menu to select a method from our offerings and sort the resort list by a single preference, seeing the resorts that have the lowest price, most lifts open, etc.

4. Below the sort panel, there's a panel labeled "Search for a specific resort:". As expected, here the user will find a command box where they can enter a specific resort name to see the statistics associated with it. Below the search button, we also provide a dropdown menu with the full list of resorts, sorted alphabetically, if the user simply wants to see what resorts we offer.

5. The fifth panel is the most dynamic — here we show the resorts list sorted by whatever the user has selected, be it their preferences, a preset sort method, or a search query. This panel extends to fit whatever number of resorts are displayed, and has resorts seperated by a line. Each resort has three sections of statistics: Snowfall Stats, Weather, and Mountain Info. Each section contains pertinent information to help users in their resort selection.

### Backend

Our webapp contains two separate components:

1) Server: The server is the main link between the frontend and the backend. It has components that fetch API calls for weather and snow data. Additionally, it parses a list of resorts that contains information on location and price. There is also a component that fetches the information that is scraped from the web. This is all stored in a list of resort items that the algorithm uses in the recommendation.

2) Scraper: The scraper uses Puppeteer to pull data on the number of lifts at ski resorts. This returns in a Json format that the server takes and stores. The sorting takes about a minute or so in order to pull all the data, which is a limitation. 

## Errors/Bugs

TODO: update right before Tim meeting.

## Tests/Functionality

### Frontend

Auth.spec.ts: This testing class focuses on the connection between account authentication and preferences. It includes Playwright tests that login to the webapp, adjust preferences and reload the page/logout and login again to ensure that preferences are saved to the account. It also covers edge cases like the user not pressing the save to account button.

SkiTesting: This testing class is responsible for testing individual components of the server. There are tests that print out data retrieved as well as checking that values and data are correctly processed.

### Backend

## Running

### Frontend

To run our webapp:

1. cd frontend
2. cd ski
3. npm install
4. npm install @auth0/auth0-react
5. npm start

To run playwright tests:

1. cd frontend
2. cd ski
3. npx playwright install
4. npx playwright test

### Backend

To start the backend:
1. cd backend\scraper
2. npm install puppeteer
3. node index.js
4. This will have run the scraper code
5. Open the backend folder on Intellij
6. Open the Main package and go to the Server class
7. Run the server, once the message "Server is ready to use!" shows, the backend is ready
