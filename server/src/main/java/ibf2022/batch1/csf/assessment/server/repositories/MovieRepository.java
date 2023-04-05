package ibf2022.batch1.csf.assessment.server.repositories;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import ibf2022.batch1.csf.assessment.server.models.Comment;

@Repository
public class MovieRepository {
	@Autowired
	private MongoTemplate template;

	// Task 5
	// You may modify the parameter but not the return type
	// Write the native mongo database query in the comment below
	/*
	 * Native Query : db.comments.countDocuments({movieName: <movieName>})
	 */
	public int countComments(String movieName) {
		Query query = Query.query(
			new Criteria("movieName").is(movieName));

		return (int) template.count(query, Document.class, "comments");
	}

	// Task 8
	// Write a method to insert movie comments comments collection
	// Write the native mongo database query in the comment below
	/*
	 * Native Query: db.comments.insertOne(
	 * 			{
	 * 				movieName: <Comment.movieName>, 
	 * 				name:<Comment.name>, 
	 * 				rating: <Comment.rating>, 
	 * 				comment: <Comment.comment> 
	 * 			})
	 */
	public Comment insertComment(Comment comment){
		return template.insert(comment, "comments");
	}
}
