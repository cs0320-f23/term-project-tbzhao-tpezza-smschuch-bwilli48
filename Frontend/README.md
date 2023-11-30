# Mock-tbui12-tpezza

PROJECT DETAILS
Mock Project
My cslogins: tpezza tbui12
It took us about 8 hours to complete Mock.
A link to your repo : https://github.com/cs0320-f23/mock-tbui12-tpezza.git

DESIGN CHOICES
One of the early choices we made was to add a small header, just giving a visual update of the name of the current csv loaded, and the mode. This helps the user keep track, and gives us a physical place to see/test to make sure commands were doing what we wanted.

We also decided to split up the individual history classes into two for brief and verbose. This just made the code a little cleaner instead of checking the mode and having two different possible designs within one class.

We chose not to add the options for the user to tell if the csv had headers when loading. It wasn’t specified in the handout, and while we assume we will need it in the upcoming sprints, we wanted to wait and see how we could best implement it. We could either instruct the user to say load_file “headers” <file_path>, or something of the sort. Or, which I think would be an effective way for helping users structure their commandes, when they input load_file, two more input boxes pop up - one to enter path, and one for header (and maybe a third to name the csv, which would be effective for out header that displays which csv is currently loaded). I think this would be very effective for search as well.

Other than that, we really structured our project of the gear up, and just added states for the current csv, the current mode, and the current loaded csv message (allowing us to see if a csv is loaded, and display to the user the current csv loaded).

ERRORS/BUGS
We really didn't run into any bugs. As for errors, for now we are catching a basic error
we throw when the search input is invalid.

TESTS
Mode Tests
Tested mode to ensure it starts in brief. Then to ensure it switched to verbose when
mode is inputted, and back to verbose when inputted again. Also, when in mode, it
displays with command: and output:.

View Tests
Tested view with no csv, with a csv, and after loading a second csv.

Load Tests
Tested loading bad file path, no file path, 3 different csv, load after loading a
csv, and load after loading and viewing a csv.

Search Tests
Tested search without a csv loaded, an ill-formatted search, a search with no results,
A successful search column index, with column header, successful search with multiple rows returned for both column index and header.

HOW TO RUN TESTS
To run tests, in the terminal, you have to cd into mock. You can then run all tests
with 'npx playwright test' in the terminal. Or, to run a specific test file, you can
enter 'npx playwright test Mode' (to test mode test file) into the terminal.

HOW TO BUILD/RUN PROGRAM
To run the program, you must cd into mock in the terminal. Then enter 'npm start' into the terminal.
This will give you a url to the now local running server, and you can paste
that into a browser to use. You can then use one of four commands in the input box.

1. mode - switches between brief and verbose mode
2. load_file <filepath> - loads given file path
3. view - shows current csv as a table
4. search <item> or search <column> <item> to search for item, and search in given column
   index/header name in csv
