package edu.brown.cs.student.Testing.SkiTesting;

import edu.brown.cs.student.Ski.ResortList;
import edu.brown.cs.student.server.ACS.DatasourceException;
import org.junit.Test;


import java.io.IOException;

import static org.testng.AssertJUnit.assertEquals;
public class ListTests {
    @Test
    public void testList() throws IOException, InterruptedException, DatasourceException {
        ResortList list = new ResortList();
        assertEquals(11, list.getResortNames().size());
        assertEquals(11, list.getResortMap().size());
    }

    }
