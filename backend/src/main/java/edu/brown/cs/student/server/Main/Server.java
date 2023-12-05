package edu.brown.cs.student.server.Main;

import static spark.Spark.after;

import edu.brown.cs.student.server.ACS.StateIds;

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
    int port = 3232;


    StateIds states = new StateIds();

    CachedItems cache = new CachedItems();


    Spark.port(port);

    after(
        (request, response) -> {
          response.header("Access-Control-Allow-Origin", "*");
          response.header("Access-Control-Allow-Methods", "*");
        });


    Spark.get("*", new WildCardHandler());

    Spark.init();
    Spark.awaitInitialization();

    System.out.println("Server started at http://localhost:" + port);
  }
}
