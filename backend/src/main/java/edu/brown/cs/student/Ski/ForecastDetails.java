package edu.brown.cs.student.Ski;

public record ForecastDetails(String summary, String windSpeed, String windDirection, String snow, String rain,
                              String maxTemp,  String minTemp, String windChill, String humidity, String freezeLevel) {
}
