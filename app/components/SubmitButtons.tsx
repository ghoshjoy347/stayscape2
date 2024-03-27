"use client"

declare global {
  interface Window {
    Razorpay: any;
  }
}

import { Button } from "@/components/ui/button"
import { Heart, Loader2, Trash } from "lucide-react"
import { useFormStatus } from "react-dom"

const makePayment = async (price: number,
  homeId: string,
  userId: string,
  state: any
) => {
  const diffTime = Math.abs(state[0].endDate - state[0].startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  const bookingData = {
    amt: price * diffDays,
  };

  const razorpayData = await fetch("/api/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  }).then((t) => t.json());
  console.log(razorpayData);
  var options = {
    key: process.env.RAZORPAY_KEY,
    name: "StayScape Pvt Ltd",
    currency: razorpayData.currency,
    amount: razorpayData.amount,
    order_id: razorpayData.id,
    description: "Thank You for Booking with us",
    handler: async function (response: any) {
      console.log(response);

      const startDate = state[0].startDate.toISOString();
      const endDate = state[0].endDate.toISOString();

      const reservationData = {
        homeId: homeId,
        userId: userId,
        startDate: startDate,
        endDate: endDate,
      };

      const reservation = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      }).then((t) => t.json());

      alert("Reservation Successful");
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();

  paymentObject.on("payment.failed", function (response: any) {
    alert("Payment failed. Please try again. Contact support for help");
    paymentObject.close();
  });
};

export function CreationSubmit() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button disabled size={"lg"}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait
        </Button>
      ) : (
        <Button type="submit" size={"lg"}>Next</Button>
      )}
    </>
  )
}


export function AddToFavoriteButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          size="icon"
          disabled
          className="bg-primary-foreground"
        >
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="bg-primary-foreground"
          type="submit"
        >
          <Heart className="w-4 h-4" />
        </Button>
      )}
    </>
  );
}

export function DeleteFromFavoriteButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          size="icon"
          disabled
          className="bg-primary-foreground"
        >
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="bg-primary-foreground"
          type="submit"
        >
          <Heart className="w-4 h-4" fill="red" />

        </Button>
      )}
    </>
  );
}


export function ReservationSubmitButton({ price, homeId, userId, state }: { price: number, homeId: string, userId: string, state: any }) {
  const { pending } = useFormStatus();
  const diffTime = Math.abs(state[0].endDate - state[0].startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  const amt = price * diffDays;

  return (
    <>
      {pending ? (
        <Button className="w-full" disabled>
          <Loader2 className="w-4 h-4 animate-spin mr-2" /> Please wait
        </Button>
      ) : (
        <>
          <p className="text-muted-foreground text-lg m-4">Total Amount: {amt}</p>
          <Button className="w-full" type="submit"
            onClick={async (e) => {
              e.preventDefault();
              await makePayment(price, homeId, userId, state);
            }}
          >
            Make a Reservation
          </Button>
        </>
      )}
    </>
  );
}

export function DeleteReservationButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          size="icon"
          disabled
          className="bg-primary-foreground"
        >
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="bg-primary-foreground"
          type="submit"
        >
          <Trash className="w-4 h-4" />
        </Button>
      )}
    </>
  );
}