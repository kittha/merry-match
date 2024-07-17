import Header from '../../components/homepage/Header';
import FirstSection from '../../components/homepage/FirstSection';
import SecondSection from "../../components/homepage/SecondSection";
import ThirdSection from "../../components/homepage/ThirdSection";
import Footer from "../../components/homepage/Footer";
import UserProfilePage from './UserProfilePage';

const HomePage = () => {
  return (
    <div>
      <Header />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <Footer />
      <UserProfilePage />
    </div>
  );
};

export default HomePage;
