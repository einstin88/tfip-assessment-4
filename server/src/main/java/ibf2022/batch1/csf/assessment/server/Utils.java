package ibf2022.batch1.csf.assessment.server;

import java.io.StringReader;
import java.util.stream.Stream;

import ibf2022.batch1.csf.assessment.server.models.Review;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonValue;

public class Utils {

    /*
     * Helper function to parse response string to List of Review
     * Note: errors are handles by caller of this function
     */
    public static Stream<Review> createMovieList(String response) {
        JsonArray parsed = Json.createReader(new StringReader(response))
                .readObject()
                .getJsonArray("results");

        return parsed.stream()
                .map(JsonValue::asJsonObject)
                .map(movie -> {
                    Review review = new Review();
                    review.setTitle(movie.getString("display_title"));
                    review.setRating(movie.getString("mpaa_rating"));
                    review.setByline(movie.getString("byline"));
                    review.setHeadline(movie.getString("headline"));
                    review.setSummary(movie.getString("summary_short"));

                    JsonObject link = movie.getJsonObject("link");
                    review.setReviewURL(link.getString("url"));

                    // Image's URL may be null
                    try {
                        JsonObject multimedia = movie.getJsonObject("multimedia");
                        review.setImage(multimedia.getString("src"));
                    } catch (ClassCastException e) {
                        review.setImage("");
                    }

                    return review;
                });
    }
}
