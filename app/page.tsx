import Categories from "@/src/components/home/categories";
import Choose from "@/src/components/home/choose";
import Hero from "@/src/components/home/hero";
import Roommate from "@/src/components/home/roommate";
import Work from "@/src/components/home/work";

export default function Home() {
  return (
    <main>
      <Hero></Hero>
      <Categories></Categories>
      <Roommate></Roommate>
      <Work></Work>
      <Choose></Choose>
      
      
    </main>
  );
}
