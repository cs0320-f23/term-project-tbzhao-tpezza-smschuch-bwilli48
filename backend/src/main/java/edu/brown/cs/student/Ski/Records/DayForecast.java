package edu.brown.cs.student.Ski.Records;

/**
 * A record representing the forecast for a day at a ski resort.
 *
 * @param dayOfWeek The day of the week for the forecast.
 * @param am        The forecast details for the morning.
 * @param pm        The forecast details for the afternoon.
 * @param night     The forecast details for the night.
 */
public record DayForecast(String dayOfWeek, ForecastDetails am, ForecastDetails pm, ForecastDetails night) {
}
