package edu.brown.cs.student.Testing.SkiTesting;

import edu.brown.cs.student.Ski.Records.SnowForecast;
import edu.brown.cs.student.Ski.Records.WeatherForecast;
import edu.brown.cs.student.Ski.ResortConditions;
import edu.brown.cs.student.Ski.ResortList;
import edu.brown.cs.student.Ski.SnowConditions;
import edu.brown.cs.student.server.ACS.DatasourceException;
import org.junit.Test;


import java.io.IOException;

import static org.testng.AssertJUnit.assertEquals;


public class APITests {
    @Test
    public void testWeather() throws IOException, InterruptedException, DatasourceException {
    ResortConditions conditions = new ResortConditions();
   WeatherForecast forecast1 = conditions.getForecast("Schladming – Planai/\u200B\u200BHochwurzen/\u200B\u200BHauser Kaibling/\u200B\u200BReiteralm (4-Berge-Skischaukel)");
        assertEquals("Les%203%20Vallées%20–%20Val%20Thorens", conditions.regexInput("Les 3 Vallées – Val Thorens/​Les Menuires/​Méribel/​Courchevel"));

   WeatherForecast forecast2 = conditions.getForecast("Crystal Mountain");
        assertEquals("Crystal%20Mountain", conditions.regexInput("Crystal Mountain"));
        System.out.println(forecast1);
        System.out.println(forecast2);
    }

    @Test
    public void testSnow() throws IOException, InterruptedException, DatasourceException {
        SnowConditions conditions = new SnowConditions();
        SnowForecast forecast1 = conditions.getForecast("Schladming – Planai/\u200B\u200BHochwurzen/\u200B\u200BHauser Kaibling/\u200B\u200BReiteralm (4-Berge-Skischaukel)");
        assertEquals("Les%203%20Vallées%20–%20Val%20Thorens", conditions.regexInput("Les 3 Vallées – Val Thorens/​Les Menuires/​Méribel/​Courchevel"));

        SnowForecast forecast2 = conditions.getForecast("Crystal Mountain");
        assertEquals("Crystal%20Mountain", conditions.regexInput("Crystal Mountain"));
        System.out.println(forecast1);
        System.out.println(forecast2);
    }
}
