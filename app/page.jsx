import NavbarWrapper from "./components/NavbarWrapper";
import { Header, About, Services, Projects, Contact, Footer } from "./components";

export default function Home() {
  return (
    <>
      <NavbarWrapper />
      <Header />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}