import Image from "next/image";
import Link from "next/link";
import DesktopLogo from "../../public/logomain.png";
import MobileLogo from "../../public/logosmall.png";
import { UserNav } from "./UserNav";
import { SearchModalCompnent } from "./SearchComponent";

export function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href="/">
          <Image
            src={DesktopLogo}
            alt="Desktop Logo"
            className="w-40 h-20 hidden lg:block" unoptimized
          />

          <Image
            src={MobileLogo}
            alt="Mobile Logo"
            className="block lg:hidden w-12"
          />
        </Link>

        <SearchModalCompnent />

        <UserNav />
      </div>
    </nav>
  );
}