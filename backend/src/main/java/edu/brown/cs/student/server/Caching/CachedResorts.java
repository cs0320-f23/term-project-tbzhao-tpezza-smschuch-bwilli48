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

/**
 * A class that manages caching of resort data.
 */
public class CachedResorts {
        HashMap<String, Resort> resortHashMap;
        RemoveCacheItem customRemove;
        HashMap<String, Integer> countyFrequency;
        ScrapeRetrieval scraped;

    /**
     * Constructor for CachedResorts.
     *
     * @param list    The list of resorts.
     * @param scraper The scraper for retrieving resort data.
     * @throws IOException          If an I/O error occurs.
     * @throws InterruptedException If the thread is interrupted.
     */
        public CachedResorts(ResortList list, ScrapeRetrieval scraper) throws IOException, InterruptedException {
            this.resortHashMap = new HashMap<String, Resort>();
            this.countyFrequency = new HashMap<>();
            this.customRemove = new OurRemoveCache(this.countyFrequency);
            this.scraped = scraper;
            this.populateCache(list);
        }

    /**
     * Getter for the resort cache.
     *
     * @return The resort cache.
     */
        public Map<String, Resort> getCache(){
            return this.resortHashMap;
        }

    /**
     * Searches for a resort in the cache based on a search term.
     *
     * @param term The search term.
     * @return The found resort.
     * @throws RuntimeException If the resort is not found.
     */
        public Resort searchResort(String term){
            List<String> keyList = this.resortHashMap.keySet().stream().toList();
            System.out.println(keyList);
            for (int i = 0; i < keyList.size(); i++) {
                if (keyList.get(i).contains(term.toLowerCase())){
                    return this.resortHashMap.get(keyList.get(i));
                }
            }
            throw new RuntimeException();
        }

    /**
     * Populates the resort cache.
     *
     * @param list The list of resorts.
     * @throws IOException          If an I/O error occurs.
     * @throws InterruptedException If the thread is interrupted.
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
         * Method that adds a resort to the cache.
         *
         * @param name Resort name to be added
         * @param resort Resort to be cached
         */
        public void addResort(String name, Resort resort) {
            this.resortHashMap.put(name.toLowerCase(), resort);
        }
}
