import { Button } from "flowbite-react";
import MobileLayout from "@/components/mobile-layout";
import HEader from "@/components/header";
import Login from "@/components/login";

export default function MyPage() {
  return (
    <MobileLayout>
      <HEader />
      <Login />
      <span>live version : daily-apps-4dlx2b7l4-rianyunandar.vercel.app</span>
    </MobileLayout>
  );
}
