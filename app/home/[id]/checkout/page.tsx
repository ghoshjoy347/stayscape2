import Script from "next/script";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ToastContainer } from 'react-toastify';
import Checkout from "@/app/components/Checkout";
import 'react-toastify/dist/ReactToastify.css';

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
            id: true,
        },
    });

    return data;
}

export default async function CheckoutRoute({
    params,
}: {
    params: { id: string };
}) {
    const data = await getData(params.id);
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <ToastContainer />
            <Checkout homeDetails={data!} userId={user?.id!} />
        </>
    )
}