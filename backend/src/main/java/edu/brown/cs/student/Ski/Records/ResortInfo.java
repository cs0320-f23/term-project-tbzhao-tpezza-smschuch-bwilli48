package edu.brown.cs.student.Ski.Records;

/**
 * A record representing basic information about a ski resort.
 *
 * @param resortName     The name of the resort.
 * @param resortLocation The location of the resort.
 * @param resortPrice    The price information for the resort.
 */
public record ResortInfo(String resortName, String resortLocation, String resortPrice) {
}
