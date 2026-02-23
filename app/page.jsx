import { Suspense } from "react";
import SearchParamsClient from "@/components/SearchParamsClient";
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
     <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsClient />
    </Suspense>

      <Header />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}