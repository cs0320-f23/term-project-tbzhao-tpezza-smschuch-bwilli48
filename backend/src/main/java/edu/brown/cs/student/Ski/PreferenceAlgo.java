package edu.brown.cs.student.Ski;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.Ski.Records.DayForecast;
import edu.brown.cs.student.Ski.Records.Resort;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import spark.Request;
import spark.Response;
import spark.Route;

public class PreferenceAlgo implements Route {
  private int totalSnowfallWeight;
  private int snowfallRecencyWeight;
  private int baseDepthWeight;
  private int priceWeight;
  private int liftsWeight;
  private int elevationWeight;
  private int tempWeight;
  private int windWeight;
  private int totalSnowfallPreference;
  private String snowfallRecencyPreference;
  private int baseDepthPreference;
  private int pricePreference;
  private int liftsPreference;
  private int elevationPreference;
  private int tempPreference;
  private int windPreference;
  private List<Resort> skiResortList;
  private Map<String, Integer> preferenceMap;
  private Map<String, Integer> scoreMap;

  public PreferenceAlgo(List<Resort> skiResortList) {


    this.skiResortList = skiResortList;
    this.scoreMap = new HashMap<>();
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Set<String> params = request.queryParams();
    String preferences = request.queryParams("preferences");
    if (params.size() != 1) {
      return "Must input preferences in the JSON format";
    }
    Moshi moshi = new Moshi.Builder().build();
    Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Map.class, String.class, String.class);
    JsonAdapter<Map<String,Map<String,String>>> jsonAdapter = moshi.adapter(mapStringObject);
    Map<String,Map<String,String>> preferenceMap = jsonAdapter.fromJson(preferences);
    this.parseMap(preferenceMap);
    return this.sortHashMapByValues(this.calculateResortScores());
  }
  public void parseMap(Map<String,Map<String,String>> preferenceMap) {
    this.totalSnowfallWeight = Integer.parseInt(preferenceMap.get("snowfallamount").get("weight"));
    this.totalSnowfallPreference = Integer.parseInt(preferenceMap.get("snowfallamount").get("value"));
    this.snowfallRecencyWeight = Integer.parseInt(preferenceMap.get("lastsnowfall").get("weight"));
    this.snowfallRecencyPreference = preferenceMap.get("lastsnowfall").get("value");
    this.baseDepthWeight = Integer.parseInt(preferenceMap.get("basedepth").get("weight"));
    this.baseDepthPreference = Integer.parseInt(preferenceMap.get("basedepth").get("value"));
    this.priceWeight = Integer.parseInt(preferenceMap.get("price").get("weight"));
    this.pricePreference = Integer.parseInt(preferenceMap.get("price").get("value"));
    this.liftsWeight = Integer.parseInt(preferenceMap.get("lifts").get("weight"));
    this.liftsPreference = Integer.parseInt(preferenceMap.get("lifts").get("value"));
    this.elevationWeight = Integer.parseInt(preferenceMap.get("elevation").get("weight"));
    this.elevationPreference = Integer.parseInt(preferenceMap.get("elevation").get("value"));
    this.tempWeight = Integer.parseInt(preferenceMap.get("temperature").get("weight"));
    this.tempPreference = Integer.parseInt(preferenceMap.get("temperature").get("value"));
    this.windWeight = Integer.parseInt(preferenceMap.get("windspeed").get("weight"));
    this.windPreference = Integer.parseInt(preferenceMap.get("windspeed").get("value"));
  }


  //Sorts the score map from the highest scoring resorts to the lowest scoring ones
  public List<String> sortHashMapByValues(Map<String, Integer> hashMap) {
    // Create a stream from the entries of the HashMap
    List<String> sortedStrings = hashMap.entrySet().stream()
        // Sort by values in descending order
        .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
        // Collect the keys (strings) into a list
        .map(Map.Entry::getKey)
        // Collect the sorted keys into a list
        .toList();

    return sortedStrings;
  }


  private Map<String,Integer> calculateResortScores() {
    for (Resort resort : this.skiResortList) {
      int score = (this.getTotalSnowfallAccuracy(resort)*this.totalSnowfallWeight) +
          (this.getSnowfallRecencyAccuracy(resort)*this.snowfallRecencyWeight) +
          (this.getBaseDepthAccuracy(resort)*this.baseDepthWeight) +
          (this.getPriceAccuracy(resort)*this.priceWeight) +
          (this.getLiftsAccuracy(resort)*this.liftsWeight) +
          (this.getElevationAccuracy(resort)*this.elevationWeight) +
          (this.getTempAccuracy(resort)*this.tempWeight) +
          (this.getWindAccuracy(resort)*this.windWeight);
      this.scoreMap.put(resort.name(), score);
    }
    return this.scoreMap;
  }

  //will have one for each preference being used
  private int getTotalSnowfallAccuracy(Resort resort) {
    int score = 0;
    String totalSnow = resort.snowForecast().freshSnowfall();
    if (totalSnow != null) {
      int difference = Math.abs(
          Integer.parseInt(totalSnow) - this.totalSnowfallPreference);
      if (difference < 1000) {
        score = 100;
      } else if (difference < 2000) {
        score = 75;
      } else {
        score = 50;
      }
      return score;
    }
    return 0;
  }


  private int getSnowfallRecencyAccuracy(Resort resort) {
    int score = 0;
    String dateString = resort.snowForecast().lastSnowfallDate();
    if (dateString != null) {
      String[] splitDate = dateString.split("\\s+");
      //turn date into number now for user's preference:
      String[] splitDatePreference = this.snowfallRecencyPreference.split("\\s+");
      int difference = Math.abs(this.parseDate(splitDate) - this.parseDate(splitDatePreference));
      if (difference < 2) {
        score = 100;
      } else if (difference < 5) {
        score = 75;
      } else {
        score = 50;
      }
      return score;
    }
    return 0;
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
  private int getBaseDepthAccuracy(Resort resort) {
    int score = 0;
    String topSnow = resort.snowForecast().topSnowDepth();
    String bottomSnow = resort.snowForecast().topSnowDepth();
    if (topSnow != null || bottomSnow != null) {
      int topCounter = 0;
      int bottomCounter = 0;
      Boolean oneNull = false;
      if (topSnow == null) {
        topCounter = 0;
        oneNull = true;
      }
      else {
        topCounter = Integer.parseInt(topSnow);
      }
      if (bottomSnow == null) {
        bottomCounter = 0;
        oneNull = true;
      }
      else {
        bottomCounter = Integer.parseInt(bottomSnow);
      }
      int difference = 0;
      if (!oneNull) {
         difference = Math.abs(((topCounter +
            bottomCounter) / 2)
            - this.baseDepthPreference);
      }
      else {
         difference = (topCounter + bottomCounter) - this.baseDepthPreference; //top or bottom is 0
      }
      if (difference < 10) {
        score = 100;
      } else if (difference < 20) {
        score = 75;
      } else {
        score = 50;
      }
      return score;
    }
    return 0;
  }
  private int getPriceAccuracy(Resort resort) {
    int score = 0;
    String price = resort.info().resortPrice();
    if (price != null) {
      int difference = Math.abs(
          Integer.parseInt(resort.info().resortPrice()) - this.pricePreference);
      if (difference < 3) {
        score = 100;
      } else if (difference < 7) {
        score = 75;
      } else {
        score = 50;
      }
      return score;
    }
    return 0;
  }
  private int getLiftsAccuracy(Resort resort) {
    int score = 0;
    String lifts = resort.liftsOpen();
    if (lifts != null) {
      int difference = Math.abs(Integer.parseInt(resort.liftsOpen()) - this.liftsPreference);
      if (difference < 3) {
        score = 100;
      } else if (difference < 5) {
        score = 75;
      } else {
        score = 50;
      }
      return score;
    }
    return 0;
  }
  private int getElevationAccuracy(Resort resort) {
    int score = 0;
    String liftElevation = resort.weatherForecast().basicInfo().topLiftElevation();
    if (liftElevation != null) {
      int difference = Math.abs(
          Integer.parseInt(resort.weatherForecast().basicInfo().topLiftElevation())
              - this.elevationPreference);
      if (difference < 150) {
        score = 100;
      } else if (difference < 500) {
        score = 75;
      } else {
        score = 50;
      }
      return score;
    }
    return 0;
  }
  private int getTempAccuracy(Resort resort) {
    int score = 0;
    List<DayForecast> forecastList = resort.weatherForecast().forecast5Day();
    if (forecastList != null) {
      int difference = Math.abs(this.parseTemp(forecastList) - this.tempPreference);
      if (difference < 5) {
        score = 100;
      } else if (difference < 10) {
        score = 75;
      } else {
        score = 50;
      }
      return score;
    }
    return 0;
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
  private int getWindAccuracy(Resort resort) {
    int score = 0;
    List<DayForecast> forecastList = resort.weatherForecast().forecast5Day();
    if (forecastList != null) {
      int difference = Math.abs(this.parseWind(forecastList) - this.windPreference);
      if (difference < 5) {
        score = 100;
      } else if (difference < 10) {
        score = 75;
      } else {
        score = 50;
      }
      return score;
    }
    return 0;
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

