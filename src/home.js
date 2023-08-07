import './navbar.css';
import './header.css';
import './midSection.css';
import './footer.css'
import Navbar from './navbar.js';
import Header from './header.js';
import MidSection from './midSection';
import Footer from './footer';

const Home = () => {
    return (
    <>
        <Header />
        <Navbar />
        <MidSection />
        <Footer />
      </>
    );
};

export default Home;
