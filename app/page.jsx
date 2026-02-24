export const dynamic = "force-dynamic";

import NavbarWrapper from "./components/NavbarWrapper";
import { Suspense } from "react";
import SearchParamsClient from "./components/SearchParamsClient";
import Service from "./components/Service";
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
      <NavbarWrapper />   {/* ✅ THIS WAS MISSING */}

      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsClient />
      </Suspense>

      <Header />
      <About />
      
      
      <Service />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}