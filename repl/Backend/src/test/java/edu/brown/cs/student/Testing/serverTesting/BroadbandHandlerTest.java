package edu.brown.cs.student.Testing.serverTesting;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.squareup.moshi.Moshi;
import edu.brown.cs.student.server.ACS.StateIds;
import edu.brown.cs.student.server.Caching.CachedItems;
import edu.brown.cs.student.server.Handlers.BroadbandHandler;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import okio.Buffer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import spark.Spark;

/** Class to test mock requests to ACS api, to test functionality of broadband handler */
public class BroadbandHandlerTest {
  /** Class to setup server for tests */
  @BeforeAll
  public static void setup_before_everything() {
    Spark.port(0);
    // Logger.getLogger("").setLevel(Level.WARNING);
  }

  StateIds states = new StateIds();

  CachedItems cache = new CachedItems();

  /** Class to reset Broadband handler before each test */
  @BeforeEach
  public void setup() {
    states = new StateIds();
    cache = new CachedItems();
    Spark.get("broadband", new BroadbandHandler(cache, states));
    Spark.init();
    Spark.awaitInitialization();
  }

  /** Class to reset server after each test */
  @AfterEach
  public void teardown() {
    Spark.unmap("broadband");
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
   * Test for broadband request with no parameters to test error response
   *
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void testNoBroadbandParams() throws IOException {
    HttpURLConnection clientConnection = tryRequest("broadband");
    assertEquals(200, clientConnection.getResponseCode());

    Moshi moshi = new Moshi.Builder().build();
    BroadbandHandler.BroadbandFailure response =
        moshi
            .adapter(BroadbandHandler.BroadbandFailure.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals("Must have two parameters, 'state' and 'county'.", response.ERRORMESSAGE());

    clientConnection.disconnect();
  }

  /**
   * Test for broadband request incorrect parameters to test error response
   *
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void testIncorrectBroadbandParams() throws IOException {
    HttpURLConnection clientConnection = tryRequest("broadband?state=Maine&count=County");
    assertEquals(200, clientConnection.getResponseCode());

    Moshi moshi = new Moshi.Builder().build();
    BroadbandHandler.BroadbandFailure response =
        moshi
            .adapter(BroadbandHandler.BroadbandFailure.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals("Must have two parameters, 'state' and 'county'.", response.ERRORMESSAGE());

    clientConnection.disconnect();
  }

  /**
   * Test for broadband request with invalid state to test error response
   *
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void testBroadbandIncorrectState() throws IOException {
    HttpURLConnection clientConnection =
        tryRequest("broadband?state=Californi&county=Orange%20County");
    assertEquals(200, clientConnection.getResponseCode());

    Moshi moshi = new Moshi.Builder().build();
    BroadbandHandler.BroadbandFailure response =
        moshi
            .adapter(BroadbandHandler.BroadbandFailure.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals(
        "State 'Californi' was not found. Make sure it is "
            + "spaced correctly. Examples: Maine, Rhode Island",
        response.ERRORMESSAGE());

    clientConnection.disconnect();
  }

  /**
   * Test for broadband request with invalid county to test error response
   *
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void testBroadbandIncorrectCounty() throws IOException {
    HttpURLConnection clientConnection =
        tryRequest("broadband?state=California&county=Oran%20County");
    assertEquals(200, clientConnection.getResponseCode());

    Moshi moshi = new Moshi.Builder().build();
    BroadbandHandler.BroadbandFailure response =
        moshi
            .adapter(BroadbandHandler.BroadbandFailure.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals(
        "County 'Oran County' was not found. Make sure it is "
            + "spaced correctly. Example: Orange County",
        response.ERRORMESSAGE());

    clientConnection.disconnect();
  }

  /**
   * Test for broadband request with county of less than 50,000 to test error response
   *
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void testBroadbandSmallCounty() throws IOException {
    HttpURLConnection clientConnection =
        tryRequest("broadband?state=California&county=Alpine%20County");
    assertEquals(200, clientConnection.getResponseCode());

    Moshi moshi = new Moshi.Builder().build();
    BroadbandHandler.BroadbandFailure response =
        moshi
            .adapter(BroadbandHandler.BroadbandFailure.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals(
        "County 'Alpine County' does not meet the ACS's population"
            + " threshold of over 50,000, so its data was not surveyed. We apologize"
            + " for not being able to give you the desired information.",
        response.ERRORMESSAGE());

    clientConnection.disconnect();
  }

  /**
   * Test for broadband with successful request
   *
   * @throws IOException
   */
  @org.junit.jupiter.api.Test
  public void testBroadbandSuccess() throws IOException {
    HttpURLConnection clientConnection =
        tryRequest("broadband?state=California&county=Orange%20County");
    assertEquals(200, clientConnection.getResponseCode());

    Moshi moshi = new Moshi.Builder().build();
    BroadbandHandler.BroadbandSuccess response =
        moshi
            .adapter(BroadbandHandler.BroadbandSuccess.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertEquals(
        "The percent of households with broadband access in Orange County, "
            + "California is 93.0%. Data surveyed in 2021.",
        response.SUCCESSMESSAGE());

    clientConnection.disconnect();
  }
}
