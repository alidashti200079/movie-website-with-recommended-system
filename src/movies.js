import Navbar from "./navbar";
import Slideshow from "./slideshow";
import CardGrid from "./cardGrid";
import Footer from "./footer";

const Movies = () => {

    const movies = [
      {
        title: 'Movie 1',
        imageUrl: 'https://static.bia2mov.art/images1500//titles/Q/Qg8q1_bg.jpg',
      },
      {
        title: 'Movie 2',
        imageUrl: 'https://static.bia2mov.art/images1500//titles/Q/Q3AZD_bg.jpg',
      },
      {
        title: 'Movie 3',
        imageUrl: 'https://static.bia2mov.art/images1500//titles/J/JOK1Lr_bg.jpg',
      },
      // Add more movie objects here
    ];

    const cards = [
      {
        title: 'Movie 1',
        image: 'https://static.bia2mov.art/images400//titles/Q/Q7Uvi.jpg',
        description: 'Description of Movie 1',
        link: 'https://tr.bia2mov.art/trailer/tt0903747'
      },
      {
        title: 'Movie 2',
        image: 'https://static.bia2mov.art/images400//titles/Q/Q94wQ.jpg',
        description: 'Description of Movie 2',
        link:''
      },
      {
        title: 'Movie 3',
        image: 'https://static.bia2mov.art/images400//titles/Q/Q5puk.jpg',
        description: 'Description of Movie 2',
        link:''
      },
      {
        title: 'Movie 4',
        image: 'https://static.bia2mov.art/images400//titles/Q/Q1Rh9.jpg',
        description: 'Description of Movie 2',
        link:''
      },
      {
        title: 'Movie 5',
        image: 'https://static.bia2mov.art/images300/titles/Q/QurP6.jpg',
        description: 'Description of Movie 2',
        link:''
      },
      {
        title: 'Movie 6',
        image: 'https://static.bia2mov.art/images300/titles/Y/YBZ8I.jpg',
        description: 'Description of Movie 2',
        link:''
      },
      {
        title: 'Movie 7',
        image: 'https://static.bia2mov.art/images300/titles/Q/Q3AZD.jpg',
        description: 'Description of Movie 2',
        link:''
      },
      {
        title: 'Movie 8',
        image: 'https://static.bia2mov.art/images300/titles/J/JOK1Lr.jpg',
        description: 'Description of Movie 2',
        link:''
      },
      {
        title: 'Movie 9',
        image: 'https://static.bia2mov.art/images300/titles/J/JOIYSn.jpg',
        description: 'Description of Movie 2',
        link:''
      },
      {
        title: 'Movie 10',
        image: 'https://static.bia2mov.art/images300/titles/J/JOTCvg.jpg',
        description: 'Description of Movie 2',
        link:''
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