import { CreatioBottomBar } from "@/app/components/CreationBottomBar";
import { Counter } from "@/app/components/Counter";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreateDescription } from "@/app/actions";

export default function DescriptionPage({
    params,
}: {
    params: { id: string };
}) {
    return (
        <>
            <div className="w-3/5 mx-auto">
                <h2 className="text-3xl font-semibold tracking-tight transition-colors ">Describe your StayScape</h2>
            </div>

            <form action={CreateDescription}>
                <input type="hidden" name="homeId" value={params.id} />
                <div className="w-3/5 mx-auto mt-10 flex flex-col gap-y-5 mb-36">
                    <div className="flex flex-col gap-y-2">
                        <Label>Title</Label>
                        <Input name="title" type="text" required placeholder="Short and Simple" />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Description</Label>
                        <Textarea name="description" required placeholder="Describe your Stay" />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Price</Label>
                        <Input type="number" name="price" required placeholder="Price per Night in ₹" min={1000} />
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <Label>Wikipedia Link</Label>
                        <Input type="text" name="wikipedia-link" required placeholder="Enter the wiki link of your city" />
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <Label>Image</Label>
                        <Input type="file" name="images" multiple accept="image/*" required />
                    </div>
                    <Card>
                        <CardHeader className="flex flex-col gap-y-5">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h3 className="underline font-medium">Guests</h3>
                                    <p className="text-muted-foreground text-sm">Number of Guests ?</p>
                                </div>
                                <Counter name="guest" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h3 className="underline font-medium">Rooms</h3>
                                    <p className="text-muted-foreground text-sm">Number of Rooms ?</p>
                                </div>
                                <Counter name="room" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h3 className="underline font-medium">Washroom</h3>
                                    <p className="text-muted-foreground text-sm">Number of Washrooms ?</p>
                                </div>
                                <Counter name="washroom" />
                            </div>
                        </CardHeader>
                    </Card>
                </div>
                <CreatioBottomBar />
            </form>
        </>
    );
}