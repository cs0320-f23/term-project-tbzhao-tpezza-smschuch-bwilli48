package edu.brown.cs.student.server.Main;

import static spark.Spark.after;

import edu.brown.cs.student.server.ACS.StateIds;
import edu.brown.cs.student.server.CSV.LoadedCSV;
import edu.brown.cs.student.server.CSV.LoadedJson;
import edu.brown.cs.student.server.Caching.CachedItems;
import edu.brown.cs.student.server.Handlers.*;
import spark.Spark;

/**
 * Server class for to run the server that can be used to make requests to load, search, and view
 * csvs, and to search the ACS database for the percentage of households with broadband access in a
 * certain US county. Just need to run it, then copy print statement into a browser, and use README
 * instructions to send queries.
 */
public class Server {
  public static void main(String[] args) {
    int port = 1212;

    LoadedCSV loadedCSV = new LoadedCSV();

    LoadedJson loadedJson = new LoadedJson();

    StateIds states = new StateIds();

    CachedItems cache = new CachedItems();

    Spark.port(port);

    after(
        (request, response) -> {
          response.header("Access-Control-Allow-Origin", "*");
          response.header("Access-Control-Allow-Methods", "*");
        });

    Spark.get("loadjson", new LoadJsonHandler(loadedJson));

    Spark.get("loadcsv", new LoadHandler(loadedCSV));

    Spark.get("searchcsv", new SearchHandler(loadedCSV));

    Spark.get("viewcsv", new ViewHandler(loadedCSV));

    Spark.get("broadband", new BroadbandHandler(cache, states));

    Spark.get("*", new WildCardHandler());

    Spark.init();
    Spark.awaitInitialization();

    System.out.println("Server started at http://localhost:" + port);
  }
}
