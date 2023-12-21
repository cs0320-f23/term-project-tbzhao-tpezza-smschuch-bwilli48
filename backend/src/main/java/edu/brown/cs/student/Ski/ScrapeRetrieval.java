package edu.brown.cs.student.Ski;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.CSVCode.Parsing.Parse;
import edu.brown.cs.student.Ski.Records.ResortInfo;
import edu.brown.cs.student.Ski.Records.SkiLifts;
import edu.brown.cs.student.server.ACS.DatasourceException;
import edu.brown.cs.student.server.ACS.StateIds;
import edu.brown.cs.student.server.Search.ColumnIdentifier;
import edu.brown.cs.student.server.Search.Search;
import okio.Buffer;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static spark.Spark.connect;

/**
 * A class responsible for retrieving and organizing ski lift data through web scraping.
 */
public class ScrapeRetrieval {
    private Map<String, Integer> lifts;

    /**
     * Default constructor for the ScrapeRetrieval class. Initializes the lifts map.
     */
    public ScrapeRetrieval(){
        this.lifts = new HashMap<>();
    }

    /**
     * Retrieves ski lift data by making a request to the specified URL and parsing the JSON response.
     *
     * @return A list of SkiLifts objects representing ski lift information.
     * @throws DatasourceException If an error occurs during data retrieval.
     */
    public List<SkiLifts> retrieve()
            throws DatasourceException {
        try {
                URL requestURL =
                        new URL("http://localhost:4000/scrape");
                HttpURLConnection clientConnection = connect(requestURL);
                Moshi moshi = new Moshi.Builder().build();
                Type type = Types.newParameterizedType(List.class, SkiLifts.class);
                JsonAdapter <List<SkiLifts>> jsonAdapter = moshi.adapter(type);
                List<SkiLifts> body =
                        jsonAdapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
                clientConnection.disconnect();
            System.out.println("Done!");
                return body;
        } catch (IOException e) {
            throw new DatasourceException(e.getMessage());
        }
    }

    /**
     * Establishes a connection to the specified URL and returns an HttpURLConnection.
     *
     * @param requestURL The URL to connect to.
     * @return An HttpURLConnection for the specified URL.
     * @throws IOException          If an I/O error occurs during connection.
     * @throws DatasourceException If an error occurs during connection.
     */
    private static HttpURLConnection connect(URL requestURL) throws IOException, DatasourceException {
        URLConnection urlConnection = requestURL.openConnection();
        if (!(urlConnection instanceof HttpURLConnection)) {
            throw new DatasourceException("unexpected: result of connection wasn't HTTP");
        }
        HttpURLConnection clientConnection = (HttpURLConnection) urlConnection;
        clientConnection.connect();
        if (clientConnection.getResponseCode() != 200) {
            throw new DatasourceException(
                    // Only ever found when county is too small
                    "Server error");
        }
        return clientConnection;
    }

    /**
     * Organizes ski lift data by populating the lifts map with ski lift names and corresponding numbers.
     *
     * @param liftList A list of SkiLifts objects.
     */
    public void organize(List<SkiLifts> liftList){
        for(SkiLifts items: liftList){
            String liftName = items.name().toLowerCase();
            Integer liftNumber = this.parseNumber(items.lifts());
            this.lifts.put(liftName, liftNumber);
        }
    }

//    private String parseName(String input){
//        String[] splitArray = input.split(" ");
//
//        String returnString = "";
//        if(splitArray.length > 2) {
//            for (int i = 1; i < splitArray.length; i++) {
//                if(splitArray[i].contains("/")){
//                    splitArray = splitArray[i].split("/");
//                    returnString = returnString + splitArray[0];
//                    break;
//                }
//                else{
//                    returnString = returnString + splitArray[i];
//                }
//            }
//        } else {
//            returnString = splitArray[1];
//        }
//        return returnString.toLowerCase();
//    }

    /**
     * Parses a string input into an Integer, handling cases where the input is null or invalid.
     *
     * @param input The input string to be parsed.
     * @return The parsed Integer value.
     */
    private Integer parseNumber(String input){
        if(input == null){
            return 0;
        }
        String[] splitArray = input.split(" ");

        String returnString = "";
        if(splitArray.length == 1) {
            return 0;
        } else {
            return Integer.parseInt(splitArray[0]);
        }
    }

    /**
     * Gets the number of lifts for a specified ski resort.
     *
     * @param input The name of the ski resort.
     * @return The number of lifts for the specified ski resort.
     */
    public Integer getLift(String input){
        List<String> list = this.lifts.keySet().stream().toList();
        for (int i = 0; i < list.size(); i++) {
            if(list.get(i).contains(input.toLowerCase())){
                return this.lifts.get(list.get(i));
            }
        }
        return 0;
    }

    /**
     * Gets the lifts map containing ski lift names as keys and corresponding numbers as values.
     *
     * @return The lifts map.
     */
    public Map<String, Integer> getLifts(){
        return this.lifts;
    }
}
