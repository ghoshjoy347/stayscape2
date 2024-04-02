import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ListingCard } from "../components/ListingCard";
import { NoItems } from "../components/NoItem";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  noStore();
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      Home: {
        select: {
          id: true,
          city: true,
          country: true,
          photo: true,
          description: true,
          price: true,
          Favorite: {
            where: {
              userId: userId,
            },
          },
        },
      },
    },
  });

  return data;
}

async function deleteReservation(homeId: string, userId: string) {
  await prisma.reservation.deleteMany({
    where: {
      userId: userId,
      homeId: homeId,
    },
  });
}

export default async function ReservationsRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id) return redirect("/");
  const data = await getData(user.id);
  return (
    <section className="container mx-atuo px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Reservations
      </h2>

      {data.length === 0 ? (
        <NoItems
          title="Oops, you don't have any Reservations"
          description="Add your Reservations Now"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item) => (
            <>
              <ListingCard
                key={item.Home?.id}
                reservationId={item.id}
                startDate={item.startDate}
                endDate={item.endDate}
                description={item.Home?.description as string}
                city={item.Home?.city as string}
                country={item.Home?.country as string}
                pathName="/favorites"
                homeId={item.Home?.id as string}
                imagePath={item.Home?.photo as string[]}
                price={item.Home?.price as number}
                userId={user.id}
                favoriteId={item.Home?.Favorite[0]?.id as string}
                isInFavoriteList={
                  (item.Home?.Favorite.length as number) > 0 ? true : false
                }
              />
            </>
          ))}
        </div>
      )}
    </section>
  );
}