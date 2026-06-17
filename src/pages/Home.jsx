import Hero from '../components/Hero';
import ClientLogos from '../components/ClientLogos';
import Services from '../components/Services';
import Work from '../components/Work';
import About from '../components/About';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Pricing from '../components/Pricing';
import CTABanner from '../components/CTABanner';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
            <Hero />
            <ClientLogos />
            <About />
            <Services />
            <Work />
            <Process />
            <Testimonials />
            <FAQ />
            <Pricing />
            <CTABanner />
            <Contact />
            <Footer />
        </>
    );
};

export default Home;
