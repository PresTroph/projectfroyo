import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import TimelyLogo from '@/public/TimelyLogo.png'
import { signIn } from "../lib/auth";
import { GitHubAuthButton, GoogleAuthButton } from "./SubmitButtons";

export function AuthModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Try for Free</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[360px]">
                <DialogHeader className="flex flex-row justify-center items-center gap-2">
                <DialogTitle className="sr-only">Timely Authentication</DialogTitle> {/* Visually hidden title */}
                    <Image src={TimelyLogo} alt="Logo" className="size-10"/>
                    <h4 className="text-3xl font-semibold">
                        <span className="text-primary">TIM</span>ELY
                    </h4>
                </DialogHeader>
                <div className="flex flex-col mt-5 gap-3">
                    <form 
                    action={async () => {
                        "use server";
                        await signIn("google");
                    }} 
                    className="w-full"
                    >
                        <GoogleAuthButton />
                    </form>
                    <form action={async () => {
                        "use server"
                        await signIn("github")
                    }}>
                        <GitHubAuthButton />
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}