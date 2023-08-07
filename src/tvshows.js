import Footer from "./footer";
import Navbar from "./navbar";
import Slideshow from "./slideshow";
import CardGrid from "./cardGrid";

const Tvshows = () => {

    const tvshows = [
      {
        title: 'Tv Show 1',
        imageUrl: 'https://static.bia2mov.art/images1500/titles/Q/Q4DYQ_bg.jpg',
      },
      {
        title: 'Tv Show 2',
        imageUrl: 'https://static.bia2mov.art/images1500/titles/Q/Qj3T3_bg.jpg',
      },
      {
        title: 'Tv Show 3',
        imageUrl: 'https://static.bia2mov.art/images1500/titles/J/JODv4c_bg.jpg',
      },
      // Add more tvshows objects here
    ];

    const cards = [
      {
        title: 'Movie 1',
        image: 'https://static.bia2mov.art/images400//titles/Q/Q4DYQ.jpg',
        description: 'Description of Movie 1',
        link: 'https://tr.bia2mov.art/trailer/tt0903747'
      },
      {
        title: 'Movie 2',
        image: 'https://static.bia2mov.art/images300/titles/Q/Q97x6.jpg',
        description: 'Description of Movie 2',
        link:''
      },
      {
        title: 'Movie 3',
        image: 'https://static.bia2mov.art/images300/titles/Q/Q1RHL.jpg',
        description: 'Description of Movie 2',
        link:''
      },
      {
        title: 'Movie 4',
        image: 'https://static.bia2mov.art/images300/titles/Q/Q44qj.jpg',
        description: 'Description of Movie 2',
        link:''
      },
      {
        title: 'Movie 5',
        image: 'https://static.bia2mov.art/images300/titles/Q/Q7yvF.jpg',
        description: 'Description of Movie 2',
        link:''
      },
      {
        title: 'Movie 6',
        image: 'https://static.bia2mov.art/images300/titles/Q/Qj3T3.jpg',
        description: 'Description of Movie 2',
        link:''
      },
      {
        title: 'Movie 7',
        image: 'https://static.bia2mov.art/images300/titles/Q/Q5eKK.jpg',
        description: 'Description of Movie 2',
        link:''
      },
      {
        title: 'Movie 8',
        image: 'https://static.bia2mov.art/images300/titles/Q/Q1U2H.jpg',
        description: 'Description of Movie 2',
        link:''
      },
      {
        title: 'Movie 9',
        image: 'https://static.bia2mov.art/images300/titles/Q/Q4PKj.jpg',
        description: 'Description of Movie 2',
        link:''
      },
      {
        title: 'Movie 10',
        image: 'https://static.bia2mov.art/images300/titles/Q/Qzx5g.jpg',
        description: 'Description of Movie 2',
        link:''
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