"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function NavigationMenuPreview() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-1 p-2">
              <NavigationMenuLink href="#">
                <div>
                  <div className="font-medium">Introduction</div>
                  <p className="text-muted-foreground text-sm">
                    Learn the basics of the design system.
                  </p>
                </div>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <div>
                  <div className="font-medium">Installation</div>
                  <p className="text-muted-foreground text-sm">
                    How to install and set up the components.
                  </p>
                </div>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
