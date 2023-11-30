package edu.brown.cs.student.server.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.adapters.PolymorphicJsonAdapterFactory;
import edu.brown.cs.student.server.CSV.LoadedCSV;
import java.util.List;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Class for handling viewcsv handler. Will either return a json of the csv, or return a message if
 * no csv is loaded
 */
public class ViewHandler implements Route {

  private LoadedCSV loadedCSV;

  /**
   * Constructor
   *
   * @param loadedCSV reference to the csv being passed from loadcsv handler that contains parsedcsv
   *     to view
   */
  public ViewHandler(LoadedCSV loadedCSV) {
    this.loadedCSV = loadedCSV;
  }

  /**
   * Method that actually produces response to request
   *
   * @param request request from user
   * @param response
   * @return either message telling user no csv is loaded, or the json of the loaded csv
   * @throws Exception
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {

    if (!this.loadedCSV.getIsLoaded()) {
      return new ViewNotLoaded(
              "No csv loaded. Use endpoint 'loadcsv' with a path "
                  + "to your csv to load, then search.")
          .serialize();
    }
    return new ViewLoadedFile(this.loadedCSV.getParsedCSV()).serialize();
  }

  /**
   * Record for message sent when csv is loaded
   *
   * @param result success message
   * @param csv json version of loaded csv
   */
  public record ViewLoadedFile(String result, List<List<String>> csv) {
    /**
     * Constructor
     *
     * @param List<List<String>> of the csv the parsed csv
     */
    public ViewLoadedFile(List<List<String>> csv) {
      this("success", csv);
    }

    /**
     * Method serialize message into json
     *
     * @return json of the returned csv
     */
    String serialize() {
      try {
        Moshi moshi =
            new Moshi.Builder()
                .add(PolymorphicJsonAdapterFactory.of(LoadedCSV.class, "view"))
                .build();
        JsonAdapter<ViewHandler.ViewLoadedFile> adapter =
            moshi.adapter(ViewHandler.ViewLoadedFile.class);
        return adapter.toJson(this);
      } catch (Exception e) {
        e.printStackTrace();
        throw e;
      }
    }
  }

  /**
   * Record for message returned when csv is not loaded
   *
   * @param result error_datasource since no csv loaded
   * @param ERRORMESSAGE informative message
   */
  public record ViewNotLoaded(String result, String ERRORMESSAGE) {
    /**
     * contructor
     *
     * @param ERRORMESSAGE informatice message
     */
    public ViewNotLoaded(String ERRORMESSAGE) {
      this("error_datasource", ERRORMESSAGE);
    }

    /**
     * Method serialize message into json
     *
     * @return json of the returned message
     */
    String serialize() {
      Moshi moshi = new Moshi.Builder().build();
      return moshi.adapter(ViewHandler.ViewNotLoaded.class).toJson(this);
    }
  }
}
