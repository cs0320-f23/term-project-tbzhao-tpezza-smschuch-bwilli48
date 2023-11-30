package edu.brown.cs.student.Testing.serverTesting;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.squareup.moshi.Moshi;
import edu.brown.cs.student.server.CSV.LoadedCSV;
import edu.brown.cs.student.server.CSV.LoadedJson;
import edu.brown.cs.student.server.Handlers.*;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

import okio.Buffer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import spark.Spark;

/**
 * Class to test csv handlers
 */
public class CSVHandlerTest {

  /**
   * tests load too many params load bad path load success search csv not loaded search -> all
   * different errors view success view csv not loaded wildcard
   */

  /** Class to setup server for tests */
  @BeforeAll
  public static void setup_before_everything() {
    Spark.port(0);
    // Logger.getLogger("").setLevel(Level.WARNING);
  }

  LoadedCSV loadedCSV = new LoadedCSV();
  LoadedJson loadedJson = new LoadedJson();

  /** Class to reset Broadband handler before each test */
  @BeforeEach
  public void setup() {
    loadedCSV = new LoadedCSV();
    Spark.get("loadcsv", new LoadHandler(loadedCSV));
    Spark.get("searchcsv", new SearchHandler(loadedCSV));
    Spark.get("viewcsv", new ViewHandler(loadedCSV));
    Spark.get("loadjson", new LoadJsonHandler(loadedJson));
    Spark.get("*", new WildCardHandler());
    Spark.init();
    Spark.awaitInitialization();
  }

  /** Class to reset server after each test */
  @AfterEach
  public void teardown() {
    loadedCSV = new LoadedCSV();
    Spark.unmap("loadcsv");
    Spark.unmap("searchcsv");
    Spark.unmap("viewcsv");
    Spark.unmap("*");
    Spark.awaitStop();
  }

  /**
   * Helper taken from gearup, to start a connection to a specific API endpoint/params Just starts
   * request, and endpoints will be added later
   *
   * @param apiCall the call string, including endpoint
   * @return the connection for the given URL, just after connecting
   * @throws IOException if the connection fails for some reason
   */
  private static HttpURLConnection tryRequest(String apiCall) throws IOException {
    URL requestURL = new URL("http://localhost:" + Spark.port() + "/" + apiCall);
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
    clientConnection.connect();
    return clientConnection;
  }

