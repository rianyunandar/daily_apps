import { Button } from "flowbite-react";
import MobileLayout from "@/components/mobile-layout";
import HEader from "@/components/header";
import SignupPage from './../../components/signUp';

export default function MyPage() {
  return (
    <MobileLayout>
      <HEader />
      <SignupPage />
    </MobileLayout>
  );
}
