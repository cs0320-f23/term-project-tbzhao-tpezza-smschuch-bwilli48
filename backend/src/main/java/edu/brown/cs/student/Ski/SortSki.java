package edu.brown.cs.student.Ski;

import edu.brown.cs.student.Ski.Records.DayForecast;
import edu.brown.cs.student.Ski.Records.Resort;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SortSki {

  private List<Resort> skiResortList;

  public SortSki(List<Resort> skiResortList) {
    this.skiResortList = skiResortList;
  }

  //will have two endpoints that return a serialized list of skiResorts with all their info back
  // to the frontend

  private List<Resort> sortResorts(String attributeType) {
    List<Resort> snowfallList = this.skiResortList;
    int n = snowfallList.size();
    for (int i = 0; i < n - 1; i++) {
      for (int j = 0; j < n - i - 1; j++) {
        if (this.getResortAttribute(snowfallList.get(j),attributeType) > this.getResortAttribute(snowfallList.get(j + 1),attributeType)) {
          // Swap if the current element is greater than the next one
          Resort resort = snowfallList.get(j);
          snowfallList.set(j, snowfallList.get(j + 1));
          snowfallList.set(j + 1, resort);
        }
      }
    }
    return snowfallList;
  }

  private int getResortAttribute(Resort resort, String attributeType) {
    if (attributeType.equals("snowfallamount")) {
      int snowfallAmount = Integer.parseInt(resort.snowForecast().freshSnowfall());
      return snowfallAmount;
    }
    else if (attributeType.equals("lastsnowfall")) {
      String date = resort.snowForecast().lastSnowfallDate();
      String[] splitDate = date.split("\\s+");
      return this.parseDate(splitDate);
    }
    else if (attributeType.equals("basedepth")) {
      int baseDepth = ((Integer.parseInt(resort.snowForecast().botSnowDepth())) +
          (Integer.parseInt(resort.snowForecast().topSnowDepth())))/2;
      return baseDepth;
    }
    else if (attributeType.equals("price")) {
      int price = Integer.parseInt(resort.info().resortPrice());
      return price;
    }
    else if (attributeType.equals("lifts")) {
      int lifts = Integer.parseInt(resort.liftsOpen());
      return lifts;
    }
    else if (attributeType.equals("elevation")) {
      int elevation = Integer.parseInt(resort.weatherForecast().basicInfo().topLiftElevation());
      return elevation;
    }
    else if (attributeType.equals("temp")) {
      List<DayForecast> forecastList = resort.weatherForecast().forecast5Day();
      int temp = this.parseTemp(forecastList);
      return temp;
    }
    else {
      List<DayForecast> forecastList = resort.weatherForecast().forecast5Day();
      int wind = this.parseWind(forecastList);
      return wind;
    }
  }

  private int parseDate(String[] splitDate) {
    int day = Integer.parseInt(splitDate[0]);
    int month = Integer.parseInt(splitDate[1]);
    int year = Integer.parseInt(splitDate[2]);

    Map<String, Integer> monthMap = new HashMap<>();
    monthMap.put("Jan", 1);
    monthMap.put("Feb", 2);
    monthMap.put("Mar", 3);
    monthMap.put("Apr", 4);
    monthMap.put("May", 5);
    monthMap.put("Jun", 6);
    monthMap.put("Jul", 7);
    monthMap.put("Sug", 8);
    monthMap.put("Sep", 9);
    monthMap.put("Oct", 10);
    monthMap.put("Nov", 11);
    monthMap.put("Dec", 12);
    int monthNum = monthMap.get(month);
    int score = day + (monthNum*30) + (year*365);
    return score;
  }
  private int parseTemp(List<DayForecast> forecastList) {
    List<Integer> tempList = new ArrayList<>();
    for(DayForecast day : forecastList) {
      int maxTemp = Integer.parseInt(day.pm().maxTemp());
      int minTemp = Integer.parseInt(day.pm().minTemp());
      int avTemp = (maxTemp + minTemp)/2;
      tempList.add(avTemp);
    }
    int totalTemp = 0;
    for (int i = 0; i<tempList.size(); i++) {
      int temp = tempList.get(i);
      totalTemp += temp;
    }
    int tempScore = totalTemp/5;
    return tempScore;
  }
  private int parseWind(List<DayForecast> forecastList) {
    List<Integer> windList = new ArrayList<>();
    for(DayForecast day : forecastList) {
      int windSpeed = Integer.parseInt(day.pm().windSpeed());
      windList.add(windSpeed);
    }
    int totalWind = 0;
    for (int i = 0; i<windList.size(); i++) {
      int wind = windList.get(i);
      totalWind += wind;
    }
    int windScore = totalWind/5;
    return windScore;
  }
}
