package ibf2022.batch1.csf.assessment.server.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ibf2022.batch1.csf.assessment.server.models.Review;
import ibf2022.batch1.csf.assessment.server.services.MovieService;

@RestController
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class MovieController {
	private static final Logger log = LoggerFactory.getLogger(MovieController.class);

	@Autowired
	private MovieService svc;

	// Task 3, Task 4, Task 8
	@GetMapping(path = "/search")
	public ResponseEntity<List<Review>> getMovieList(
			@RequestParam(required = true) String query) {

		log.info(">>> Request to search for movies named: " + query);

		List<Review> result = svc.searchReviews(query).stream()
				.map(review -> {
					review.setCommentCount(
						svc.getReviewCount(review.getTitle()));

					return review;
				})
				.toList();

		return ResponseEntity.ok(result);
	}
}
