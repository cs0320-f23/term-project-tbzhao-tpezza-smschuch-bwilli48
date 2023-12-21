package edu.brown.cs.student.Ski;

import edu.brown.cs.student.CSVCode.Parsing.CreatorFromRow;
import edu.brown.cs.student.CSVCode.Parsing.FactoryFailureException;
import edu.brown.cs.student.CSVCode.Parsing.Parse;

import edu.brown.cs.student.Ski.Records.ResortInfo;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * A class representing a list of ski resorts and their information.
 */
public class ResortList {
    private String path;
    private CreatorFromRow <List<String>> resortCreator;
   // private List<List<String>> resortList;
    private HashMap<String, ResortInfo> resortMap;

    /**
     * Default constructor for the ResortList class. Initializes the path and resort creator,
     * and parses the resorts from the CSV file.
     *
     * @throws IOException If an I/O error occurs during file reading.
     */
    public ResortList() throws IOException {
        String filePath = new File("").getAbsolutePath();
        System.out.println(filePath);
        this.path = filePath + "/data/Mocked.csv";
        this.creatorNameHelper();
        this.parseResorts();
        //System.out.println(this.resortMap);
    }

    /**
     * Helper method to set up the creator for parsing resort information from CSV rows.
     */
    private void creatorNameHelper(){
        this.resortCreator =
                new CreatorFromRow <List<String>>() {
                    @Override
                    public List<String> create(List<String> row) throws FactoryFailureException {
                        List<String> locationList = new ArrayList<String>();
                        locationList.add(row.get(0));
                        locationList.add(row.get(1));
                        locationList.add(row.get(2));
                        return locationList;
                    }
                };
    }

    /**
     * Parses the resorts from the CSV file and populates the resort map.
     */
    private void parseResorts(){
        try{
            Reader reader = new FileReader(this.path);
            Parse<List<String>> resortParser = new Parse<List<String>>(reader, this.resortCreator);
            List<List<String>> resortList = resortParser.parse();
            //System.out.println(resortList);

            this.resortMap = new HashMap<String, ResortInfo>();
            for (int i = 1; i < resortList.size(); i++) {
                ResortInfo info = new ResortInfo(resortList.get(i).get(1), resortList.get(i).get(2), resortList.get(i).get(0));
                this.resortMap.put(resortList.get(i).get(1).toLowerCase(), info);
            }
        } catch (FileNotFoundException f){
            System.out.println(f.getMessage());
        }
    }

    /**
     * Gets the resort map containing resort names as keys and corresponding ResortInfo objects as values.
     *
     * @return The resort map.
     */
    public HashMap<String, ResortInfo> getResortMap(){
        return this.resortMap;
    }

    /**
     * Gets a list of resort names.
     *
     * @return The list of resort names.
     */
    public List<String> getResortNames(){
        ArrayList<String> names = new ArrayList<>();

        ArrayList<ResortInfo> info = new ArrayList<>(this.resortMap.values());
        for (int i = 0; i < info.size(); i++) {
            names.add(info.get(i).resortName());
        }
        return names;
    }
}
