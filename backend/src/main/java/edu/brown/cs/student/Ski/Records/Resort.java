package edu.brown.cs.student.Ski.Records;

/**
 * A record representing information about a ski resort.
 *
 * @param name           The name of the ski resort.
 * @param liftsOpen      The number of lifts open at the resort.
 * @param info           Basic information about the resort.
 * @param weatherForecast The weather forecast for the resort.
 * @param snowForecast   The snow forecast for the resort.
 */
public record Resort(String name, Integer liftsOpen, ResortInfo info, WeatherForecast weatherForecast, SnowForecast snowForecast) {
}
