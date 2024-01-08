import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/auth/auth";
import MobileLayout from "@/components/mobile-layout";
import HEader from "@/components/header";
import Dashboard from "@/components/dashboard"; // Import the correct Dashboard component

const MyPage = () => {
  const router = useRouter();
  const { token, userData } = useAuth();

  useEffect(() => {
    if (!token || !userData) {
      router.push("/login");
    }
  }, [token, userData, router]);

  if (!token || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <MobileLayout>
      <HEader />
      <Dashboard />
    </MobileLayout>
  );
};

export default MyPage;
