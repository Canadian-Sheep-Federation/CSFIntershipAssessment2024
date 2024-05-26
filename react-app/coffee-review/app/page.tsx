import Image from "next/image";
import {Button, ButtonGroup} from "@nextui-org/button";
import Link from 'next/link';

var data = null
async function getData() {
  const res = await fetch('https://coffee.alexflipnote.dev/random.json',{cache: "no-store"})
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function Page() {
  data = await getData()
  console.log(data.file)
  
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Coffee Review</h1>
      <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] padding-[0.5rem]"
          src={data.file}
          
          alt="coffee image"
          width={500}
          height={500}
          id="coffee-image"
          priority
        />
        <Link href={{
          pathname:'/form',
          query: {
            search: data.file
          }}}>
            <Button color="primary">Go to Form</Button>
        </Link>
        <Link href="/">
            <Button color="primary">New image</Button>
        </Link>
    </main>
  );
}
