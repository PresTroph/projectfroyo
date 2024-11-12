"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "./SubmitButtons"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { settingsSchema } from "../lib/zodSchemas"
import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { UploadDropzone } from "../lib/uploadthing"
import { toast } from "sonner"

interface iAppProps {
    fullName: string;
    email: string;
    profileImage: string;
}

export function SettingsForm({email, fullName, profileImage}: iAppProps) {
    const [lastResult, action] = useActionState(SettingsAction, undefined);
    const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
    const [form, fields] = useForm({
        lastResult,

        onValidate({formData}) {
            return parseWithZod(formData, {
                schema: settingsSchema,
            });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    const handleDeleteImage = () => {
       setCurrentProfileImage(""); 
    }
   return (
    <Card>
    <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings!</CardDescription>
    </CardHeader>

    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
       <CardContent className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
            <Label>Full Name</Label>
            <Input 
            name={fields.fullName.name} 
            key={fields.fullName.key} 
            defaultValue={fullName} 
            placeholder="Jear Bear" 
            />
            <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
        </div>
        <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input defaultValue={email} placeholder="test@test.com"/>
        </div>

            <div className="grid gap-y-5">
                <Label>Profile Image</Label>
                <input type="hidden" name={fields.profileImage.name} key={fields.profileImage.key} value={currentProfileImage}/>
                {currentProfileImage ? (
                    <div className="relative size-16">
                    <img src={currentProfileImage} 
                         alt="Profile Image"
                         className="size-16 rounded-lg" 
                         />

                         <Button 
                         onClick={handleDeleteImage} 
                         variant="destructive" 
                         size= "icon" 
                         type="button"
                         className="absolute -top-3 -right-3"
                         >
                            <X className="size-4" />
                         </Button>
                    </div>
                ): (
                    <UploadDropzone onClientUploadComplete={(res) =>{
                        setCurrentProfileImage(res[0].url)
                        toast.success("Profile Image has been uploaded");
                    }} 
                    onUploadError={(error) => {
                        console.log("something went wrong", error)
                        toast.error(error.message);
                    }}
                    endpoint="imageUploader" />
                )}
                <p className="text-red-500 text-sm">{fields.profileImage.errors}</p>
            </div>
        </CardContent>
        <CardFooter>
            <SubmitButton text="Save Changes" />   
        </CardFooter> 
    </form>
</Card>
   )
}

function SettingsAction(state: undefined): Promise<undefined> | undefined {
    throw new Error("Function not implemented.")
}