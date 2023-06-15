import { useEffect } from "react";
import scrollreveal from "scrollreveal";
import ScrollToTop from "../components/Home/ScrollToTop";
import Recommend from "../components/Home/Recommend";
import Services from "../components/Home/Services";
import Testimonials from "../components/Home/Testimonials";
import Footer from "../components/Home/Footer";
import Hero from "../components/Home/Hero";
import Navbar from "../components/Home/Navbar"
import "./app.css"
export default function HomePage(){
    useEffect(() => {
        const sr = scrollreveal({
          origin: "top",
          distance: "80px",
          duration: 2000,
          reset: true,
        });
        sr.reveal(
          `
            nav,
            #hero,
            #services,
            #recommend,
            #testimonials,
            footer
            `,
          {
            opacity: 0,
            interval: 300,
          }
        );
      }, []);
    return(
        <div className="body">
        <ScrollToTop/>
        <Navbar/>
        <Hero/>
        <Services/>
        <Recommend/>
        <Testimonials/>
        <Footer/>
        </div>
    )
}