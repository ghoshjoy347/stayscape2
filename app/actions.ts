"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";

export async function createStayscapeHome({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAT: "desc",
    },
  });

  if (data === null) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data.id}/structure`);
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLoaction
  ) {
    return redirect(`/create/${data.id}/structure`);
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLoaction
  ) {
    return redirect(`/create/${data.id}/address`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLoaction
  ) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data.id}/structure`);
  }
}

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get("categoryName") as string;
  const homeId = formData.get("homeId") as string;
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      categoryName: categoryName,
      addedCategory: true,
    },
  });

  return redirect(`/create/${homeId}/description`);
}

export async function CreateDescription(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const imageFiles = formData.getAll("images") as File[];
  const homeId = formData.get("homeId") as string;

  const guestNumber = formData.get("guest") as string;
  const roomNumber = formData.get("room") as string;
  const washroomNumber = formData.get("washroom") as string;

  const imagePaths = [];
  for (let i = 0; i < imageFiles.length; i++) {
    const imageFile = imageFiles[i] as File;
    const { data: imageData } = await supabase.storage
      .from("images")
      .upload(`${imageFile.name}-${new Date()}`, imageFile, {
        cacheControl: "2592000",
        contentType: "image/png",
      });
    if (imageData) {
      imagePaths.push(imageData.path);
    }
  }

  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      title: title,
      description: description,
      price: Number(price),
      bedrooms: roomNumber,
      bathrooms: washroomNumber,
      guests: guestNumber,
      photo: { push: imagePaths },
      addedDescription: true,
    },
  });
  return redirect(`/create/${homeId}/address`);
}

export async function createLocation(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const countryValue = formData.get("countryValue") as string;
  const stateValue = formData.get("stateValue") as string;
  const cityValue = formData.get("cityValue") as string;
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      addedLoaction: true,
      city: cityValue,
      country: countryValue,
    },
  });

  return redirect("/");
}

export async function addToFavorite(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await prisma.favorite.create({
    data: {
      homeId: homeId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}

export async function DeleteFromFavorite(formData: FormData) {
  const favoriteId = formData.get("favoriteId") as string;
  const pathName = formData.get("pathName") as string;
  const userId = formData.get("userId") as string;

  const data = await prisma.favorite.delete({
    where: {
      id: favoriteId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}

async function updateHomeAvailability(
  homeId: string,
  startDate: Date,
  endDate: Date
) {
  const home = await prisma.home.findUnique({
    where: { id: homeId },
    include: { Reservation: true },
  });

  if (!home) {
    throw new Error("Home not found");
  }

  const updatedReservationDates = home.Reservation.filter((reservation) => {
    return !(
      reservation.startDate >= startDate && reservation.endDate <= endDate
    );
  });

  await prisma.home.update({
    where: { id: homeId },
    data: {
      Reservation: {
        disconnect: updatedReservationDates.map((reservation) => ({
          id: reservation.id,
        })),
      },
    },
  });
}

export async function createReservation(formData: FormData) {
  const userId = formData.get("userId") as string;
  const homeId = formData.get("homeId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  const data = await prisma.reservation.create({
    data: {
      userId: userId,
      endDate: endDate,
      startDate: startDate,
      homeId: homeId,
    },
  });

  return redirect("/");
}

export async function deleteReservation(formData: FormData) {
  const reservationId = formData.get("reservationId") as string;
  const homeId = formData.get("homeId") as string;
  const userId = formData.get("userId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  await prisma.reservation.delete({
    where: {
      id: reservationId,
    },
  });

  await updateHomeAvailability(homeId, new Date(startDate), new Date(endDate));

  return redirect("/reservations");
}

export async function createComment(formData: FormData) {
  const homeId = formData.get('homeId') as string
  const userId = formData.get('userId') as string
  const commentText = formData.get('comment') as string;
  const rating = parseInt(formData.get('rating') as string)

  const comment = await prisma.comments.create({
    data: { content: commentText, homeId, userId, rating }
  })

  return comment;
}