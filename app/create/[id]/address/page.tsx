"use client"

import { createLocation } from "@/app/actions";
import { CreatioBottomBar } from "@/app/components/CreationBottomBar";
import { useCountries, useCities } from "@/app/lib/getCountries";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useState } from "react";

export default function AddressRoutw({ params }: { params: { id: string } }) {
    const { getAllCities, getCityByCountry, getAllCountries, getStateByCountry, getCityByState } = useCities();
    const [locationValue, setLocationValue] = useState("");
    const [countryValue, setCountryValue] = useState("");
    const [stateValue, setStateValue] = useState("");
    const [cityValue, setCityValue] = useState("");

    const LazyMap = dynamic(() => import("@/app/components/Map"), {
        ssr: false,
        loading: () => <Skeleton className="h-[50vh] w-full" />,
    });
    return (
        <>
            <div className="w-3/5 mx-auto">
                <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">Location of the Home?</h2>
            </div>

            <form action={createLocation}>
                <input type="hidden" name="homeId" value={params.id} />
                <input type="hidden" name="countryValue" value={countryValue} />
                <input type="hidden" name="stateValue" value={stateValue} />
                <input type="hidden" name="cityValue" value={cityValue} />
                <div className="w-3/5 mx-auto mb-36">
                    <div className="mb-5">
                        <Select required onValueChange={(value) => setCountryValue(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Countries</SelectLabel>
                                    {getAllCountries()?.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="mb-5">
                        <Select required onValueChange={(value) => setStateValue(value)}>
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
                    </div>
                    <div className="mb-5">
                        <Select required onValueChange={(value) => setCityValue(value)}>
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
                    </div>
                    <LazyMap locationValue={locationValue} />
                </div>
                <CreatioBottomBar />
            </form>
        </>
    )
}