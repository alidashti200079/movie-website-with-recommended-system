from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route('/api/recom', methods=['POST'])
def recommended():

    # Access data from the request
    email = request.json.get('email', '')

    import sqlite3
    import random

    # Connect to the SQLite database
    conn = sqlite3.connect('/Users/mac/Desktop/recommended system/website/src/api/database.sqlite3')
    cursor = conn.cursor()

    # Fetch user IDs
    cursor.execute("SELECT DISTINCT user_id FROM favorite UNION SELECT DISTINCT user_id FROM voted;")
    user_ids = [user[0] for user in cursor.fetchall()]
    print("User IDs:", user_ids)

    # Initialize three-dimensional presentation
    three_d_presentation = []

    # Iterate through user IDs
    for user_id in user_ids:
        user_data = {'user_id': user_id, 'movies': {}}

        # Fetch movies viewed by the user and related information from favorite
        cursor.execute(f"SELECT video_id FROM favorite WHERE user_id = {user_id};")
        favorite_movies = {video_id[0]: 1 for video_id in cursor.fetchall()}

        # Fetch movies viewed by the user and related information from voted
        cursor.execute(f"SELECT movie_id, user_rating FROM voted WHERE user_id = {user_id};")
        voted_movies = {movie_id: user_rating for movie_id, user_rating in cursor.fetchall()}

        # Combine favorite and voted movies, giving priority to Is Favorite
        all_movies = {movie_id: {'user_rating': voted_movies.get(movie_id, 0), 'is_favorite': 1} if movie_id in favorite_movies else
                                {'user_rating': voted_movies.get(movie_id, 0), 'is_favorite': 0} for movie_id in
                    set(favorite_movies.keys()).union(voted_movies.keys())}

        # Iterate through all movies for the user
        for movie_id, movie_info in all_movies.items():
            user_rating = movie_info['user_rating']
            is_favorite = movie_info['is_favorite']

            # Fetch movie information from the Movie table
            cursor.execute("SELECT genre, rating FROM movie WHERE id = ?;", (movie_id,))
            movie_info_db = cursor.fetchone()

            # Check if movie_info is not None before using it
            if movie_info_db is not None:
                # Extract multiple genres and add them to a set
                genres = set(movie_info_db[0].split(','))

                # Store movie information in the user's movies dictionary
                user_data['movies'][movie_id] = {
                    'user_rating': user_rating,
                    'is_favorite': is_favorite,
                    'genres': genres,
                    'rating': movie_info_db[1]
                }
            else:
                # Handle the case where movie_info is None
                print(f"Warning: Movie information not found for movie_id {movie_id}")

        # Append user data to the three-dimensional presentation
        three_d_presentation.append(user_data)

    # Close the database connection
    conn.close()


    # Iterate through user data
    for user_data in three_d_presentation:
        user_id = user_data['user_id']
        movies = user_data['movies']

        # Iterate through movies for each user
        for movie_id, movie_info in movies.items():
            user_rating = movie_info['user_rating']
            is_favorite = movie_info['is_favorite']
            genres = ', '.join(movie_info['genres'])
            rating = movie_info['rating']

    # ------------------------------------------------------------------------------------------------

    def calculate_similarity(user1, user2):
        # Calculate similarity based on shared favorite movies and close ratings
        shared_movies = set(user1['movies'].keys()) & set(user2['movies'].keys())
        # print(shared_movies)
        # print(user1['movies'].keys())
        # print(user2['movies'].keys())
        # Calculate similarity based on the same favorite movie IDs
        same_favorite_similarity = 0
        for movie_id in shared_movies:
            if (
                user1['movies'].get(movie_id, {}).get('is_favorite', 0) == 1 and
                user2['movies'].get(movie_id, {}).get('is_favorite', 0) == 1
            ):
                same_favorite_similarity += 0.2
        
        # Calculate similarity based on close votes (difference less than 1)
        close_ratings = [
            (m1, m2)
            for m1 in user1['movies']
            for m2 in user2['movies']
            if ( m1 == m2 )
            if abs(user1['movies'][m1]['user_rating'] - user2['movies'][m2]['user_rating']) < 1
        ]
        
        # Calculate similarity based on shared close votes
        close_votes_similarity = len(close_ratings) * 0.2

        # Calculate overall similarity score
        total_similarity = same_favorite_similarity + close_votes_similarity
        similarity_percentage = total_similarity / (len(user1['movies']) + len(user2['movies']))
        
        return similarity_percentage

    def collaborative_filtering_recommendation(user_id, three_d_presentation):
        # Find the user in the three-dimensional presentation
        target_user = next((user for user in three_d_presentation if user['user_id'] == user_id), None)
        # print(f"User Id: {user_id}")
        if target_user is None:
            print(f"User {user_id} not found.")
            return

        # Calculate similarity scores with other users
        similarity_scores = [(user['user_id'], calculate_similarity(target_user, user)) for user in three_d_presentation if user != target_user]

        # Display the similarity percentages
        print("Similarity Scores:")
        for similar_user_id, similarity_percentage in similarity_scores:
            print(f"User {similar_user_id}: {similarity_percentage * 100:.2f}%")

        # Sort users by similarity score in descending order
        similar_users = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

        # Find the three most similar users with a positive similarity score
        top_three_users = [user for user, similarity in similar_users[:3] if similarity > 0]
        # print(top_three_users)
        # Find movies seen by the three most similar users
        recommended_movies = set()
        for similar_user_id in top_three_users:
            similar_user = next((user for user in three_d_presentation if user['user_id'] == similar_user_id), None)
            if similar_user:
                # Update recommended movies based on shared favorite movies and close ratings
                for movie_id, movie_info in similar_user['movies'].items():
                    if (
                        movie_id not in target_user['movies'] 
                    ):
                        recommended_movies.add(movie_id)

        return recommended_movies

    #user_id = 0
    def get_user_id_from_email(email):
        
        conn = sqlite3.connect('/Users/mac/Desktop/recommended system/website/src/api/database.sqlite3')
        cursor = conn.cursor()

        try:
            # Fetch user_id based on the email
            cursor.execute("SELECT id FROM user WHERE email = ?;", (email,))
            result = cursor.fetchone()

            if result:
                return result[0]
            else:
                # If user_id is not found, set it to 0
                return 0
        finally:
        
            conn.close()

    # ------------------------------------------------------------------------------------------------

    def refinement_of_information(user_id, three_d_presentation):
        # Find the user in the three-dimensional presentation
        target_user = next((user for user in three_d_presentation if user['user_id'] == user_id), None)

        if target_user is None:
            print(f"User {user_id} not found.")
            return

        # Initialize a dictionary to store the similarity scores
        movie_similarity_scores = {}

        # Connect to the SQLite database
        conn = sqlite3.connect('/Users/mac/Desktop/recommended system/website/src/api/database.sqlite3')
        cursor = conn.cursor()

        # Fetch all movies from the database
        cursor.execute("SELECT id FROM movie;")
        all_movies = [movie_id[0] for movie_id in cursor.fetchall()]

        target_user_genres = {}
        for movie_id in all_movies:
            cursor.execute("SELECT genre FROM movie WHERE id = ?;", (movie_id,))
            result = cursor.fetchone()
            movie_genres = set(result[0].split(',')) if result and result[0] else set()
            target_user_genres[movie_id] = movie_genres

        for movie_id0 in all_movies:
            # Skip the user's own movies
            if movie_id0 in target_user['movies']:
                continue

            # Calculate similarity for each genre separately
            genre_similarity = 0
            for movie_id, movie_info in target_user['movies'].items():
                for target_genre in target_user_genres[movie_id0]:
                    if target_genre in movie_info.get('genres'):
                        genre_similarity += 0.1
                    else:
                        genre_similarity -= 0.02

                # Store the similarity score for the movie
                movie_similarity_scores.setdefault(movie_id0, []).append(max(0, genre_similarity))  # Ensure the similarity is non-negative

        # Close the database connection
        conn.close()

        # Calculate the average similarity score for each movie
        average_similarity_scores = {movie_id: sum(scores) / len(scores) for movie_id, scores in movie_similarity_scores.items()}

        # Sort movies by average similarity score in descending order
        similar_movies = sorted(average_similarity_scores.items(), key=lambda x: x[1], reverse=True)

        return similar_movies[:5]

    # Test the refinement of information for User 1
    # refinement_of_information(user_id, three_d_presentation)

    # ------------------------------------------------------------------------------------------------

    def get_top_movies_by_rating(num_movies):

        # Connect to the SQLite database
        conn = sqlite3.connect('/Users/mac/Desktop/recommended system/website/src/api/database.sqlite3')
        cursor = conn.cursor()

        cursor.execute(f"SELECT id, rating FROM movie;")
        movie_ratings = cursor.fetchall()
        # print(movie_ratings)
        # Sort movies by rating in descending order
        sorted_movies = sorted(movie_ratings, key=lambda x: x[1], reverse=True)
        return [movie_id for movie_id, _ in sorted_movies[:num_movies]]

    def get_random_movies(num_movies, all_movies):

        return random.sample(all_movies, min(num_movies, len(all_movies)))

    def get_most_viewed_movies(num_movies, three_d_presentation):
        # Count the number of times each movie appears in user lists
        movie_counts = {}
        for user in three_d_presentation:
            for movie_id in user['movies']:
                movie_counts[movie_id] = movie_counts.get(movie_id, 0) + 1
        
        # Sort movies by view count in descending order
        sorted_movies = sorted(movie_counts.items(), key=lambda x: x[1], reverse=True)
        return [movie_id for movie_id, _ in sorted_movies[:num_movies]]

    def merge_and_rank_recommendations(user_id, collaborative_recommendations, information_recommendations, all_movies, three_d_presentation):
        # Call the collaborative filtering function to get recommendations
        collaborative_movies = collaborative_recommendations(user_id, three_d_presentation)

        # Call the information refinement function to get recommendations
        information_movies = information_recommendations(user_id, three_d_presentation)

        conn = sqlite3.connect('/Users/mac/Desktop/recommended system/website/src/api/database.sqlite3')
        cursor = conn.cursor()

        cursor.execute(f"SELECT id, rating FROM movie;")
        allMovies = {movie_id for movie_id, _ in cursor.fetchall()}


        if user_id == 0:
            all_recommendations = []
        elif not collaborative_movies and not information_movies:

            # Get two movies with the highest rating
            top_rated_movies = get_top_movies_by_rating(2)

            # Get two random movies excluding those in the collaborative and information recommendations
            random_movies = get_random_movies(4, allMovies)

            # Get one movie from the most viewed list
            most_viewed_movies = get_most_viewed_movies(1, three_d_presentation)

            filtered_movies = []
        
            for movie_id in random_movies:
                filtered_movies.append(movie_id)

            for movie_id in top_rated_movies:
                filtered_movies.append(movie_id)

            for movie_id in most_viewed_movies:
                filtered_movies.append(movie_id) 

            unique_list = []
            for movie_id in filtered_movies:
                if movie_id not in unique_list:
                    unique_list.append(movie_id)

            random.shuffle(unique_list)
            # Combine all movie recommendations
            all_recommendations = unique_list[:5]

        else:
            
            collaborative_movies = [(movie_id, 0.5555) for movie_id in collaborative_movies]
        
            information_movie_ids = [movie_id for movie_id, _ in information_movies]

            # Create a new list without overlapping movie_ids
            filtered_collaborative_movies = [(movie_id, sim) for movie_id, sim in collaborative_movies if movie_id not in information_movie_ids]
                        
            combined_movies = list(set(information_movies) | set(filtered_collaborative_movies))

            combined_movies_sorted = sorted(combined_movies, key=lambda x: x[1], reverse=True)

            # Combine all movie recommendations
            all_recommendations = combined_movies_sorted[:5]

        return all_recommendations

    def recommended(email):
        
        user_id = get_user_id_from_email(email)
        all_recommendations = merge_and_rank_recommendations(user_id, collaborative_filtering_recommendation, refinement_of_information, all_movies, three_d_presentation)

        conn = sqlite3.connect('/Users/mac/Desktop/recommended system/website/src/api/database.sqlite3')
        cursor = conn.cursor()

        recommended_movies_details = []
   
        for recommendation in all_recommendations:
            if isinstance(recommendation, tuple):

                movie_id, similarity_percentage = recommendation
                
                cursor.execute("SELECT name, rating, description, image FROM movie WHERE id = ?;", (movie_id,))
                movie_details = cursor.fetchone()

                if movie_details:
                    movie_name, movie_rating, movie_description, imageUrl = movie_details
                    recommended_movies_details.append({
                        'name': movie_name,
                        'rating': movie_rating,
                        'description': movie_description,
                        'image': imageUrl
                            })
            else:          
                cursor.execute("SELECT name, rating, description, image FROM movie WHERE id = ?;", (recommendation,))
                movie_details = cursor.fetchone()

                if movie_details:
                    movie_name, movie_rating, movie_description, imageUrl = movie_details
                    recommended_movies_details.append({
                        'name': movie_name,
                        'rating': movie_rating,
                        'description': movie_description,
                        'image': imageUrl
                        })

            
        conn.close()

        return recommended_movies_details

    
    # Call your Python function
    result = recommended(email)

    # Return the result as JSON
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
