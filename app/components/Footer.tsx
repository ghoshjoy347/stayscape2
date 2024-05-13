import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { Button } from "../components/button"
import { Input } from "../components/input"

export default function Footer() {
  return (
    <footer className="bg-zinc-600 mt-20 rounded-3xl">
      <div
        className="w-full 
        flex flex-col flex-wrap
        px-4
        py-6
        mx-auto
        md:items-center
        lg:items-start
        md:flex-row md:flex-nowrap
      "
      >
        <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
          <Link href={"/"} className="text-2xl text-white">
          StayScape
          </Link>
          <p className="mt-2 text-xs text-justify text-gray-400">
          Discover your perfect stay with us. Our platform offers diverse accommodations, seamless booking, and personalized experiences. Whether it's a cozy cabin or a luxury villa, find your home away from home.
          </p>
          <div className="flex mt-4 mb-5">
            <Input type="email" placeholder="Email" />
            <Button className="bg-purple-600">Subscribe</Button>
          </div>
          <div className="flex justify-center mt-4 space-x-4 pb- lg:mt-2">
            <Link href={"/facebook"}>
              <Facebook className="text-blue-500" />
            </Link>
            <Link href={"/twitter"}>
              <Twitter className="text-sky-300" />
            </Link>
            <Link href={"/instagram"}>
              <Instagram className="text-pink-500" />
            </Link>
            <Link href={"/linkedin"}>
              <Linkedin className="text-blue-400" />
            </Link>
          </div>
        </div>
        <div className="justify-around w-full mt-4 text-center lg:flex">
          <div className="w-full px-4 lg:w-1/3 md:w-1/2">
            <h2 className="mb-2 font-bold tracking-widest text-gray-100">
              Important Links
            </h2>
            <ul className="mb-8 space-y-2 text-sm list-none">
              <li>
                <Link href={"/"} className="text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href={"/my-homes"} className="text-gray-300">
                  My Listings
                </Link>
              </li>
              <li>
                <Link href={"/favorites"} className="text-gray-300">
                  My Favorites
                </Link>
              </li>
              <li>
                <Link href={"/create/bd0990b4-77a6-41ab-88e8-21d8b45c2172/structure"} className="text-gray-300">
                  Add Your Homes
                </Link>
              </li>
              <li>
                <Link href={"/reservations"} className="text-gray-300">
                  My Reservations
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full px-4 lg:w-1/3 md:w-1/2">
            <h2 className="mb-2 font-bold tracking-widest text-gray-100">
              Social Links
            </h2>
            <ul className="mb-8 space-y-2 text-sm list-none">
              <li>
                <Link href={"/facebook"} className="text-gray-300">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href={"/twitter"} className="text-gray-300">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href={"/instagram"} className="text-gray-300">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href={"/linkedin"} className="text-gray-300">
                  Linkedin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center ">
        <p className="text-center text-white pb-4 ">
        © 2024 | StayScape | All Rights Reserved
        </p>
      </div>
    </footer>
  )
}