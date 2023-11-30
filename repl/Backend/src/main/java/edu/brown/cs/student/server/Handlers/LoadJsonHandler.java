package edu.brown.cs.student.server.Handlers;

import com.squareup.moshi.Json;
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import com.squareup.moshi.adapters.PolymorphicJsonAdapterFactory;
import edu.brown.cs.student.CSVCode.Parsing.CreatorFromRow;
import edu.brown.cs.student.CSVCode.Parsing.FactoryFailureException;
import edu.brown.cs.student.CSVCode.Parsing.Parse;
import edu.brown.cs.student.server.CSV.LoadedCSV;
import edu.brown.cs.student.server.CSV.LoadedJson;
import okio.Buffer;
import okio.BufferedSource;
import spark.Request;
import spark.Response;
import spark.Route;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.lang.reflect.Type;
import java.util.*;

public class LoadJsonHandler implements Route {
    private LoadedJson loadedJson;

    public LoadJsonHandler(LoadedJson loadedJson) {
        this.loadedJson = loadedJson;
    }

    @Override
    public Object handle(Request request, Response response) throws Exception {

        Set<String> params = request.queryParams();
        if (params.size() != 2) {
            return new LoadHandler.FileFailureLoaded(
                    "error_bad_json",
                    "",
                    "Must only request one parameter 'path. Requested " + params.toString())
                    .serialize();
        }
        String path = request.queryParams("path");

        String getItem = request.queryParams("get");

        Reader pathReader = null;
        if (path == null) {
            return new LoadHandler.FileFailureLoaded(
                    "error_bad_request",
                    "",
                    "Requested parameter '" + params.toArray()[0] + "', must be 'path'")
                    .serialize();
        }
        try {
            pathReader = new FileReader(path);
        } catch (IOException i) {
            return new LoadHandler.FileFailureLoaded(
                    "error_datasource",
                    path,
                    "Requested path " + path + " was not found. Request to load a valid path.")
                    .serialize();
        }
        this.loadedJson.setPath(path);
        this.loadedJson.setIsLoaded(true);
        StringBuilder jsonString = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
            String line;
            while ((line = reader.readLine()) != null) {
                jsonString.append(line);
            }
        }

        Map<String, Object> jsonMap = new HashMap<>();
        Moshi moshi = new Moshi.Builder().build();
        Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
        JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapStringObject);
        jsonMap = adapter.fromJson(jsonString.toString());

        return new JsonSuccessfullyLoaded((String) jsonMap.get(getItem)).serialize();
    }

    /**
     * Record for successfully loaded csv message to user
     *
     * @param result success message
     * @param filePath path of loaded csv
     */
    public record JsonSuccessfullyLoaded(String result, String filePath) {
        /**
         * Constructor
         *
         * @param filePath path to loaded csv
         */
        public JsonSuccessfullyLoaded(String filePath) {
            this("success", filePath);
        }

        /**
         * Method serialize message into json
         *
         * @return json of success message and file path
         */
        String serialize() {
            try {
                Moshi moshi =
                        new Moshi.Builder()
                                .add(PolymorphicJsonAdapterFactory.of(LoadedJson.class, "path"))
                                .build();
                JsonAdapter<LoadJsonHandler.JsonSuccessfullyLoaded> adapter = moshi.adapter(LoadJsonHandler.JsonSuccessfullyLoaded.class);
                return adapter.toJson(this);
            } catch (Exception e) {
                e.printStackTrace();
                throw e;
            }
        }
    }

    /**
     * Record for message when load csv fails
     *
     * @param result correct error message depending on reson for failure
     * @param filePath path of csv to load
     * @param ERRORMESSAGE informative message for why load failed
     */
    public record FileFailureLoaded(String result, String filePath, String ERRORMESSAGE) {
        /**
         * Constructor
         *
         * @param filePath path to csv
         * @param ERRORMESSAGE informative message on failure
         */
        public FileFailureLoaded(String filePath, String ERRORMESSAGE) {
            this("failure", filePath, ERRORMESSAGE);
        }

        /**
         * Method serialize message into json
         *
         * @return json of the failure message
         */
        String serialize() {
            Moshi moshi = new Moshi.Builder().build();
            return moshi.adapter(LoadJsonHandler.FileFailureLoaded.class).toJson(this);
        }
    }
}
