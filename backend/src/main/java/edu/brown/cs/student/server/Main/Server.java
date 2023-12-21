package edu.brown.cs.student.server.Main;

import static spark.Spark.after;

import edu.brown.cs.student.Ski.ResortList;
import edu.brown.cs.student.Ski.ScrapeRetrieval;
import edu.brown.cs.student.server.ACS.DatasourceException;
import edu.brown.cs.student.server.ACS.StateIds;

import edu.brown.cs.student.server.Caching.CachedItems;
import edu.brown.cs.student.server.Caching.CachedResorts;
import edu.brown.cs.student.server.Handlers.*;
import spark.Spark;

import java.io.IOException;

/**
 * The main class for running the server.
 */
public class Server {

  /**
   * The main method to start the server.
   *
   * @param args Command-line arguments (not used).
   * @throws IOException           If an I/O error occurs.
   * @throws InterruptedException  If the thread is interrupted during sleep.
   * @throws DatasourceException   If there is an issue with the data source.
   */
  public static void main(String[] args) throws IOException, InterruptedException, DatasourceException {
    // Set the port for the server
    int port = 3232;

    // Create a list of resorts
    ResortList list = new ResortList();

    // Create a scraper for retrieving resort information
    ScrapeRetrieval scraper = new ScrapeRetrieval();
    scraper.organize(scraper.retrieve());

    // Create a cache for storing resorts
    CachedResorts cache = new CachedResorts(list, scraper);
    System.out.println("Server is ready to use!");

    // Set the port for Spark
    Spark.port(port);

    // Configure headers for Cross-Origin Resource Sharing (CORS)
    after(
            (request, response) -> {
              response.header("Access-Control-Allow-Origin", "*");
              response.header("Access-Control-Allow-Methods", "*");
            });

    // Define the "resorts" endpoint with a ResortHandler
    Spark.get("resorts", new ResortHandler(list, cache));

    // Define a wildcard endpoint with a WildCardHandler
    Spark.get("*", new WildCardHandler());

    // Initialize Spark
    Spark.init();
    Spark.awaitInitialization();

    System.out.println("Server started at http://localhost:" + port);
  }
}
