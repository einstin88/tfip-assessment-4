package ibf2022.batch1.csf.assessment.server.services;

import java.net.URI;
import java.util.LinkedList;
import java.util.List;

import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import ibf2022.batch1.csf.assessment.server.Utils;
import ibf2022.batch1.csf.assessment.server.models.Comment;
import ibf2022.batch1.csf.assessment.server.models.Review;
import ibf2022.batch1.csf.assessment.server.repositories.MovieRepository;

import static ibf2022.batch1.csf.assessment.server.Consts.*;

@Service
public class MovieService {

	private static final Logger log = LoggerFactory.getLogger(MovieService.class);
	private static final RestTemplate client = new RestTemplate();

	@Value("${NYT_PUB}")
	private String pub_key;

	@Autowired
	private MovieRepository repo;

	// Task 4
	// DO NOT CHANGE THE METHOD'S SIGNATURE
	/*
	 * - Builds URL for API call to NYT's Movie Review API
	 * - Attempt to parse the response from API call
	 * - If successful, return a list of 'Review'
	 * - If failed or no result, return empty list 
	 */
	public List<Review> searchReviews(String query) {
		URI url = UriComponentsBuilder
				.fromHttpUrl(URL_NYT)
				.queryParam(PARAM_QUERY, query)
				.queryParam(PARAM_KEY, pub_key)
				.build().toUri();

		RequestEntity<Void> request = RequestEntity
				.get(url)
				.accept(MediaType.APPLICATION_JSON)
				.build();

		ResponseEntity<String> response;
		try {
			response = client.exchange(request, String.class);
			// log.info(">>> Response: " + response.getBody());

			// Adds the comment count before returning to controller
			return Utils.createMovieList(response.getBody())
					.map(review -> {
						review.setCommentCount(
								repo.countComments(review.getTitle()));

						return review;
					})
					.toList();

		} catch (RestClientException e) {
			log.error("--- Error calling NYT API");
			return new LinkedList<>();
		} catch (ClassCastException e) {
			log.info("--- No results");
			return new LinkedList<>();
		}
	}

	// Middleman function
	public Boolean insertComment(Comment comment) {
		return ObjectId.isValid(
			repo.insertComment(comment).id());
	}
}
