import { Suspense } from "react";
import NavbarWrapper from "./components/NavbarWrapper";
import { About, Services, Projects, Contact, Footer } from "./components";

import { Services} from "./components/Experience.jsx";
import { Header } from "./components/Header.jsx";

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <NavbarWrapper />
      </Suspense>

      <Header />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}