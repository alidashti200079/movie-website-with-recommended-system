import Navbar from "./navbar";
import Slideshow from "./slideshow";
import CardGrid from "./cardGrid";
import Footer from "./footer";

const Movies = () => {

    const movies = [
      {
        title: 'Movie 1',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTkyNTI0NDM5NF5BMl5BanBnXkFtZTcwMDkzMTk2Mw@@._V1_.jpg',
      },
      {
        title: 'Movie 2',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjI5MTUzMTg4N15BMl5BanBnXkFtZTgwNTEyODgxMzE@._V1_.jpg',
      },
      {
        title: 'Movie 3',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BOTcyMjMyMjI1MF5BMl5BanBnXkFtZTgwNTY0MzQ4MDE@._V1_.jpg',
      },
      // Add more movie objects here
    ];

    const cards = [
      {
        title: 'Movie 1',
        image: 'https://static.cdn.asset.filimo.com/flmt/mov_9042_35002-b.jpg?width=300&quality=85&secret=-HMmUKuOZg9xYrSjoAVOug',
        description: 'Description of Movie 1',
        link: 'https://www.filimo.com/m/SOcyQ'
      },
      {
        title: 'Movie 2',
        image: 'https://thumb.upera.shop/thumb?w=207&h=307&q=100&a=c&src=https://cdn.upera.shop/s3/posters/NYBjJi0i1pMTMpK8kzqs.jpg',
        description: 'Description of Movie 2',
        link:'https://moviezood.ir/movie/c91c1ee0-82bc-11ec-b625-b127edf499ce'
      },
      {
        title: 'Movie 3',
        image: 'https://static.cdn.asset.filimo.com/flmt/mov_8729_67454.jpg?width=300&quality=85&secret=DwRSw8CgK3_QjUBbIEO-3g  ',
        description: 'Description of Movie 2',
        link:'https://www.filimo.com/m/6KAN7'
      },
      {
        title: 'Movie 4',
        image: 'https://static.cdn.asset.filimo.com/flmt/mov_7145_34230-b.jpg?width=300&quality=85&secret=wV2lyyJ8IM_eMMmHtq15RA',
        description: 'Description of Movie 2',
        link:'https://www.filimo.com/m/UgY5M'
      },
      {
        title: 'Movie 5',
        image: 'https://static.cdn.asset.filimo.com/flmt/mov_9993_23601-b.jpg?width=300&quality=85&secret=pDLnTSSYMjtid-K6rl7yUg',
        description: 'Description of Movie 2',
        link:'https://www.filimo.com/m/QVOzL'
      },
      {
        title: 'Movie 6',
        image: 'https://static.cdn.asset.filimo.com/flmt/mov_13208_34995-b.jpg?width=300&quality=85&secret=pOhh0enyqh_dtaw3vODyWQ',
        description: 'Description of Movie 2',
        link:'https://www.filimo.com/m/YiRfm'
      },
      {
        title: 'Movie 7',
        image: 'https://static.cdn.asset.filimo.com/flmt/mov_244_621-b.jpg?width=300&quality=85&secret=ymA2THNKwByfB47Yre2EKA',
        description: 'Description of Movie 2',
        link:'https://www.filimo.com/m/AIFT8'
      },
      {
        title: 'Movie 8',
        image: 'https://static.cdn.asset.filimo.com/flmt/mov_24210_1-b.jpg?width=300&quality=85&secret=b9_oLlq65U-mvtBeEzgApQ',
        description: 'Description of Movie 2',
        link:'https://www.filimo.com/m/vX6HN'
      },
      {
        title: 'Movie 9',
        image: 'https://static.cdn.asset.filimo.com/flmt/mov_40376_389-b.jpg?width=300&quality=85&secret=936vcjSybWF_qiDyo80v7Q',
        description: 'Description of Movie 2',
        link:'https://www.filimo.com/m/lcp6h'
      },
      {
        title: 'Movie 10',
        image: 'https://static.cdn.asset.filimo.com/flmt/mov_12094_34990-b.jpg?width=300&quality=85&secret=w28bsFABRsPr6yAGx4g-3A',
        description: 'Description of Movie 2',
        link:'https://www.filimo.com/m/4zCpM'
      },
      // Add more card objects as needed
    ];

    return (
    <div className="movie-page">
        <Navbar/>
        <Slideshow movies={movies} />
        <CardGrid cards={cards}/>
        <Footer/>
      </div>
    );
};

export default Movies;