"use client";

import Link from "next/link";
import { categoryItems } from "../lib/categoryItems";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

export function MapFilterItems(){
    const searchParams = useSearchParams();
    const search = searchParams.get("filter");
    const pathname = usePathname();

    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams.toString());
    
          params.set(name, value);
    
          return params.toString();
        },
        [searchParams]
      );

    return(
        <div className="flex gap-x-10 mt-5 w-full justify-center overflow-x-scroll no-scrollbar" >
            <p className=" flex font-medium flex-nowrap justify-center items-center mb-1 gap-x-2">Filters
            <svg className="h-5 w-5 font-bold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="filter">
                <path d="M4 10h7.09a6 6 0 0 0 11.82 0H44a1 1 0 0 0 0-2H22.91A6 6 0 0 0 11.09 8H4a1 1 0 0 0 0 2zM17 5a4 4 0 1 1-4 4A4 4 0 0 1 17 5zM44 23H36.91a6 6 0 0 0-11.82 0H4a1 1 0 0 0 0 2H25.09a6 6 0 0 0 11.82 0H44a1 1 0 0 0 0-2zM31 28a4 4 0 1 1 4-4A4 4 0 0 1 31 28zM44 38H22.91a6 6 0 0 0-11.82 0H4a1 1 0 0 0 0 2h7.09a6 6 0 0 0 11.82 0H44a1 1 0 0 0 0-2zM17 43a4 4 0 1 1 4-4A4 4 0 0 1 17 43z"
                 data-name="Layer 15">
                    </path></svg></p>
            {categoryItems.map((item) => (
                <Link key={item.id} href={
                    pathname + "?" + createQueryString('filter', item.name)
                }
                className={cn(
                    search == item.name ? 'border-b-2 border-purple-700 pb-2 flex-shrink-0' : 'opacity-70 flex-shrink-0', "flex flex-col gap-y-3 items-center"
                )}
                >
                    <div className="relative w-6 h-6">
                        <Image src={item.imageUrl} alt="Category Image" className="w-6 h-6" width={24} height={24}/>
                    </div>
                    <p className="text-xs font-medium">{item.title}</p>
                </Link>
            ))}
        </div>
    )
}