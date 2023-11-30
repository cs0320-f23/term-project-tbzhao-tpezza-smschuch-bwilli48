package edu.brown.cs.student.server.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.adapters.PolymorphicJsonAdapterFactory;
import edu.brown.cs.student.server.ACS.*;
import edu.brown.cs.student.server.CSV.LoadedCSV;
import edu.brown.cs.student.server.Caching.CachedItems;
import java.util.Set;
import spark.Request;
import spark.Response;
import spark.Route;

/** Class for handling broadband query Returns success if broadband data was found for location */
public class BroadbandHandler implements Route {

  /** List of state ids so api only has to get called once for state ids */
  StateIds states;
  /** Cache to store queries to reduce api calls */
  CachedItems cache;

  /**
   * Constructor
   *
   * @param cache cache of stored queries
   * @param states states to ids json that gets filled after one query
   */
  public BroadbandHandler(CachedItems cache, StateIds states) {
    this.cache = cache;
    this.states = states;
  }

  /**
   * Method to handle broadband query
   *
   * @param request query from user
   * @param response
   * @return percentage of houses with broadband access in county
   * @throws Exception
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {

    Set<String> params = request.queryParams();
    if (params.size() != 2) {
      return new BroadbandFailure(
              "error_bad_json",
              params.toString(),
              "Must have two parameters, 'state' and 'county'.")
          .serialize();
    }

    if (!(params.contains("state") && params.contains("county"))) {
      return new BroadbandFailure(
              "error_bad_json",
              params.toString(),
              "Must have two parameters, 'state' and 'county'.")
          .serialize();
    }

    String state = request.queryParams("state");

    String county = request.queryParams("county");

    ACSAPISource acs = new ACSAPISource(this.cache, this.states);
    BroadbandData percent = new BroadbandData("");
    try {
      percent = acs.getBroadbandData(new Location(state, county));
    } catch (DatasourceException d) {
      if (d.getMessage().equals("State not found")) {
        return new BroadbandFailure(
                "error_datasource",
                params.toString(),
                "State '"
                    + state
                    + "' was not found. Make sure "
                    + "it is spaced correctly. Examples: Maine, Rhode Island")
            .serialize();
      } else if (d.getMessage().equals("County not found")) {
        return new BroadbandFailure(
                "error_datasource",
                params.toString(),
                "County '"
                    + county
                    + "' was not found. Make sure "
                    + "it is spaced correctly. Example: Orange County")
            .serialize();
      }
    }
    if (percent.percOfHouses().equals("")) {
      return new BroadbandFailure(
              "error_datasource",
              params.toString(),
              "County '"
                  + county
                  + "' does not meet the ACS's population"
                  + " threshold of over 50,000, so its data was not surveyed. We apologize "
                  + "for not being able to give you the desired information.")
          .serialize();
    }
    return new BroadbandSuccess(
            percent.percOfHouses(),
            "The percent of households with broadband access in "
                + county
                + ", "
                + state
                + " is "
                + percent.percOfHouses()
                + "%. Data surveyed in 2021.")
        .serialize();
  }

  /**
   * Record for successful call for broadband dats
   *
   * @param result success
   * @param percent String of percent of houses with broadband access in county
   * @param SUCCESSMESSAGE success message with percent and state/county and date of survey
   */
  public record BroadbandSuccess(String result, String percent, String SUCCESSMESSAGE) {
    public BroadbandSuccess(String percent, String SUCCESSMESSAGE) {
      this("success", percent, SUCCESSMESSAGE);
    }
    /**
     * Method serialize message into json
     *
     * @return json of the success message
     */
    String serialize() {
      try {
        Moshi moshi =
            new Moshi.Builder()
                .add(PolymorphicJsonAdapterFactory.of(LoadedCSV.class, "path"))
                .build();
        JsonAdapter<BroadbandHandler.BroadbandSuccess> adapter =
            moshi.adapter(BroadbandHandler.BroadbandSuccess.class);
        return adapter.toJson(this);
      } catch (Exception e) {
        e.printStackTrace();
        throw e;
      }
    }
  }

  /**
   * Record for when broadband query fails
   *
   * @param result correct error message
   * @param params params passed into query
   * @param ERRORMESSAGE informative message for why broadband call failed
   */
  public record BroadbandFailure(String result, String params, String ERRORMESSAGE) {
    /**
     * Constructor
     *
     * @param params params passed into query
     * @param ERRORMESSAGE informative message for why broadband call failed
     */
    public BroadbandFailure(String params, String ERRORMESSAGE) {
      this("failure", params, ERRORMESSAGE);
    }
    /**
     * Method serialize message into json
     *
     * @return json of the failure message
     */
    String serialize() {
      Moshi moshi = new Moshi.Builder().build();
      return moshi.adapter(BroadbandFailure.class).toJson(this);
    }
  }
}
