import { useReadCypher } from 'use-neo4j';  // Example import

function MovieComponent() {
    // Cypher query to get a movie by title
    const query = `MATCH (movie:Movie {title: $title}) RETURN movie`;
    const params = { title: 'The Matrix' };

    const { loading, error, first } = useReadCypher(query, params);

    if (loading) return <div>Loading...</div>;

    if (error) return <div className="error">{error.message}</div>;

    if (first) {
        const movie = first.get('movie');
        console.log('____MOVIE:', movie);

        if (movie) {
            return (
                <div>
                    <h1>{movie.properties.title}</h1>
                    <p>Released in {movie.properties.tagline}</p>
                </div>
            );
        }
    }

    return <div>No movie found with title: {}</div>;
}

export default MovieComponent;