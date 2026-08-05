import Image from "next/image";
import LoginCard from "./features/auth/components/loginCard";

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Image
        src="/Light-bg.png"
        alt="Background"
        fill
        priority
        sizes="100vw"
        draggable={false}
        className="object-cover -z-10"
      />

      <LoginCard />
    </div>
  );
}
