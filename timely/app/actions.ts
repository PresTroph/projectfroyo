"use server";

import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import{parseWithZod} from '@conform-to/zod';
import { onboardingSchema, onboardingSchemaValidation, settingsSchema } from "./lib/zodSchemas";
import { redirect } from "next/navigation";


export async function OnboardingAction(prevState: any,formData: FormData) {
    const session = await requireUser();

    const submission = await parseWithZod(formData, {
        schema: onboardingSchemaValidation({
          async isUsernameUnique() {
            const existingUsername = await prisma.user.findUnique({
                where: {
                    userName: formData.get("userName") as string,
                },
            }); 

            return !existingUsername;
          },
        }),

        async: true,
    });

    if(submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.user.update({
        where: {
            id: session.user?.id,
        },
        data: {
            userName: submission.value.userName,
            name: submission.value.fullName,
        },
    });

    return redirect("/onboarding/grant-id");
}

export async function SeetingsAction(prevState: any, formData: FormData) {
 const session = await requireUser();
 
 const submission = parseWithZod(formData, {
    schema: settingsSchema,
 });

 if(submission.status !== "success") {
   return submission.reply();
 }

 const user = await prisma.user.update({
    where: {
        id: session.user?.id,
    },
    data: {             //wrong area all of this is supposed to be done one step up
        name: submission.value.fullName,
        image: submission.value.fullName,
        availability: {
            createMany: {
                data: [
                    {
                        day: "Monday",
                        fromTime: "08:00",
                        tillTime: "18:00",
                    },
                    {
                        day: "Tuesday",
                        fromTime: "08:00",
                        tillTime: "18:00",
                    },
                    {
                        day: "Wednesday",
                        fromTime: "08:00",
                        tillTime: "18:00",
                    },
                    {
                        day: "Thursday",
                        fromTime: "08:00",
                        tillTime: "18:00",
                    },
                    {
                        day: "Fiday",
                        fromTime: "08:00",
                        tillTime: "18:00",
                    },
                    {
                        day: "Saturday",
                        fromTime: "08:00",
                        tillTime: "18:00",
                    },
                    {
                        day: "Sunday",
                        fromTime: "08:00",
                        tillTime: "18:00",
                    },
                ]
            }
        }
    },
 });

 redirect("/dashboard")
}