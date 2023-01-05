import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const CoffeeStore = () => {
    const router = useRouter();
    console.log("router", router);
    return (
        <div>
            Coffee Store Page {router.query.id}
            <Link href="/">
                Back to home
            </Link>
            <Link href="/coffee-store/dynamic">
                Go to page dynamic
            </Link>
        </div>
    );
};

export default CoffeeStore;