package edu.brown.cs.student.Ski.Records;
import java.util.List;

/**
 * A record representing the weather forecast for a ski resort.
 *
 * @param forecast5Day      The list of 5-day day-wise forecasts.
 * @param summary3Day       The summary of the weather forecast for the next 3 days.
 * @param summaryDays4To6   The summary of the weather forecast for days 4 to 6.
 * @param basicInfo         Basic information about the resort's location.
 */
public record WeatherForecast(List<DayForecast> forecast5Day, String summary3Day, String summaryDays4To6, BasicInfo basicInfo) {
}
