import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { classifieds } from "@/lib/data"

export default function ClassifiedsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Classifieds</h1>
        <p className="text-muted-foreground">
          Buy, sell, or trade items with your neighbors.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {classifieds.map((item) => (
          <Card key={item.id} className="flex flex-col transition-all duration-300 hover:shadow-lg">
            <CardHeader className="p-0">
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={400}
                className="object-cover w-full rounded-t-lg aspect-video"
                data-ai-hint={item.imageHint}
              />
            </CardHeader>
            <CardContent className="flex-1 pt-6">
              <CardTitle className="text-xl font-headline">{item.title}</CardTitle>
              <p className="mt-2 text-2xl font-semibold text-primary">${item.price}</p>
              <CardDescription className="mt-4">{item.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Contact Seller</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
