package edu.brown.cs.student.server.Caching;

import edu.brown.cs.student.Ski.Records.Resort;
import edu.brown.cs.student.Ski.Records.ResortInfo;
import edu.brown.cs.student.Ski.ResortConditions;
import edu.brown.cs.student.Ski.ResortList;
import edu.brown.cs.student.Ski.ScrapeRetrieval;
import edu.brown.cs.student.Ski.SnowConditions;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CachedResorts {
        HashMap<String, Resort> resortHashMap;
        RemoveCacheItem customRemove;
        HashMap<String, Integer> countyFrequency;
        ScrapeRetrieval scraped;



        /**
         * This constructor initializes a hashmap for.resortHashMap, frequency, and the cache removal
         * system.
         */
        public CachedResorts(ResortList list, ScrapeRetrieval scraper) throws IOException, InterruptedException {
            this.resortHashMap = new HashMap<String, Resort>();
            this.countyFrequency = new HashMap<>();
            this.customRemove = new OurRemoveCache(this.countyFrequency);
            this.scraped = scraper;
            this.populateCache(list);
        }

        public Map<String, Resort> getCache(){
            return this.resortHashMap;
        }

        public Resort searchResort(String term){
            List<String> keyList = this.resortHashMap.keySet().stream().toList();
            for (int i = 0; i < keyList.size(); i++) {
                if (keyList.get(i).contains(term.toLowerCase())){
                    return this.resortHashMap.get(keyList.get(i));
                }
            }
            throw new RuntimeException();
        }
        /**
         * This is a getter that returns the list of list of strings for a state.
         *
         * @param stateName State name to be searched
         * @return List of list of strings for a state
         */
        public void populateCache(ResortList list) throws IOException, InterruptedException {
                List<String> nameList = list.getResortNames();
                ResortConditions resortConditions = new ResortConditions();
                SnowConditions snowConditions = new SnowConditions();

                for (String resort: nameList) {
                    try {
                        Resort cached = new Resort(resort, this.scraped.getLift(resort), list.getResortMap().get(resort.toLowerCase()),
                                resortConditions.getForecast(resort), snowConditions.getForecast(resort));
                        this.addResort(resort.toLowerCase(), cached);
                    }  catch (IOException | InterruptedException e) {
                        System.err.println("Error processing forecast for " + resort + ": " + e.getMessage());
                        continue;
                    }
                }
    }

        /**
         * This boolean checks if a county exists in the broadband percentage hashmap.
         *
         * @param countyName County to be checked
         * @return True if county is in, false if not
         */
        public boolean checkCounty(String countyName) {
            if (this.resortHashMap.containsKey(countyName)) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * Method that adds a county to the hashmap. Calls on the removal class to delegate
         * responsibility.
         *
         * @param countyName County to be added
         * @param info Value to be cached
         */
        public void addResort(String name, Resort resort) {
            this.resortHashMap.put(name.toLowerCase(), resort);
        }

        /**
         * Whenever a request is made to a stored county, we add to the frequency tracker. This is
         * utilized by the removal class.
         *
         * @param countyName County name to be searched, frequency is increased
         */
        public void addFrequency(String countyName) {
            int frequencyToAdd = 1 + this.countyFrequency.getOrDefault(countyName, 0);
            this.countyFrequency.put(countyName, frequencyToAdd);
        }

}
