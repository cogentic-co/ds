"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type ControlDefs, Playground, useControls } from "./_shared"

const tabsControlDefs = {
  variant: {
    type: "radio" as const,
    options: ["default", "line"],
    defaultValue: "default",
    label: "Variant",
  },
  defaultValue: {
    type: "select" as const,
    options: ["account", "password", "settings"],
    defaultValue: "account",
    label: "Default Tab",
  },
} satisfies ControlDefs

export default function TabsPreview() {
  const controls = useControls(tabsControlDefs)
  const { variant, defaultValue } = controls.values

  return (
    <div className="max-w-md space-y-6">
      {/* Interactive playground */}
      <Playground controls={controls}>
        <Tabs key={defaultValue} defaultValue={defaultValue}>
          <TabsList variant={variant as "default"}>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="name-pg">Name</Label>
                  <Input id="name-pg" defaultValue="James Cooke" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="current-pg">Current password</Label>
                  <Input id="current-pg" type="password" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="new-pg">New password</Label>
                  <Input id="new-pg" type="password" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure your preferences.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Settings content here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Playground>
    </div>
  )
}
