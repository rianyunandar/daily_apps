import MobileLayout from "@/components/mobile-layout";
import HEader from "@/components/header";
import EditPost from "@/components/post/edit";

export default function MyPage() {
  return (
    <MobileLayout>
      <HEader />
      <EditPost />
    </MobileLayout>
  );
}
