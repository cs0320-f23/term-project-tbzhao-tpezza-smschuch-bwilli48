package edu.brown.cs.student.Ski.Records;

/**
 * A record representing statistics about the status of ski lifts at a resort.
 *
 * @param open      The number of open lifts.
 * @param hold      The number of lifts on hold.
 * @param scheduled The number of lifts scheduled to be open.
 * @param closed    The number of closed lifts.
 */
public record Stats(int open, int hold, int scheduled, int closed) {
}
