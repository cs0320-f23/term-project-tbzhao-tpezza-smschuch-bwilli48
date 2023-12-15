package edu.brown.cs.student.Ski;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.server.ACS.DatasourceException;
import java.lang.reflect.Type;
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
  private int snowfallRecencyPreference;
  private int baseDepthPreference;
  private int pricePreference;
  private int liftsPreference;
  private int elevationPreference;
  private int tempPreference;
  private int windPreference;
  private List<SkiResort> skiResortList;
  private Map<String, Integer> preferenceMap;
  private Map<String, Integer> scoreMap;

  public PreferenceAlgo(List<SkiResort> skiResortList) {


    this.skiResortList = skiResortList;
    this.scoreMap = new HashMap<>();
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Set<String> params = request.queryParams();
    String preferences = request.queryParams("preferences");
    if (params.size() != 1) {
      throw new DatasourceException("Must input preferences in the JSON format");
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
    this.snowfallRecencyPreference = Integer.parseInt(preferenceMap.get("lastsnowfall").get("value"));
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
    for (SkiResort resort : this.skiResortList) {
      int score = (this.getTotalSnowfallAccuracy(resort)*this.totalSnowfallWeight) +
          (this.getSnowfallRecencyAccuracy(resort)*this.snowfallRecencyWeight) +
          (this.getBaseDepthAccuracy(resort)*this.baseDepthWeight) +
          (this.getPriceAccuracy(resort)*this.priceWeight) +
          (this.getLiftsAccuracy(resort)*this.liftsWeight) +
          (this.getElevationAccuracy(resort)*this.elevationWeight) +
          (this.getTempAccuracy(resort)*this.tempWeight) +
          (this.getWindAccuracy(resort)*this.windWeight);// + this.getPreference2acccuracy(resort) + ...
      score = this.totalSnowfallWeight * score; //accounts for weighted preferences
      this.scoreMap.put(resort.getResortName, score);

    }
    return this.scoreMap;
  }

  //will have one for each preference being used
  private int getTotalSnowfallAccuracy(SkiResort resort) {
    int score = 0;
    int difference = Math.abs(resort.totalSnowfall - this.totalSnowfallPreference);
    if (difference < 1000) {
      score = 100;
    } else if (difference < 2000) {
      score = 75;
    } else {
      score = 50;
    }
    return score;
  }

  private int getSnowfallRecencyAccuracy(SkiResort resort) {
    int score = 0;
    int difference = Math.abs(resort.snowfallRecency - this.snowfallRecencyPreference);
    if (difference < 2) {
      score = 100;
    } else if(difference < 5) {
      score = 75;
    }
    else {
      score = 50;
    }
    return score;
  }
  private int getBaseDepthAccuracy(SkiResort resort) {
    int score = 0;
    int difference = Math.abs(resort.baseDepth - this.baseDepthPreference);
    if (difference < 10) {
      score = 100;
    } else if(difference < 20) {
      score = 75;
    }
    else {
      score = 50;
    }
    return score;
  }
  private int getPriceAccuracy(SkiResort resort) {
    int score = 0;
    int difference = Math.abs(resort.price - this.pricePreference);
    if (difference < 3) {
      score = 100;
    } else if(difference < 7) {
      score = 75;
    }
    else {
      score = 50;
    }
    return score;
  }
  private int getLiftsAccuracy(SkiResort resort) {
    int score = 0;
    int difference = Math.abs(resort.lifts - this.liftsPreference);
    if (difference < 3) {
      score = 100;
    } else if(difference < 5) {
      score = 75;
    }
    else {
      score = 50;
    }
    return score;
  }
  private int getElevationAccuracy(SkiResort resort) {
    int score = 0;
    int difference = Math.abs(resort.elevation - this.elevationPreference);
    if (difference < 150) {
      score = 100;
    } else if(difference < 500) {
      score = 75;
    }
    else {
      score = 50;
    }
    return score;
  }
  private int getTempAccuracy(SkiResort resort) {
    int score = 0;
    int difference = Math.abs(resort.temperature - this.tempPreference);
    if (difference < 5) {
      score = 100;
    } else if(difference < 10) {
      score = 75;
    }
    else {
      score = 50;
    }
    return score;
  }
  private int getWindAccuracy(SkiResort resort) {
    int score = 0;
    int difference = Math.abs(resort.windSpeed - this.windPreference);
    if (difference < 5) {
      score = 100;
    } else if(difference < 10) {
      score = 75;
    }
    else {
      score = 50;
    }
    return score;
  }

}

