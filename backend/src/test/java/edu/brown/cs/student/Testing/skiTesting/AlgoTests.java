package edu.brown.cs.student.Testing.skiTesting;

import edu.brown.cs.student.Ski.PreferenceAlgo;
import edu.brown.cs.student.Ski.Records.BasicInfo;
import edu.brown.cs.student.Ski.Records.DayForecast;
import edu.brown.cs.student.Ski.Records.ForecastDetails;
import edu.brown.cs.student.Ski.Records.Resort;
import edu.brown.cs.student.Ski.Records.ResortInfo;
import edu.brown.cs.student.Ski.Records.SnowForecast;
import edu.brown.cs.student.Ski.Records.WeatherForecast;
import java.util.ArrayList;
import java.util.List;
import org.junit.Before;
import org.junit.Test;

public class AlgoTests {
  private List<Resort> basicResortList;
  @Before
  public void setup() {
    this.basicResortList = new ArrayList<>();
    //Resort1 setup
    ResortInfo info1 = new ResortInfo("resort1","England","12");
    List<DayForecast> forecastList1 = new ArrayList<>();
    DayForecast day1 = new DayForecast("monday",
        new ForecastDetails("null","23","N","YES","NO","18","10",
            "4","7","23"),
        new ForecastDetails("null","23","N","YES","NO","18","10",
            "4","7","23"),
        new ForecastDetails("null","23","N","YES","NO","18","10",
            "4","7","23"));
    DayForecast day2 = new DayForecast("tuesday",
        new ForecastDetails("null","23","N","YES","NO","18","10",
            "4","7","23"),
        new ForecastDetails("null","23","N","YES","NO","18","10",
            "4","7","23"),
        new ForecastDetails("null","23","N","YES","NO","18","10",
            "4","7","23"));
    DayForecast day3 = new DayForecast("wednesday",
        new ForecastDetails("null","23","N","YES","NO","18","10",
            "4","7","23"),
        new ForecastDetails("null","23","N","YES","NO","18","10",
            "4","7","23"),
        new ForecastDetails("null","23","N","YES","NO","18","10",
            "4","7","23"));
    DayForecast day4 = new DayForecast("thursday",
        new ForecastDetails("null","23","N","YES","NO","18","10",
            "4","7","23"),
        new ForecastDetails("null","23","N","YES","NO","18","10",
            "4","7","23"),
        new ForecastDetails("null","23","N","YES","NO","18","10",
            "4","7","23"));
    DayForecast day5 = new DayForecast("friday",
        new ForecastDetails("null","23","N","YES","NO","18","10",
            "4","7","23"),
        new ForecastDetails("null","23","N","YES","NO","18","10",
            "4","7","23"),
        new ForecastDetails("null","23","N","YES","NO","18","10",
            "4","7","23"));
    forecastList1.add(day1);
    forecastList1.add(day2);
    forecastList1.add(day3);
    forecastList1.add(day4);
    forecastList1.add(day5);
    BasicInfo basicInfo1 = new BasicInfo("Europe","resort1","www.x.com","2000","400","200","15","16");
    WeatherForecast weather1 = new WeatherForecast(forecastList1,"sunny","sunny",basicInfo1);
    SnowForecast snow1 = new SnowForecast("15","8","7","22 Jan 2022",basicInfo1);
    Resort resort1 = new Resort("resort1","2", info1, weather1,snow1);

    //Resort2 setup
    ResortInfo info2 = new ResortInfo("resort2","Denmark","10");
    List<DayForecast> forecastList2 = new ArrayList<>();
    DayForecast secondDay1 = new DayForecast("monday",
        new ForecastDetails("null","17","N","YES","NO","6","3",
            "4","7","23"),
        new ForecastDetails("null","18","N","YES","NO","3","2",
            "4","7","23"),
        new ForecastDetails("null","17","N","YES","NO","2","6",
            "4","7","23"));
    DayForecast secondDay2 = new DayForecast("tuesday",
        new ForecastDetails("null","17","N","YES","NO","8","6",
            "4","7","23"),
        new ForecastDetails("null","20","N","YES","NO","12","2",
            "4","7","23"),
        new ForecastDetails("null","17","N","YES","NO","5","10",
            "4","7","23"));
    DayForecast secondDay3 = new DayForecast("wednesday",
        new ForecastDetails("null","17","N","YES","NO","3","0",
            "4","7","23"),
        new ForecastDetails("null","19","N","YES","NO","2","1",
            "4","7","23"),
        new ForecastDetails("null","18","N","YES","NO","9","4",
            "4","7","23"));
    DayForecast secondDay4 = new DayForecast("thursday",
        new ForecastDetails("null","22","N","YES","NO","8","10",
            "4","7","23"),
        new ForecastDetails("null","23","N","YES","NO","7","1",
            "4","7","23"),
        new ForecastDetails("null","14","N","YES","NO","7","4",
            "4","7","23"));
    DayForecast secondDay5 = new DayForecast("friday",
        new ForecastDetails("null","8","N","YES","NO","6","4",
            "4","7","23"),
        new ForecastDetails("null","18","N","YES","NO","6","2",
            "4","7","23"),
        new ForecastDetails("null","19","N","YES","NO","6","3",
            "4","7","23"));
    forecastList2.add(secondDay1);
    forecastList2.add(secondDay2);
    forecastList2.add(secondDay3);
    forecastList2.add(secondDay4);
    forecastList2.add(secondDay5);
    BasicInfo basicInfo2 = new BasicInfo("Europe","resort2","www.x.com","5000","1200","900","15","16");
    WeatherForecast weather2 = new WeatherForecast(forecastList2,"sunny","sunny",basicInfo2);
    SnowForecast snow2 = new SnowForecast("15","8","7","5 Feb 2022",basicInfo2);
    Resort resort2 = new Resort("resort2","1", info2, weather2,snow2);

    //Setup Resort3
    ResortInfo info3 = new ResortInfo("resort3","Switzerland","19");
    List<DayForecast> forecastList3 = new ArrayList<>();
    DayForecast thirdDay1 = new DayForecast("monday",
        new ForecastDetails("null","3","N","YES","NO","17","14",
            "4","7","23"),
        new ForecastDetails("null","4","N","YES","NO","18","13",
            "4","7","23"),
        new ForecastDetails("null","2","N","YES","NO","19","13",
            "4","7","23"));
    DayForecast thirdDay2 = new DayForecast("tuesday",
        new ForecastDetails("null","4","N","YES","NO","19","13",
            "4","7","23"),
        new ForecastDetails("null","4","N","YES","NO","16","12",
            "4","7","23"),
        new ForecastDetails("null","7","N","YES","NO","19","13",
            "4","7","23"));
    DayForecast thirdDay3 = new DayForecast("wednesday",
        new ForecastDetails("null","8","N","YES","NO","17","12",
            "4","7","23"),
        new ForecastDetails("null","3","N","YES","NO","18","14",
            "4","7","23"),
        new ForecastDetails("null","4","N","YES","NO","14","14",
            "4","7","23"));
    DayForecast thirdDay4 = new DayForecast("thursday",
        new ForecastDetails("null","6","N","YES","NO","16","12",
            "4","7","23"),
        new ForecastDetails("null","4","N","YES","NO","19","14",
            "4","7","23"),
        new ForecastDetails("null","3","N","YES","NO","18","14",
            "4","7","23"));
    DayForecast thirdDay5 = new DayForecast("friday",
        new ForecastDetails("null","2","N","YES","NO","16","12",
            "4","7","23"),
        new ForecastDetails("null","4","N","YES","NO","15","14",
            "4","7","23"),
        new ForecastDetails("null","5","N","YES","NO","16","12",
            "4","7","23"));
    forecastList3.add(thirdDay1);
    forecastList3.add(thirdDay2);
    forecastList3.add(thirdDay3);
    forecastList3.add(thirdDay4);
    forecastList3.add(thirdDay5);
    BasicInfo basicInfo3 = new BasicInfo("Europe","resort3","www.x.com","400","300","100","15","16");
    WeatherForecast weather3 = new WeatherForecast(forecastList3,"sunny","sunny",basicInfo3);
    SnowForecast snow3 = new SnowForecast("15","8","7","4 Jan 2023",basicInfo3);
    Resort resort3 = new Resort("resort3","9", info3, weather3,snow3);

    this.basicResortList.add(resort1);
    this.basicResortList.add(resort2);
    this.basicResortList.add(resort3);


  }

  @Test
  public void testBasicAlgo() {
    Integer totalSnowfallWeight = 2;
    Integer snowfallRecencyWeight = 3;
    Integer baseDepthWeight = 1;
    Integer priceWeight = 6;
    Integer liftsWeight = 2;
    Integer elevationWeight = 2;
    Integer tempWeight = 1;
    Integer windWeight = 1;


    PreferenceAlgo algo = new PreferenceAlgo(this.basicResortList);
    System.out.println(algo.calculateResortScores(totalSnowfallWeight,snowfallRecencyWeight,baseDepthWeight,
    priceWeight,liftsWeight,elevationWeight,tempWeight,windWeight));
  }

}
