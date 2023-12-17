package edu.brown.cs.student.Ski;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import edu.brown.cs.student.server.ACS.DatasourceException;
import edu.brown.cs.student.server.ACS.StateIds;
import edu.brown.cs.student.server.Search.ColumnIdentifier;
import edu.brown.cs.student.server.Search.Search;
import okio.Buffer;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static spark.Spark.connect;

public class ScrapeRetrieval {

    private Map<String, String> lifts;

    public ScrapeRetrieval(){
        this.lifts = new HashMap<>();
    }

    private static String resolveStateID(StateIds states, String stateName)
            throws DatasourceException {
        try {
            if (states.isStateToIdsEmpty()) {
                URL requestURL =
                        new URL("http://localhost:3000/scrape");
                HttpURLConnection clientConnection = connect(requestURL);
                Moshi moshi = new Moshi.Builder().build();
                JsonAdapter<List> jsonAdapter = moshi.adapter(List.class);
                List<List<String>> body =
                        jsonAdapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
                clientConnection.disconnect();
                Search search =
                        new Search(body, stateName, ColumnIdentifier.Identifier.NONE, "", true, false);
                List<List<String>> stateRow = search.searchParsed();
                if (stateRow.isEmpty()) {
                    throw new DatasourceException("State not found");
                }
                states.setStatesToIds(body);
                String stateID = stateRow.get(0).get(1);
                if (body == null) throw new DatasourceException("Malformed response from ACS");

                return stateID;
            } else {
                Search search =
                        new Search(
                                states.getStatesToIds(),
                                stateName,
                                ColumnIdentifier.Identifier.NONE,
                                "",
                                true,
                                false);
                String stateID = search.searchParsed().get(0).get(1);
                return stateID;
            }
        } catch (IOException e) {
            throw new DatasourceException(e.getMessage());
        }
    }

    private static HttpURLConnection connect(URL requestURL) throws IOException, DatasourceException {
        URLConnection urlConnection = requestURL.openConnection();
        if (!(urlConnection instanceof HttpURLConnection)) {
            throw new DatasourceException("unexpected: result of connection wasn't HTTP");
        }
        HttpURLConnection clientConnection = (HttpURLConnection) urlConnection;
        clientConnection.connect();
        if (clientConnection.getResponseCode() != 200) {
            throw new DatasourceException(
                    // Only ever found when county is too small
                    "Server error");
        }
        return clientConnection;
    }
}
