import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";
import { AddToFavoriteButton, DeleteFromFavoriteButton, DeleteReservationButton } from "./SubmitButtons";
import { DeleteFromFavorite, addToFavorite, deleteReservation } from "../actions";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
  homeId: string;
  pathName: string;
  reservationId: string | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
}


export function ListingCard({
  description,
  imagePath,
  location,
  price,
  userId,
  favoriteId,
  homeId,
  isInFavoriteList,
  pathName,
  reservationId,
  startDate,
  endDate,
}: iAppProps) {
  const { getCountryByValue } = useCountries()
  const country = getCountryByValue(location)

  return (
    <div className="flex flex-col">
      <div className="relative h-72 ">
        <Image src={`https://vlwiwgxhkkamdbzpbxhn.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of Stays" fill className="rounded-lg h-full object-cover mb-3" />

        {userId && (
          <>
            <div className="z-10 absolute top-2 right-2">
              {isInFavoriteList ? (
                <form action={DeleteFromFavorite}>
                  <input type="hidden" name="favoriteId" value={favoriteId} />
                  <input type="hidden" name="userId" value={userId} />
                  <input type="hidden" name="pathName" value={pathName} />
                  <DeleteFromFavoriteButton />
                </form>
              ) : (
                <form action={addToFavorite}>
                  <input type="hidden" name="homeId" value={homeId} />
                  <input type="hidden" name="userId" value={userId} />
                  <input type="hidden" name="pathName" value={pathName} />
                  <AddToFavoriteButton />
                </form>
              )}
            </div>
            {reservationId && (
              <div className="z-10 absolute top-2 left-2">
                <form action={deleteReservation}>
                  <input type="hidden" name="reservationId" value={reservationId} />
                  <input type="hidden" name="userId" value={userId} />
                  <input type="hidden" name="homeId" value={homeId} />
                  <input type="hidden" name="startDate" value={startDate?.toISOString()} />
                  <input type="hidden" name="endDate" value={endDate?.toISOString()} />
                  <DeleteReservationButton />
                </form>
              </div>
            )}
          </>
        )}
      </div>

      <Link href={`/home/${homeId}`} className="mt-2">
        <h3 className="font-medium text-base">{country?.flag} {country?.label} , {country?.region}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">₹ {price}</span> / Night</p>
      </Link>
    </div>
  );
}
