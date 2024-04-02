"use client";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRange } from "react-date-range";
import { useState } from "react";
import { eachDayOfInterval } from "date-fns";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function SelectCalender({
  reservation,
  user,
  homeId,
}: {
  reservation:
  | {
    startDate: Date;
    endDate: Date;
  }[]
  | undefined,
  user: KindeUser,
  price: number,
  homeId: string,
}) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  let disabledDates: Date[] = [];
  reservation?.forEach((reservationItem) => {
    const dateRange = eachDayOfInterval({
      start: new Date(reservationItem.startDate),
      end: new Date(reservationItem.endDate),
    });

    disabledDates = [...disabledDates, ...dateRange];
  });
  return (
    <>
      <input
        type="hidden"
        name="startDate"
        value={state[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={state[0].endDate.toISOString()}
      />
      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#7F00FF"]}
        ranges={state}
        onChange={(item) => setState([item.selection] as any)}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disabledDates}
      />

      {user?.id ? (
        <Button className="w-full" asChild>
          <Link
            href={`/home/${homeId}/checkout?startDate=${state[0].startDate.toISOString()}&endDate=${state[0].endDate.toISOString()}`}
          >Checkout</Link>
        </Button>
      ) : (
        <Button className="w-full" asChild>
          <Link href="/api/auth/login">Make a Reservation</Link>
        </Button>
      )}
    </>
  );
}