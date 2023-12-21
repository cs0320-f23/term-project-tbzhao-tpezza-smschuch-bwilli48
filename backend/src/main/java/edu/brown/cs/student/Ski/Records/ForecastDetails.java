package edu.brown.cs.student.Ski.Records;

/**
 * A record representing detailed forecast information.
 *
 * @param summary      A summary of the forecast.
 * @param windSpeed    The forecasted wind speed.
 * @param windDirection The forecasted wind direction.
 * @param snow         The forecasted snowfall.
 * @param rain         The forecasted rainfall.
 * @param maxTemp      The forecasted maximum temperature.
 * @param minTemp      The forecasted minimum temperature.
 * @param windChill    The forecasted wind chill.
 * @param humidity     The forecasted humidity.
 * @param freezeLevel  The forecasted freeze level.
 */
public record ForecastDetails(String summary, String windSpeed, String windDirection, String snow, String rain,
                              String maxTemp,  String minTemp, String windChill, String humidity, String freezeLevel) {
}
