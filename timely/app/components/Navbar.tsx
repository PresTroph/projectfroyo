import Image from "next/image";
import Link from "next/link";
import TimelyLogo from '@/public/TimelyLogo.png' 
import { AuthModal } from "./AuthModal";

export function Navbar() {
    return (
        <div className="flex py-5 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
            <Image src={TimelyLogo} alt="Logo" className="size-10" />
            <h4 className="text-3xl font-semibold">
                <span className="text-violet-700">TIM</span>ELY
            </h4>
            </Link>

            <AuthModal />
        </div>
    );
}