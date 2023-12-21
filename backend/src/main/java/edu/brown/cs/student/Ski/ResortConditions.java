package edu.brown.cs.student.Ski;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import edu.brown.cs.student.Ski.Records.WeatherForecast;
import okio.Buffer;

import static spark.Spark.connect;

/**
 * A class representing conditions and forecasts for ski resorts.
 */
public class ResortConditions {

    /**
     * Default constructor for the ResortConditions class.
     */
    public ResortConditions(){
    }

    /**
     * Retrieves the weather forecast for a given ski resort.
     *
     * @param resort The name of the ski resort.
     * @return The weather forecast for the specified ski resort.
     * @throws IOException If an I/O error occurs while fetching the forecast.
     * @throws InterruptedException If the thread is interrupted during the forecast retrieval.
     */
    public WeatherForecast getForecast(String resort) throws IOException, InterruptedException {
        resort = this.regexInput(resort);
        try{
        String apiKey = "8e5a8dc010mshe2e53dfed6089f7p1eff16jsnde54793f6715";
        String apiHost = "ski-resort-forecast.p.rapidapi.com";
        String apiUrl = "https://ski-resort-forecast.p.rapidapi.com/" + resort + "/forecast?units=i&el=top";
        URL url = new URL(apiUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        // Set the request method to GET
        connection.setRequestMethod("GET");

        // Set request headers
        connection.setRequestProperty("X-RapidAPI-Key", apiKey);
        connection.setRequestProperty("X-RapidAPI-Host", apiHost);

     //   HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        Moshi moshi = new Moshi.Builder().build();
        JsonAdapter<WeatherForecast> jsonAdapter = moshi.adapter(WeatherForecast.class);
           // System.out.println(connection.getInputStream());
        WeatherForecast body =
                jsonAdapter.fromJson(new Buffer().readFrom(connection.getInputStream()));
        connection.disconnect();
      //  System.out.println(body);
        return body;
        }  catch (FileNotFoundException e) {
            throw new FileNotFoundException();
        }
    }

    /**
     * Adjusts the input string for use in the API request using regular expressions.
     *
     * @param input The input string (resort name).
     * @return The adjusted string suitable for use in the API request.
     */
    public String regexInput(String input){

        String[] splitArray = input.split(" ");
        //System.out.println(splitArray[0]);

        String returnString = "";
        if(splitArray.length > 1) {
            returnString = splitArray[0];
            for (int i = 1; i < splitArray.length; i++) {
                if(splitArray[i].contains("/")){
                    splitArray = splitArray[i].split("/");
                    returnString = returnString + "%20"  + splitArray[0];
                    break;
                }
                returnString = returnString + "%20" + splitArray[i];
            }
        } else {
            if(splitArray[0].contains("/")){
                splitArray = splitArray[0].split("/");
            }
            returnString = splitArray[0];
        }
        return returnString;
    }
}

