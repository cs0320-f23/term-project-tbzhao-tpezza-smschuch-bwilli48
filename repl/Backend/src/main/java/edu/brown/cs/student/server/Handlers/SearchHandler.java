package edu.brown.cs.student.server.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.adapters.PolymorphicJsonAdapterFactory;
import edu.brown.cs.student.CSVCode.Search.ColumnIdentifier;
import edu.brown.cs.student.CSVCode.Search.Search;
import edu.brown.cs.student.server.ACS.DatasourceException;
import edu.brown.cs.student.server.CSV.LoadedCSV;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import spark.Request;
import spark.Response;
import spark.Route;

/** Class for handling search csv query Returns rows found with searched item */
public class SearchHandler implements Route {
  /** LoadedCSV class to reference loaded csv */
  LoadedCSV loadedCSV;

  /**
   * Constructor
   *
   * @param loadedCSV LoadedCSV with parsed csv to search
   */
  public SearchHandler(LoadedCSV loadedCSV) {
    this.loadedCSV = loadedCSV;
  }

  /**
   * Method to handly query
   *
   * @param request searchcsv suery from user
   * @param response message with useful information and message with rows containing searched itm
   * @throws Exception
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    String searchTerm = "";
    ColumnIdentifier.Identifier searchType = ColumnIdentifier.Identifier.NONE;
    String identifier = "";
    boolean hasHeaders = true;

    Set<String> params = request.queryParams();

    if (!this.loadedCSV.getIsLoaded()) {
      return new FailureToSearch(
              "error_datasource",
              params.toString(),
              "No csv loaded. Use endpoint 'loadcsv' with a path "
                  + "to your csv to load, then search.")
          .serialize();
    }

    if (params.contains("term")) {
      searchTerm = request.queryParams("term");
    } else {
      return new FailureToSearch(
              "error_bad_request",
              params.toString(),
              "Must have parameter 'term' for term to search.")
          .serialize();
    }

    if (params.contains("type")) {
      if (request.queryParams("type").equals("header")) {
        searchType = ColumnIdentifier.Identifier.HEADER;

        if (params.contains("column")) {
          identifier = request.queryParams("column");
        } else {
          return new FailureToSearch(
                  "error_bad_request",
                  params.toString(),
                  "Since you are trying to search by header, you must "
                      + "request parameter 'column' equal to header name you "
                      + "want to search.")
              .serialize();
        }

      } else if (request.queryParams("type").equals("index")) {
        searchType = ColumnIdentifier.Identifier.INDEX;

        if (params.contains("column")) {
          identifier = request.queryParams("column");
        } else {
          return new FailureToSearch(
                  "error_bad_request",
                  params.toString(),
                  "Since you are trying to search by column, you must "
                      + "request parameter 'column' equal to column index you "
                      + "want to search.")
              .serialize();
        }

      } else {
        return new FailureToSearch(
                "error_bad_request",
                params.toString(),
                "Parameter 'type' must be either 'header' to search"
                    + " by header name, or 'index' to search by column index.")
            .serialize();
      }
    }

    if (params.contains("hasHeaders")) {
      if (request.queryParams("hasHeaders").equals("true")) {
        hasHeaders = true;
      } else if (request.queryParams("hasHeaders").equals("false")) {
        hasHeaders = false;
      } else {
        return new FailureToSearch(
                "error_bad_request",
                params.toString(),
                "Parameter hasHeaders must be either 'true' or 'false'.")
            .serialize();
      }
    }

    List<List<String>> rows = Collections.emptyList();

    try {
      Search search =
          new Search(
              this.loadedCSV.getParsedCSV(), searchTerm, searchType, identifier, hasHeaders, false);

      rows = search.searchParsed();

    } catch (DatasourceException d) {
      if (d.getMessage().equals("Index was not a number")) {
        return new FailureToSearch(
                "error_bad_request",
                params.toString(),
                "Parameter 'column', if index, must be a number "
                        + "(1, 15, 0). You requested "
                        + identifier)
                .serialize();

      } else if (d.getMessage().equals("Header was not found")) {
        return new FailureToSearch(
                "error_bad_request",
                params.toString(),
                "Header was not found. Headers are: "
                        + this.loadedCSV.getParsedCSV().get(0)
                        + ". You requested "
                        + identifier)
                .serialize();
      } else if (d.getMessage().equals("Index was to big")) {
        return new FailureToSearch(
                "error_bad_request",
                params.toString(),
                "Parameter 'column', if index, was to big. "
                        + "CSV size is "
                        + this.loadedCSV.getParsedCSV().get(0).size()
                        + ". You requested "
                        + identifier)
                .serialize();
      }
    }
    if (rows.isEmpty()) {
      return new SuccessfullySearched(
              rows, params.toString(), "'" + searchTerm + "' Was not found.")
          .serialize();
    }
    return new SuccessfullySearched(
            rows, params.toString(), "'" + searchTerm + "' Was found in " + rows.size() + " rows.")
        .serialize();
  }

  /**
   * Record for when item as successfully searched for
   *
   * @param result success
   * @param rows rows item was found in
   * @param params params passed into query
   * @param SUCCESSMESSAGE message telling user how many rows item was found in
   */
  public record SuccessfullySearched(
      String result, List<List<String>> rows, String params, String SUCCESSMESSAGE) {
    /**
     * Constructor
     *
     * @param rows rows item was found in
     * @param params params passed into query
     * @param SUCCESSMESSAGE message telling user how many rows item was found in
     */
    public SuccessfullySearched(List<List<String>> rows, String params, String SUCCESSMESSAGE) {
      this("success", rows, params, SUCCESSMESSAGE);
    }
    /**
     * Method serialize message into json
     *
     * @return json of success message, rows, params
     */
    String serialize() {
      try {
        Moshi moshi =
            new Moshi.Builder()
                .add(PolymorphicJsonAdapterFactory.of(LoadedCSV.class, "path"))
                .build();
        JsonAdapter<SuccessfullySearched> adapter = moshi.adapter(SuccessfullySearched.class);
        return adapter.toJson(this);
      } catch (Exception e) {
        e.printStackTrace();
        throw e;
      }
    }
  }

  /**
   * Record for when search failed
   *
   * @param result correct error message
   * @param params params passed into query
   * @param ERRORMESSAGE message informing user of what went wrong and options to fix
   */
  public record FailureToSearch(String result, String params, String ERRORMESSAGE) {
    /**
     * Constructor
     *
     * @param params params passed into query
     * @param ERRORMESSAGE message informing user of what went wrong and options to fix
     */
    public FailureToSearch(String params, String ERRORMESSAGE) {
      this("failure", params, ERRORMESSAGE);
    }

    /**
     * Method serialize message into json
     *
     * @return json of failure message
     */
    String serialize() {
      Moshi moshi = new Moshi.Builder().build();
      return moshi.adapter(FailureToSearch.class).toJson(this);
    }
  }
}
