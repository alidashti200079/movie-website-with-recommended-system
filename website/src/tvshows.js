import Footer from "./footer";
import Navbar from "./navbar";
import Slideshow from "./slideshow";
import CardGrid from "./cardGrid";

const Tvshows = () => {

    const tvshows = [
      {
        title: 'Tv Show 1',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BNDY3MTU1ODIxNV5BMl5BanBnXkFtZTgwODgxMTU5NTM@._V1_.jpg',
      },
      {
        title: 'Tv Show 2',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTg0ODkxNTUzOF5BMl5BanBnXkFtZTgwNzM4NDk2NjM@._V1_.jpg',
      },
      {
        title: 'Tv Show 3',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjljMzI3NzEtNTdjMC00Nzk0LTk5ZTYtNDA4OGQ5NDdiZmY4XkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg',
      },
      // Add more tvshows objects here
    ];

    const cards = [
      {
        title: 'Movie 1',
        image: 'https://static.cdn.asset.filimo.com/flmt/mov_87011_723-b.jpg?width=300&quality=85&secret=o-C8atYly5TQ8Lxj6O_UfQ',
        description: 'Description of Movie 1',
        link: 'https://www.filimo.com/m/un50s'
      },
      {
        title: 'Movie 2',
        image: 'https://static.cdn.asset.filimo.com/flmt/mov_srl_7334_1-b.jpg?width=300&quality=85&secret=wDGtPW13ks1Dml9ItcI_mg',
        description: 'Description of Movie 2',
        link:'https://www.filimo.com/m/7334'
      },
      {
        title: 'Movie 3',
        image: 'https://static.cdn.asset.filimo.com/flmt/mov_srl_12301_1-b.jpg?width=300&quality=85&secret=1KDHl4qTlSBBPpNM7t-_HA',
        description: 'Description of Movie 2',
        link:'https://www.filimo.com/m/12301'
      },
      {
        title: 'Movie 4',
        image: 'https://thumb.upera.shop/thumb?w=207&h=307&q=100&a=c&src=https://cdn.upera.shop/s3/posters/Z8Y5oSEHrcma4h5VBMuB.jpg',
        description: 'Description of Movie 2',
        link:'https://moviezood.ir/series/cff5fd90-c008-11ec-ad94-55a77ef3ac6a'
      },
      {
        title: 'Movie 5',
        image: 'https://taptvs.com/wp-content/uploads/2023/07/tt13443470.jpg',
        description: 'Description of Movie 2',
        link:'https://taptvs.com/%d8%b3%d8%b1%db%8c%d8%a7%d9%84-%d9%88%d9%86%d8%b2%d8%af%db%8c-wednesday-2022'
      },
      {
        title: 'Movie 6',
        image: 'https://taptvs.com/wp-content/uploads/2023/11/MV5BYTY0YTgwZjUtYzJiNy00ZDQ2LWFlZmItZThhMjExMjI5YWQ2XkEyXkFqcGdeQXVyMTM1NjM2ODg1._V1_SX300.jpg',
        description: 'Description of Movie 2',
        link:'https://taptvs.com/%d8%b3%d8%b1%db%8c%d8%a7%d9%84-%d9%84%d9%88%da%a9%db%8c-loki'
      },
      {
        title: 'Movie 7',
        image: 'https://static.cdn.asset.filimo.com/flmt/mov_srl_10402_1-b.jpg?width=300&quality=85&secret=gICeVkNMiGHf-fXFBB6nJw',
        description: 'Description of Movie 2',
        link:'https://www.filimo.com/m/10402'
      },
      {
        title: 'Movie 8',
        image: 'https://static.cdn.asset.filimo.com/flmt/mov_106699_22985-b.jpg?width=300&quality=85&secret=WhtpNw23AW6K7QQM2BTXBQ',
        description: 'Description of Movie 2',
        link:'https://www.filimo.com/m/hbl69'
      },
      {
        title: 'Movie 9',
        image: 'https://static.cdn.asset.filimo.com/flmt/mov_srl_12432_1-b.jpg?width=300&quality=85&secret=jC_TS2OFAjLu68k03Lqvvw',
        description: 'Description of Movie 2',
        link:'https://www.filimo.com/m/12432'
      },
      {
        title: 'Movie 10',
        image: 'https://static.cdn.asset.filimo.com/flmt/mov_srl_23714_1-b.jpg?width=300&quality=85&secret=NPC-9fSHiWZ-w8cAmKZpPw',
        description: 'Description of Movie 2',
        link:'https://www.filimo.com/m/23714'
      },
      // Add more card objects as needed
    ];

    return (
      <div className="movie-page">
        <Navbar/>
        <Slideshow movies={tvshows} />
        <CardGrid cards={cards}/>
        <Footer/>
      </div>
    );
};

export default Tvshows;