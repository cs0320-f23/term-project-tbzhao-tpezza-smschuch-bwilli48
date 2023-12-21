package edu.brown.cs.student.Ski.Records;

/**
 * A record representing snow forecast information for a ski resort.
 *
 * @param topSnowDepth        The depth of snow at the top of the resort.
 * @param botSnowDepth        The depth of snow at the bottom of the resort.
 * @param freshSnowfall       The amount of fresh snowfall expected.
 * @param lastSnowfallDate    The date of the last snowfall.
 * @param basicInfo           Basic information about the ski resort.
 */
public record SnowForecast(String topSnowDepth, String botSnowDepth, String freshSnowfall, String lastSnowfallDate, BasicInfo basicInfo) {
}
