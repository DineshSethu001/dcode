import { Suspense } from "react";
import NavbarWrapper from "./components/NavbarWrapper";
import {
  Header,
  About,
  Projects,
  Contact,
  Footer,
} from "./components";

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <NavbarWrapper />
      </Suspense>

      <Header />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}