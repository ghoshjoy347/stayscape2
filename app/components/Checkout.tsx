"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { ReservationSubmitButton } from "@/app/components/SubmitButtons";
import { format } from 'date-fns';

interface HomeDetails {
    title: string | null;
    city: string | null;
    country: string | null;
    price: number | null;
    id: string | null;
    photo: string[] | null;
    description: string | null;
}

interface CheckoutProps {
    homeDetails: HomeDetails;
    userId: string;
}

const Checkout: React.FC<CheckoutProps> = ({ homeDetails, userId }) => {

    const searchParams = useSearchParams();
    const startDate = searchParams?.get('startDate');
    const endDate = searchParams?.get('endDate');

    const reservation = [
        {
            startDate: new Date(startDate as string),
            endDate: new Date(endDate as string),
        },
    ]

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Home Details</h2>
                <div className="border rounded-lg p-4 mb-8">
                    <p className="text-lg mb-2">Title: {homeDetails.title}</p>
                    <p className="text-lg mb-2">Location: {homeDetails.city}, {homeDetails.country}</p>
                    <p className="text-lg mb-2">Price per day: Rs. {homeDetails.price}</p>
                    {/* <div className="flex flex-wrap">
                        {homeDetails.photo && homeDetails.photo.map((image, index) => (
                            <img key={index} src={`https://vlwiwgxhkkamdbzpbxhn.supabase.co/storage/v1/object/public/images/${image}`} alt={`Image ${index}`} className="w-1/4 m-2 rounded-lg" />
                        ))}
                    </div> */}
                </div>

                <h2 className="text-2xl font-bold mb-4">Reservation Details</h2>
                <div className="border rounded-lg p-4 mb-8">
                    <p className="text-lg mb-2">Start Date: {format(reservation[0].startDate, 'dd/MM/yyyy')}</p>
                    <p className="text-lg mb-2">End Date: {format(reservation[0].endDate, 'dd/MM/yyyy')}</p>
                </div>

                {/* <div className="border rounded-lg p-4 mb-8"> */}
                {/* </div> */}


                <ReservationSubmitButton price={homeDetails.price!} homeId={homeDetails.id!} userId={userId} state={reservation} />
            </div>
        </div>
    );
};

export default Checkout;