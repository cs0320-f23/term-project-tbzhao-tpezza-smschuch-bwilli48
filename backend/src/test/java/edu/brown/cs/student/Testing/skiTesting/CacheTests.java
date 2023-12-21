package edu.brown.cs.student.Testing.skiTesting;
import edu.brown.cs.student.Ski.ResortList;
import edu.brown.cs.student.Ski.ScrapeRetrieval;
import edu.brown.cs.student.server.ACS.DatasourceException;
import edu.brown.cs.student.server.Caching.CachedResorts;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;

import static org.testng.AssertJUnit.assertEquals;

/** Class to test the Cache */
public class CacheTests {

    @Test
    public void testCache() throws IOException, InterruptedException, DatasourceException {
        ResortList list = new ResortList();
        ScrapeRetrieval scrapeRetrieval = new ScrapeRetrieval();
        scrapeRetrieval.organize(scrapeRetrieval.retrieve());

        CachedResorts resorts = new CachedResorts(list, scrapeRetrieval);
        assertEquals(11, resorts.getCache().size());

        try {
            resorts.searchResort("unintelligible");
        } catch (RuntimeException e) {
            System.out.println("Caught!");
        }

        assertEquals(resorts.searchResort("Vail"), resorts.getCache().get("vail"));
    }
}
