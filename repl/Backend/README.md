# Server-tonybzhao-tyypezza
PROJECT DETAILS
CSV Project
CS Logins: tbzhao, tpezza
It took us about 12 hours to complete Server.
A link to your repo : https://github.com/cs0320-f23/server-tonybzhao-tyypezza.git

Note: We ran into issues with one of the computers with pulling code from Git. Instead we coded all of our sessions either in person through CodeWithMe, or when another partner was busy we would pass the “coding” computer off to the other partner. This is reflected in the commit messages.

DESIGN CHOICES
For our overall project structure, we settled on a main server class that would contain handlers to delegate responsibilities for various requests. Each of the handler classes implements the Route interface to deal with the request received. They also error check for cases where we find bad input, incorrect parameters, unexpected results, or incorrect data sources, Part of this process includes the wildcardHandler. This handles any input that deviates from the defined endpoints for the request. The loadHandler class deals with responsibilities in loading a CSV into the server. We store information about the state of this CSV, data from the CSV, and the path within the LoadedCSV class so that we can pass this data between handlers. The viewHandler class primarily serializes a loaded CSV into json in order to be returned to the request by the user. The searchHandler class utilizes the CSV search program from the first sprint. Parameters requested by the user can be specified to narrow down the search and the CSV is accessed to return a serialized version of the result.

Moving on to the ACS portion of this project, this is primarily handled with a Broadband handler. This handler handles most of the logic with error catching, forcing the user to input a parameter for the state and county to search a percentage for. We utilized a cache in this portion of the project. The cache is a class that holds data from previous requests to the API. Our program checks the existence of the parameters passed in within the cache, then retrieves the results if so. We also designed an algorithm to remove items from the cache once a certain amount of items is reached. We made this developer oriented through a removeCache interface that we will discuss in detail below. Otherwise, the primary function of the class is to make a request to the API for state and county codes, then retrieve the percentage using these codes in a serialized record.


ERRORS/BUGS
No known errors or bugs that are not handled by the program. The program will give feedback on what type of error occurs and some reasoning behind it. For example, if the file path is loaded incorrectly, an error_datasource message is thrown. Another point to note is that not all counties in each state are included in the broadband percentage census. This is accounted for by an error message.

TESTS
Our testing suite primarily focuses on error catching for the API, the handlers, and testing cases from the CSV parser. For most of our tests for the handlers, we manufacture a connection and then form requests to test each error case. We then assert whether the error thrown is the error we expected. For the API, we test whether the searched county and state return the expected percentage, as well as for cases where the county is too small or not included in the census.

HOW TO RUN TESTS
Go into the testing suite and run the tests. Beyond that using the url http://localhost:1212/ and adding parameters to define the type of request to be made. From there the results received can be used to validate that the program works.

HOW TO BUILD/RUN PROGRAM
One important thing to note for building the program is the removeCache interface. In our implementation of cache removal, we designed the cache to remove the least frequently accessed value in the cache once 10 items are reached. The removeCache interface gives flexibility to a designer so that they may design their own method for cache removal, and the program will still be able to run. For example, if memory limit is not an issue or the developer wants to save a greater number of cached items, they may design the system to not remove items.


