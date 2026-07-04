import Hero from "../components/Hero";
import CategoryIconRow from "../components/CategoryIconRow";
import FlashSale from "../components/FlashSale";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import QuoteBanner from "../components/QuoteBanner";

const Home = () => {
  return (
    <>
      <Hero />
      <CategoryIconRow />
      <FlashSale />
      <FeaturedProducts />
      <WhyChooseUs />
      <QuoteBanner />
    </>
  );
};

export default Home;