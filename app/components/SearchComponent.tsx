"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search } from "lucide-react";
import { useState } from "react";
import { useCities } from "../lib/getCountries";
import { HomeMap } from "./HomeMap";
import { Button } from "@/components/ui/button";
import { CreationSubmit } from "./SubmitButtons";
import { Card, CardHeader } from "@/components/ui/card";
import { Counter } from "./Counter";

export function SearchModalCompnent() {
  const [step, setStep] = useState(1);
  const [countryValue, setCountryValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [latLang, setLatLang] = useState<[number, number] | undefined>(undefined);
  const { getAllCountries, getStateByCountry, getCityByState, getCityByCountryAndName, getCountryByValue, getStateByCountryAndName } = useCities();

  function SubmitButtonLocal() {
    if (step === 1) {
      return (
        <Button onClick={() => setStep(step + 1)} type="button">
          Next
        </Button>
      );
    } else if (step === 2) {
      return <CreationSubmit />;
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer outline outline-zinc-300 outline-1">
          <div className="flex h-full divide-x font-medium">
            <p className="px-12">Location</p>
            <p className="px-12">Add Rooms</p>
            <p className="px-12">Add Guests</p>
          </div>

          <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="gap-4 flex flex-col">
          <input type="hidden" name="city" value={cityValue} />
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a Location</DialogTitle>
                <DialogDescription>
                  Please Choose a Location, so that what you want
                </DialogDescription>
              </DialogHeader>

              <Select
                required
                onValueChange={(value) => {
                  setCountryValue(value);
                  setLatLang(getCountryByValue(value)?.latLang);
                }}
                value={countryValue}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                    {getAllCountries().map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.flag} {item.label}
                      </SelectItem>
                    ))}

                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                required
                onValueChange={(value) => {
                  setStateValue(value);
                }}
                value={stateValue}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>States</SelectLabel>
                    {getStateByCountry(countryValue)?.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}

                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                required
                onValueChange={(value) => {
                  setCityValue(value)
                  let city = getCityByCountryAndName(countryValue, value)
                  setLatLang([Number(city?.latitude), Number(city?.longitude)])
                }}
                value={cityValue}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Cities</SelectLabel>
                    {getCityByState(countryValue, stateValue)?.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}

                  </SelectGroup>
                </SelectContent>
              </Select>
              <HomeMap locationValue={cityValue} latLang={latLang} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Select all the info you need</DialogTitle>
                <DialogDescription>
                  Please Choose a Location, so that what you want
                </DialogDescription>
              </DialogHeader>

              <Card>
                <CardHeader className="flex flex-col gap-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Guests</h3>
                      <p className="text-muted-foreground text-sm">
                        How many Guests do you want?
                      </p>
                    </div>

                    <Counter name="guest" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Rooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How many Rooms do you want?
                      </p>
                    </div>

                    <Counter name="room" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Washrooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How many Washrooms do you want?
                      </p>
                    </div>

                    <Counter name="bathroom" />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}

          <DialogFooter>
            <SubmitButtonLocal />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}