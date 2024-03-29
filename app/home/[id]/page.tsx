import { createReservation } from "@/app/actions";
import Script from "next/script";
import { CaegoryShowcase } from "@/app/components/CategoryShowcase";
import { HomeMap } from "@/app/components/HomeMap";
import { SelectCalender } from "@/app/components/SelectCalender";
import { ReservationSubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { useCountries, useCities } from "@/app/lib/getCountries";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";

async function getData(homeid: string) {
  const data = await prisma.home.findUnique({
    where: {
      id: homeid,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      city: true,
      country: true,
      Reservation: {
        where: {
          homeId: homeid,
        },
      },

      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });

  return data;
}

export default async function HomeRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const { getCityByValue, getCityByCountryAndName } = useCities();
  const city = getCityByValue(data?.city as string);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const anotherCity = getCityByCountryAndName(data?.country as string, data?.city as string);
  const latLang: [number, number] = [Number(anotherCity?.latitude), Number(anotherCity?.longitude)]

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <div className="w-[75%] mx-auto mt-10 mb-12">
        <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
        <div className="relative h-[550px]">
          <Image alt="Home Image" src={`https://vlwiwgxhkkamdbzpbxhn.supabase.co/storage/v1/object/public/images/${data?.photo}`}
            fill className="rounded-lg h-full object-cover w-full" unoptimized />
        </div>

        <div className="flex justify-between gap-x-24 mt-8">
          <div className="w-2/3">
            <h3 className="text-xl font-medium">
              {city?.flag} {city?.label}
            </h3>
            <div className="flex gap-x-2 text-muted-foreground">
              <p>{data?.guests} Guests</p> | <p>{data?.bedrooms} Bedrooms</p> | {"  "}
              {data?.bathrooms} Bathrooms
            </div>

            <div className="flex items-center mt-6">
              <img
                src={
                  data?.User?.profileImage ??
                  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt="User Profile"
                className="w-11 h-11 rounded-full"
              />
              <div className="flex flex-col ml-4">
                <h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
                <p className="text-sm text-muted-foreground">Hosting since 2024</p>
              </div>
            </div>

            <Separator className="my-7" />

            <CaegoryShowcase categoryName={data?.categoryName as string} />

            <Separator className="my-7" />

            <p className="text-muted-foreground">{data?.description}</p>

            <Separator className="my-7" />

            <HomeMap locationValue={city?.value as string} latLang={latLang} />

          </div>

          <form  >
            <input type="hidden" name="homeId" value={params.id} />
            <input type="hidden" name="userId" value={user?.id} />

            <SelectCalender reservation={data?.Reservation} user={user!} price={data?.price!} homeId={params.id} />
          </form>

        </div>
      </div>
    </>
  )
}