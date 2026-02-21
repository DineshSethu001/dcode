"use client";
import {Header, Navbar, About, Services, Projects, Contact, Footer} from './components'
import SearchComponent from "./SearchComponent";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Header/>
    <About/>
    <Services/>
    <Projects/>
    <Contact/>
    <Footer/>

    </>
  );
}
