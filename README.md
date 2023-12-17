# term-project-tbzhao-tpezza-smschuch-bwilli48-

## Project details

### Team members and contributions

tpezza - things done - X hours

tbzhao - things done - X hours

bwilli48 - Spent many hours reading Firebase documentation intially, and tried to integrate before eventually deciding that it was far too complex and not what we needed for this app. Switched to Auth0 and integrated logging in and out of our app. Then connected the accounts to user preferences so that when you're logged in your preferences are saved. Mocked this initially and wrote tests for it. Wrote javadocs and README for the entire frontend. Spent a lot of time reading CSS docs and developing the aesthetic of our frontend. Added aria-labels to everything I could in the interest of accessibility. - 30 hours

smschuch - things done - X hours

Link to repo: https://github.com/cs0320-f23/term-project-tbzhao-tpezza-smschuch-bwilli48

## Design choices -- high level design of your program

### Frontend

## Errors/Bugs

## Tests/Functionality

### Frontend

### Backend

## Running

### Frontend

For the frontend. We have the all the command functionality found in the previous sprints (loading, viewing, and parsing a CSV; broadband queries with the ACSAPI) as well as one new command desc_search, which takes a description of the required component and runs a queried search for the data on the backend. This in turn highlights the HOLC regions that contain this keyword, which are represented by making them far more opaque that their non-highlighted counterparts.

For running the frontend, please run the following commands:

- `cd frontend` -> moves you to the correct directory
- `npm install` -> installs npm, which we need to run the frontend
- `npm playwright install` -> installs playwright, which runs our tests for us
- `npm run dev` -> runs the server

### Backend
