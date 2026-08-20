import Hero from "./_components/Hero";
import MenuBanner from "./_components/MenuBanner";
import Order from "./_components/Order";
import MenuCta from "./_components/MenuCta";
import Reviews from "./_components/Reviews";
import Location from "./_components/Location";

export default function Home() {
  return (
    <>
      <Hero />
      <MenuBanner />
      <Order />
      <MenuCta />
      <Reviews />
      <Location />
    </>
  );
}
