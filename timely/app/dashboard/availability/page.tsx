import prisma from "@/app/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

async function getData(userId: string) {
    const data = await prisma.availability.findMany({
        where: {
            userId: userId,
        },
    });
}
export default function AvailabilityRoute() {
    return (
        <Card>
            <CardHeader> 
                <CardTitle>Availability</CardTitle>
                <CardDescription>
                    In this section you can manage your availability!
                </CardDescription>
            </CardHeader>
            <form >
                <CardContent>

                </CardContent>
            </form>
        </Card>
    );
}