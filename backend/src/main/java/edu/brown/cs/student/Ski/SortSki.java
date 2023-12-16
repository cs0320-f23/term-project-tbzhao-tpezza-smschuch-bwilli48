package edu.brown.cs.student.Ski;

import edu.brown.cs.student.Ski.Records.Resort;
import java.util.List;

public class SortSki {

  private List<Resort> skiResortList;

  public SortSki(List<Resort> skiResortList) {
    this.skiResortList = skiResortList;
  }


  //will have two endpoints that return a serialized list of skiResorts with all their info back
  // to the frontend

  private List<SkiResort> sortResorts(String attributeType) {
    List<Resort> snowfallList = this.skiResortList;
    String attribute = attributeType;
    int n = snowfallList.size();
    for (int i = 0; i < n - 1; i++) {
      for (int j = 0; j < n - i - 1; j++) {
        if (snowfallList.get(j).attribute > snowfallList.get(j + 1).attribute) {
          // Swap if the current element is greater than the next one
          SkiResort resort = snowfallList.get(j);
          snowfallList.set(j, snowfallList.get(j + 1));
          snowfallList.set(j + 1, resort);
        }
      }
    }
    return snowfallList;
  }
}
