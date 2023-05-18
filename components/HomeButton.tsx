// components/HomeButton.tsx
import logo from "@/public/images/allen.png";
import Image from "next/image";
import Link from "next/link";

const HomeButton: React.FC = () => {
  return (
    <Link
      href="/"
      title="Home"
      aria-label="Home"
      className={`font-general-regular text-3xl text-dark-2 dark:text-light-2 hover:text-light-1 dark:hover:text-light-1 bg-light-1 dark:bg-dark-1 hover:bg-gradient-light dark:hover:bg-gradient-dark ring-1 ring-dark-3 dark:ring-light-3 cursor-pointer rounded-lg`}
    >
      <Image src={logo} alt="Home" width={44} height={44} />
    </Link>
  );
};

export default HomeButton;
