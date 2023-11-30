package edu.brown.cs.student.server.CSV;


import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * LoadedCSV is a class used to pass data between the three csv operation handlers. It allows the
 * csv parsed with loadcsv to be saved and passed into search and view handlers with a reference to
 * this class so they can use the csv.
 */
public class LoadedJson {
    String path;
    /** Allows easy check is a csv has been loaded for search and view csv */
    boolean isLoaded;

    /** Allows search and view to access parsed csv */
    Map<String, Object> loadedJson;

    /**
     * Constructor for Loaded csv Will always initialize with these values, and will be filled when
     * loadcsv is requested
     */
    public LoadedJson() {
        this.path = "";
        this.isLoaded = false;
        this.loadedJson = Collections.emptyMap();
    }

    /**
     * Setter for path
     *
     * @param path csv file path String
     */
    public void setPath(String path) {
        this.path = path;
    }

    /**
     * Getter for path
     *
     * @return csv file path String
     */
    public String getPath() {
        return path;
    }

    /**
     * Setter for isLoaded
     *
     * @param isLoaded boolean if a csv has been loaded
     */
    public void setIsLoaded(boolean isLoaded) {
        this.isLoaded = isLoaded;
    }

    /**
     * Getter for isLoaded
     *
     * @return boolean if csv has been loaded
     */
    public boolean getIsLoaded() {
        return this.isLoaded;
    }

    /**
     * Setter for parsedCSV
     *
     * @param parsedCSV List<List<String>> of the parsed csv
     */
    public void setParsedCSV(Map<String, Object> loadedJson) {
        this.loadedJson = loadedJson;
    }

    /**
     * Getter for parsed csv
     *
     * @return List<List<String>> of the parsed csv
     */
    public Map<String, Object> getParsedCSV() {
        return this.loadedJson;
    }
}

