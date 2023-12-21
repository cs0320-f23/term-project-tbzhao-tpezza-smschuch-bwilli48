package edu.brown.cs.student.Ski;

import edu.brown.cs.student.Ski.Records.DayForecast;
import edu.brown.cs.student.Ski.Records.Resort;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class SortSki implements Route {

  private List<Resort> skiResortList;

  public SortSki(List<Resort> skiResortList) {
    this.skiResortList = skiResortList;
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
   String attribute = request.queryParams("attribute");
   return this.sortResorts(attribute);
  }

  //will have two endpoints that return a serialized list of skiResorts with all their info back
  // to the frontend

  public List<Resort> sortResorts(String attributeType) {
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
      String snowfall = resort.snowForecast().freshSnowfall();
      if (snowfall != null) {
        int snowfallAmount = Integer.parseInt(snowfall);
        return snowfallAmount;
      }
      return 0;
    }
    else if (attributeType.equals("lastsnowfall")) {
      String date = resort.snowForecast().lastSnowfallDate();
      if (date != null) {
        String[] splitDate = date.split("\\s+");
        return this.parseDate(splitDate);
      }
      return 0;
    }
    else if (attributeType.equals("basedepth")) {
      String topDepth = resort.snowForecast().topSnowDepth();
      String bottomDepth = resort.snowForecast().botSnowDepth();
      int topCounter = 0;
      int bottomCounter = 0;
      Boolean oneNull = false;
      if (topDepth != null || bottomDepth != null) {
        if (topDepth == null) {
          oneNull = true;
        }
        else{
          topCounter = Integer.parseInt(topDepth);
        }
        if (bottomDepth == null) {
          oneNull = true;
        }
        else{
          bottomCounter = Integer.parseInt(bottomDepth);
        }
        int baseDepth = 0;
        if (!oneNull) {
          baseDepth = ((Integer.parseInt(resort.snowForecast().botSnowDepth())) +
              (Integer.parseInt(resort.snowForecast().topSnowDepth()))) / 2;
        }
        else {
          baseDepth = topCounter + bottomCounter;
        }
        return baseDepth;
      }
      return 0;
    }
    else if (attributeType.equals("price")) {
      String resortPrice = resort.info().resortPrice();
      if (resortPrice != null) {
        int price = Integer.parseInt(resortPrice);
        return price;
      }
      return 0;
    }
    else if (attributeType.equals("lifts")) {
      String liftNum = resort.liftsOpen();
      if (liftNum != null) {
        int lifts = Integer.parseInt(liftNum);
        return lifts;
      }
      return 0;
    }
    else if (attributeType.equals("elevation")) {
      String resortElevation = resort.weatherForecast().basicInfo().topLiftElevation();
      if (resortElevation != null) {
        int elevation = Integer.parseInt(resortElevation);
        return elevation;
      }
      return 0;
    }
    else if (attributeType.equals("temp")) {
      List<DayForecast> forecastList = resort.weatherForecast().forecast5Day();
      if (forecastList != null) {
        int temp = this.parseTemp(forecastList);
        return temp;
      }
      return 0;
    }
    else {
      List<DayForecast> forecastList = resort.weatherForecast().forecast5Day();
      if (forecastList != null) {
        int wind = this.parseWind(forecastList);
        return wind;
      }
      return 0;
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
    int sizeCounter = 5;
    for(DayForecast day : forecastList) {
      if (day != null) {
        int maxTemp = Integer.parseInt(day.pm().maxTemp());
        int minTemp = Integer.parseInt(day.pm().minTemp());
        int avTemp = (maxTemp + minTemp) / 2;
        tempList.add(avTemp);
      }
      else{
        sizeCounter--;
      }
    }
    int totalTemp = 0;
    for (int i = 0; i<tempList.size(); i++) {
      int temp = tempList.get(i);
      totalTemp += temp;
    }
    int tempScore = totalTemp/sizeCounter;
    return tempScore;
  }
  private int parseWind(List<DayForecast> forecastList) {
    List<Integer> windList = new ArrayList<>();
    int sizeCounter = 5;
    for(DayForecast day : forecastList) {
      if (day != null) {
        int windSpeed = Integer.parseInt(day.pm().windSpeed());
        windList.add(windSpeed);
      }
      else {
        sizeCounter--;
      }
    }
    int totalWind = 0;
    for (int i = 0; i<windList.size(); i++) {
      int wind = windList.get(i);
      totalWind += wind;
    }
    int windScore = totalWind/sizeCounter;
    return windScore;
  }


}
