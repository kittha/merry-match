import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import HeaderMembership from "../../components/membership/HeaderMembership";
import MembershipPackage from "../../components/membership/MembershipPackage";
import PaymentMethod from "../../components/membership/PaymentMethod";
import BillingHistory from "../../components/membership/BillingHistory";
import Footer from "../../components/homepage-authen/Footer";
export const MembershipPage = () => {
  const { userId } = useParams();
  const [data, setData] = useState({
    packageDetails: null,
    billingHistory: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/membership/${userId}`
        );
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-center pt-[168px] mb-[112px]">
        <div className="flex flex-col gap-[80px] items-center font-Nunito w-[930px]">
          <HeaderMembership />
          <div className="flex flex-col gap-[60px]">
            <MembershipPackage details={data.packageDetails} />
            <PaymentMethod />
            <BillingHistory
              key="billing-history"
              history={data.billingHistory}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
