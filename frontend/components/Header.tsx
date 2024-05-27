import Link from "next/link";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import MenuIcon from "./icons/MenuIcon";
import ShoppingBasketIcon from "./icons/ShoppingBasketIcon";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 shadow">
      <nav className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link className="flex items-center gap-2" href="#">
          <ShoppingBasketIcon className="w-6 h-6" />
          <span className="text-xl font-semibold">Basketball Form</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden" size="icon" variant="outline">
              <MenuIcon className="w-6 h-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
        </Sheet>
      </nav>
    </header>
  );
}
