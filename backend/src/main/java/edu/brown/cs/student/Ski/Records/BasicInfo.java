package edu.brown.cs.student.Ski.Records;

/**
 * A record representing basic information about a ski resort.
 *
 * @param region             The region where the ski resort is located.
 * @param name               The name of the ski resort.
 * @param url                The URL of the ski resort.
 * @param topLiftElevation   The elevation of the top lift at the ski resort.
 * @param midLiftElevation   The elevation of the mid lift at the ski resort.
 * @param botLiftElevation   The elevation of the bottom lift at the ski resort.
 * @param lat                The latitude of the ski resort.
 * @param lon                The longitude of the ski resort.
 */
public record BasicInfo(String region, String name, String url, String topLiftElevation, String midLiftElevation,
        String botLiftElevation, String lat, String lon) {
}

