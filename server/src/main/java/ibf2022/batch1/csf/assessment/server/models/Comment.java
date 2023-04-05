package ibf2022.batch1.csf.assessment.server.models;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

/*
 * Entity class for mapping New Comment schema
 */
@Document(collection = "comments")
public record Comment(
        @MongoId String id,

        String movieName,
        String name,
        Integer rating,
        String comment) {

}
