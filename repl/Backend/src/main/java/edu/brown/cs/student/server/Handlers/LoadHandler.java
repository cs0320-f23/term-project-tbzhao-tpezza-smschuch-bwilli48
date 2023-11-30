package edu.brown.cs.student.server.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.adapters.PolymorphicJsonAdapterFactory;
import edu.brown.cs.student.CSVCode.Parsing.CreatorFromRow;
import edu.brown.cs.student.CSVCode.Parsing.FactoryFailureException;
import edu.brown.cs.student.CSVCode.Parsing.Parse;
import edu.brown.cs.student.server.CSV.LoadedCSV;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.List;
import java.util.Set;
import spark.Request;
import spark.Response;
import spark.Route;

/** Class for handling load csv query Returns success if csv was loaded */
public class LoadHandler implements Route {

  /** LoadedCSV class to pass loaded csv to other handlers */
  private LoadedCSV loadedCSV;

  /**
   * Constructor
   *
   * @param loadedCSV passed in from server with path to new csv to load
   */
  public LoadHandler(LoadedCSV loadedCSV) {
    this.loadedCSV = loadedCSV;
  }

  /**
   * Method to handle query
   *
   * @param request loadcsv query from user
   * @param response
   * @return message telling user if csv was loaded or what went wrong in process
   * @throws Exception
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {

    Set<String> params = request.queryParams();
    if (params.size() != 1) {
      return new FileFailureLoaded(
              "error_bad_json",
              "",
              "Must only request one parameter 'path. Requested " + params.toString())
          .serialize();
    }
    String path = request.queryParams("path");

    Reader pathReader = null;
    if (path == null) {
      return new FileFailureLoaded(
              "error_bad_request",
              "",
              "Requested parameter '" + params.toArray()[0] + "', must be 'path'")
          .serialize();
    }
    try {
      pathReader = new FileReader(path);
    } catch (IOException i) {
      return new FileFailureLoaded(
              "error_datasource",
              path,
              "Requested path " + path + " was not found. Request to load a valid path.")
          .serialize();
    }

    CreatorFromRow<List<String>> creator =
        new CreatorFromRow<List<String>>() {
          @Override
          public List<String> create(List<String> row) throws FactoryFailureException {
            return row;
          }
        };

    Parse<List<String>> parse = new Parse<List<String>>(pathReader, creator);

    this.loadedCSV.setPath(path);
    this.loadedCSV.setIsLoaded(true);
    this.loadedCSV.setParsedCSV(parse.parse());
    //        return "CSV Loaded";
    return new FileSuccessfullyLoaded(this.loadedCSV.getPath()).serialize();
  }

  /**
   * Record for successfully loaded csv message to user
   *
   * @param result success message
   * @param filePath path of loaded csv
   */
  public record FileSuccessfullyLoaded(String result, String filePath) {
    /**
     * Constructor
     *
     * @param filePath path to loaded csv
     */
    public FileSuccessfullyLoaded(String filePath) {
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
                .add(PolymorphicJsonAdapterFactory.of(LoadedCSV.class, "path"))
                .build();
        JsonAdapter<FileSuccessfullyLoaded> adapter = moshi.adapter(FileSuccessfullyLoaded.class);
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
      return moshi.adapter(FileFailureLoaded.class).toJson(this);
    }
  }
}