  /**
   * Test for loadcsv with no params
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void testJson() throws IOException {
    HttpURLConnection clientConnection =
            tryRequest(
                    "loadjson?get=age&path=/Users/tyype1/Desktop/Brown/sem3/CS32/Projects/repl-kganesh-tpezza/repl/Backend/data/basicjson.json");
    assertEquals(200, clientConnection.getResponseCode());

    Moshi moshi = new Moshi.Builder().build();
    LoadJsonHandler.JsonSuccessfullyLoaded response =
            moshi
                    .adapter(LoadJsonHandler.JsonSuccessfullyLoaded.class)
                    .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("30", response.filePath());

    clientConnection.disconnect();
  }

  @org.junit.jupiter.api.Test
  public void testJson2() throws IOException {
    HttpURLConnection clientConnection =
            tryRequest(
                    "loadjson?get=age&path=/Users/tyype1/Desktop/Brown/sem3/CS32/Projects/repl-kganesh-tpezza/repl/Backend/data/secondjson.json");
    assertEquals(200, clientConnection.getResponseCode());

    Moshi moshi = new Moshi.Builder().build();
    LoadJsonHandler.JsonSuccessfullyLoaded response =
            moshi
                    .adapter(LoadJsonHandler.JsonSuccessfullyLoaded.class)
                    .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("30", response.filePath());

    clientConnection.disconnect();
  }

  /**
   * Test for loadcsv with no params
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void testLoadNoPathParam() throws IOException {
    HttpURLConnection clientConnection =
            tryRequest(
                    "loadcsv?pa=/Users/tyype1/Desktop/Brown/sem3/CS32" +
                            "/Projects/repl-kganesh-tpezza/repl/ServerRepl/data" +
                            "/census/dol_ri_earnings_disparity.csv");
    assertEquals(200, clientConnection.getResponseCode());

    Moshi moshi = new Moshi.Builder().build();
    LoadHandler.FileFailureLoaded response =
        moshi
            .adapter(LoadHandler.FileFailureLoaded.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals("Requested parameter 'pa', must be 'path'", response.ERRORMESSAGE());

    clientConnection.disconnect();
  }

  /**
   * Test for load csv with more than one param (path)
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void loadTooManyParams() throws IOException {
    HttpURLConnection clientConnection =
            tryRequest(
                    "loadcsv?path=/Users/tyype1/Desktop/Brown/sem3/CS32" +
                            "/Projects/repl-kganesh-tpezza/repl/ServerRepl/data" +
                            "/census/dol_ri_earnings_disparity.csv&no=");
    assertEquals(200, clientConnection.getResponseCode());

    Moshi moshi = new Moshi.Builder().build();
    LoadHandler.FileFailureLoaded response =
        moshi
            .adapter(LoadHandler.FileFailureLoaded.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals(
        "Must only request one parameter 'path. Requested " + "[path, no]",
        response.ERRORMESSAGE());

    clientConnection.disconnect();
  }

  /**
   * Test for load csv with path not existing
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void loadBadPath() throws IOException {
    HttpURLConnection clientConnection =
            tryRequest(
                    "loadcsv?path=/Users/tyype1/server-tonybzhao-tyypezza/data/census/"
                            + "dol_ri_earnings_disparity.csv");
    assertEquals(200, clientConnection.getResponseCode());

    Moshi moshi = new Moshi.Builder().build();
    LoadHandler.FileFailureLoaded response =
        moshi
            .adapter(LoadHandler.FileFailureLoaded.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals(
        "Requested path "
            + "/Users/tyype1/server-tonybzhao-tyypezza/data/census/"
            + "dol_ri_earnings_disparity.csv"
            + " was not found. Request to load a valid path.",
        response.ERRORMESSAGE());

    clientConnection.disconnect();
  }

  /**
   * Test for search csv with no csv loaded
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void testSearchNotLoaded() throws IOException {
    HttpURLConnection clientConnection = tryRequest("searchcsv?item=ri");
    assertEquals(200, clientConnection.getResponseCode());

    Moshi moshi = new Moshi.Builder().build();
    SearchHandler.FailureToSearch response =
        moshi
            .adapter(SearchHandler.FailureToSearch.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals(
        "No csv loaded. Use endpoint 'loadcsv' with a path " + "to your csv to load, then search.",
        response.ERRORMESSAGE());

    clientConnection.disconnect();
  }

  /**
   * Test for search csv with no param term to search
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void testNoSearchTerm() throws IOException {
    HttpURLConnection clientConnection =
            tryRequest(
                    "loadcsv?path=/Users/tyype1/Desktop/Brown/sem3/CS32" +
                            "/Projects/repl-kganesh-tpezza/repl/ServerRepl/data" +
                            "/census/dol_ri_earnings_disparity.csv");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection = tryRequest("searchcsv?item");

    Moshi moshi = new Moshi.Builder().build();
    SearchHandler.FailureToSearch response =
        moshi
            .adapter(SearchHandler.FailureToSearch.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals("Must have parameter 'term' for term to search.", response.ERRORMESSAGE());

    clientConnection.disconnect();
  }

  /**
   * Test for search csv with no header name to identify column
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void testNoHeaderName() throws IOException {
    HttpURLConnection clientConnection =
            tryRequest(
                    "loadcsv?path=/Users/tyype1/Desktop/Brown/sem3/CS32" +
                            "/Projects/repl-kganesh-tpezza/repl/ServerRepl/data" +
                            "/census/dol_ri_earnings_disparity.csv");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection = tryRequest("searchcsv?term=ri&hasHeaders=true&type=header");

    Moshi moshi = new Moshi.Builder().build();
    SearchHandler.FailureToSearch response =
        moshi
            .adapter(SearchHandler.FailureToSearch.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals(
        "Since you are trying to search by header, "
            + "you must request parameter 'column' equal to "
            + "header name you want to search.",
        response.ERRORMESSAGE());

    clientConnection.disconnect();
  }

  /**
   * Test for search csv when type param is not header or index
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void testIncorrectType() throws IOException {
    HttpURLConnection clientConnection =
            tryRequest(
                    "loadcsv?path=/Users/tyype1/Desktop/Brown/sem3/CS32" +
                            "/Projects/repl-kganesh-tpezza/repl/ServerRepl/data" +
                            "/census/dol_ri_earnings_disparity.csv");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection = tryRequest("searchcsv?term=ri&hasHeaders=true&type=h");

    Moshi moshi = new Moshi.Builder().build();
    SearchHandler.FailureToSearch response =
        moshi
            .adapter(SearchHandler.FailureToSearch.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals(
        "Parameter 'type' must be either 'header' to search by header "
            + "name, or 'index' to search by column index.",
        response.ERRORMESSAGE());

    clientConnection.disconnect();
  }

  /**
   * Test for search csv where hasHeaders param is not true or false
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void testIncorrectHeader() throws IOException {
    HttpURLConnection clientConnection =
            tryRequest(
                    "loadcsv?path=/Users/tyype1/Desktop/Brown/sem3/CS32" +
                            "/Projects/repl-kganesh-tpezza/repl/ServerRepl/data" +
                            "/census/dol_ri_earnings_disparity.csv");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection = tryRequest("searchcsv?term=ri&hasHeaders=yes");

    Moshi moshi = new Moshi.Builder().build();
    SearchHandler.FailureToSearch response =
        moshi
            .adapter(SearchHandler.FailureToSearch.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals("Parameter hasHeaders must be either 'true' or 'false'.", response.ERRORMESSAGE());

    clientConnection.disconnect();
  }

  /**
   * Test for search csv where index to search is not a number
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void testIndexNotNum() throws IOException {
    HttpURLConnection clientConnection =
            tryRequest(
                    "loadcsv?path=/Users/tyype1/Desktop/Brown/sem3/CS32" +
                            "/Projects/repl-kganesh-tpezza/repl/ServerRepl/data" +
                            "/census/dol_ri_earnings_disparity.csv");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection = tryRequest("searchcsv?term=ri&hasHeaders=true&type=index&column=hi");

    Moshi moshi = new Moshi.Builder().build();
    SearchHandler.FailureToSearch response =
        moshi
            .adapter(SearchHandler.FailureToSearch.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals(
        "Parameter 'column', if index, must be a number " + "(1, 15, 0). You requested hi",
        response.ERRORMESSAGE());

    clientConnection.disconnect();
  }

  /**
   * Test for search csv where search is success
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void testSuccess() throws IOException {
    HttpURLConnection clientConnection =
            tryRequest(
                    "loadcsv?path=/Users/tyype1/Desktop/Brown/sem3/CS32" +
                            "/Projects/repl-kganesh-tpezza/repl/ServerRepl/data" +
                            "/census/dol_ri_earnings_disparity.csv");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection = tryRequest("searchcsv?term=ri&");

    Moshi moshi = new Moshi.Builder().build();
    SearchHandler.SuccessfullySearched response =
        moshi
            .adapter(SearchHandler.SuccessfullySearched.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals("'ri' Was found in 6 rows.", response.SUCCESSMESSAGE());
    clientConnection.disconnect();
  }

  /**
   * Test for search csv where search is a success, but item is not found
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void testSuccessNotFound() throws IOException {
    HttpURLConnection clientConnection =
            tryRequest(
                    "loadcsv?path=/Users/tyype1/Desktop/Brown/sem3/CS32" +
                            "/Projects/repl-kganesh-tpezza/repl/ServerRepl/data" +
                            "/census/dol_ri_earnings_disparity.csv");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection = tryRequest("searchcsv?term=hooo&");

    Moshi moshi = new Moshi.Builder().build();
    SearchHandler.SuccessfullySearched response =
        moshi
            .adapter(SearchHandler.SuccessfullySearched.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals("'hooo' Was not found.", response.SUCCESSMESSAGE());

    clientConnection.disconnect();
  }

  /**
   * Test for view csv where not csv is loaded
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void testViewNotLoaded() throws IOException {
    HttpURLConnection clientConnection = tryRequest("viewcsv?");
    assertEquals(200, clientConnection.getResponseCode());

    Moshi moshi = new Moshi.Builder().build();
    ViewHandler.ViewLoadedFile response =
        moshi
            .adapter(ViewHandler.ViewLoadedFile.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals("error_datasource", response.result());

    clientConnection.disconnect();
  }

  /**
   * Test for load csv success
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void testViewSuccess() throws IOException {
    HttpURLConnection clientConnection =
            tryRequest(
                    "loadcsv?path=/Users/tyype1/Desktop/Brown/sem3/CS32" +
                            "/Projects/repl-kganesh-tpezza/repl/ServerRepl/data" +
                            "/census/dol_ri_earnings_disparity.csv");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection = tryRequest("viewcsv");

    Moshi moshi = new Moshi.Builder().build();
    ViewHandler.ViewLoadedFile response =
        moshi
            .adapter(ViewHandler.ViewLoadedFile.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals("success", response.result());

    clientConnection.disconnect();
  }

  @org.junit.jupiter.api.Test
  public void testWildcard() throws IOException {
    HttpURLConnection clientConnection = tryRequest("fjsu");
    // assertEquals(200, clientConnection.getResponseCode());

    Moshi moshi = new Moshi.Builder().build();
    WildCardHandler.EndpointNotFound response =
        moshi
            .adapter(WildCardHandler.EndpointNotFound.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals(
        "Endpoint was not valid. Must be one of "
            + "'loadcsv', 'searchcsv', 'viewcsv', or 'broadband'",
        response.ERRORMESSAGE());

    clientConnection.disconnect();
  }
}
