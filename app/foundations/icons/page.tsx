"use client"

import {
  AlertCircle,
  Archive,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Bookmark,
  Calendar,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clipboard,
  Clock,
  Cloud,
  Code,
  Copy,
  CreditCard,
  Download,
  Edit,
  Eye,
  EyeOff,
  File,
  Filter,
  Folder,
  Heart,
  HelpCircle,
  Home,
  Image,
  Info,
  Layers,
  Layout,
  Link as LinkIcon,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mic,
  Monitor,
  Moon,
  MoreHorizontal,
  Music,
  Phone,
  Play,
  Plus,
  Save,
  Search,
  Send,
  Settings,
  Share,
  Shield,
  ShoppingBag,
  Star,
  Sun,
  Tag,
  Trash,
  Trash2,
  Upload,
  User,
  Users,
  Video,
  Wifi,
  X,
  Zap,
} from "lucide-react"
import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PixelIcon } from "@/src/icons/pixel"

const LUCIDE_ICONS: {
  name: string
  Component: React.ComponentType<React.SVGProps<SVGSVGElement>>
}[] = [
  { name: "AlertCircle", Component: AlertCircle },
  { name: "Archive", Component: Archive },
  { name: "ArrowDown", Component: ArrowDown },
  { name: "ArrowLeft", Component: ArrowLeft },
  { name: "ArrowRight", Component: ArrowRight },
  { name: "ArrowUp", Component: ArrowUp },
  { name: "Bell", Component: Bell },
  { name: "Bookmark", Component: Bookmark },
  { name: "Calendar", Component: Calendar },
  { name: "Camera", Component: Camera },
  { name: "Check", Component: Check },
  { name: "ChevronDown", Component: ChevronDown },
  { name: "ChevronLeft", Component: ChevronLeft },
  { name: "ChevronRight", Component: ChevronRight },
  { name: "ChevronUp", Component: ChevronUp },
  { name: "Clipboard", Component: Clipboard },
  { name: "Clock", Component: Clock },
  { name: "Cloud", Component: Cloud },
  { name: "Code", Component: Code },
  { name: "Copy", Component: Copy },
  { name: "CreditCard", Component: CreditCard },
  { name: "Download", Component: Download },
  { name: "Edit", Component: Edit },
  { name: "Eye", Component: Eye },
  { name: "EyeOff", Component: EyeOff },
  { name: "File", Component: File },
  { name: "Filter", Component: Filter },
  { name: "Folder", Component: Folder },
  { name: "Heart", Component: Heart },
  { name: "HelpCircle", Component: HelpCircle },
  { name: "Home", Component: Home },
  { name: "Image", Component: Image },
  { name: "Info", Component: Info },
  { name: "Layers", Component: Layers },
  { name: "Layout", Component: Layout },
  { name: "Link", Component: LinkIcon },
  { name: "Lock", Component: Lock },
  { name: "LogOut", Component: LogOut },
  { name: "Mail", Component: Mail },
  { name: "MapPin", Component: MapPin },
  { name: "Menu", Component: Menu },
  { name: "MessageCircle", Component: MessageCircle },
  { name: "Mic", Component: Mic },
  { name: "Monitor", Component: Monitor },
  { name: "Moon", Component: Moon },
  { name: "MoreHorizontal", Component: MoreHorizontal },
  { name: "Music", Component: Music },
  { name: "Phone", Component: Phone },
  { name: "Play", Component: Play },
  { name: "Plus", Component: Plus },
  { name: "Save", Component: Save },
  { name: "Search", Component: Search },
  { name: "Send", Component: Send },
  { name: "Settings", Component: Settings },
  { name: "Share", Component: Share },
  { name: "Shield", Component: Shield },
  { name: "ShoppingBag", Component: ShoppingBag },
  { name: "Star", Component: Star },
  { name: "Sun", Component: Sun },
  { name: "Tag", Component: Tag },
  { name: "Trash", Component: Trash },
  { name: "Trash2", Component: Trash2 },
  { name: "Upload", Component: Upload },
  { name: "User", Component: User },
  { name: "Users", Component: Users },
  { name: "Video", Component: Video },
  { name: "Wifi", Component: Wifi },
  { name: "X", Component: X },
  { name: "Zap", Component: Zap },
]

// Curated list of pixelarticons. PascalCase names — see node_modules/pixelarticons/react
// for the full ~800 icon list, or visit https://pixelarticons.com.
const PIXEL_ICONS = [
  "AlertCircle",
  "Archive",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "Bell",
  "Bookmark",
  "Calendar",
  "Camera",
  "Check",
  "ChevronDown",
  "ChevronLeft",
  "ChevronRight",
  "ChevronUp",
  "Clipboard",
  "Clock",
  "Cloud",
  "Code",
  "Copy",
  "CreditCard",
  "Download",
  "Edit",
  "Eye",
  "EyeClosed",
  "File",
  "Filter",
  "Folder",
  "Heart",
  "HelpCircle",
  "Home",
  "Image",
  "Info",
  "Layers",
  "Layout",
  "Link",
  "Lock",
  "Logout",
  "Mail",
  "MapPin",
  "Menu",
  "Message",
  "Mic",
  "Monitor",
  "Moon",
  "MoreHorizontal",
  "Music",
  "Phone",
  "Play",
  "Plus",
  "Save",
  "Search",
  "Send",
  "Cog",
  "Share",
  "Shield",
  "Shopping",
  "Star",
  "Sun",
  "Tag",
  "Trash",
  "TrashAlt",
  "Upload",
  "User",
  "Users",
  "Video",
  "Wifi",
  "Close",
  "Zap",
]

export default function IconsPage() {
  const [query, setQuery] = useState("")

  const filteredLucide = useMemo(
    () => LUCIDE_ICONS.filter((icon) => icon.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  const filteredPixel = useMemo(
    () => PIXEL_ICONS.filter((name) => name.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  function copyImport(text: string) {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-8">
      <header>
        <h1 className="font-semibold text-3xl">Icons</h1>
        <p className="mt-1 text-muted-foreground">
          Two icon sets are available: <strong>lucide-react</strong> (the default, included in the
          package) and <strong>pixelarticons</strong> (an optional pixel-art alternate). Click any
          icon to copy its import statement.
        </p>
        <Card className="mt-4 p-4">
          <p className="text-muted-foreground text-sm">
            <strong className="text-foreground">Using pixelarticons:</strong> install the peer
            dependency, then import from the subpath:
          </p>
          <pre className="mt-2 overflow-x-auto rounded-md bg-muted/40 p-3 text-xs">
            <code>{`pnpm add pixelarticons

import { PixelIcon } from "@cogentic-co/ds/icons/pixel"

<PixelIcon name="Home" className="size-4" />`}</code>
          </pre>
        </Card>
      </header>

      <Input
        type="search"
        placeholder="Search icons..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Tabs defaultValue="lucide">
        <TabsList>
          <TabsTrigger value="lucide">Lucide ({filteredLucide.length})</TabsTrigger>
          <TabsTrigger value="pixel">Pixelarticons ({filteredPixel.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="lucide">
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
            {filteredLucide.map(({ name, Component }) => (
              <button
                key={name}
                type="button"
                onClick={() => copyImport(`import { ${name} } from "lucide-react"`)}
                className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card p-3 transition-colors hover:border-focal hover:bg-muted/30"
                aria-label={`Copy import for ${name}`}
              >
                <Component className="size-5" />
                <span className="truncate text-[10px] text-muted-foreground group-hover:text-foreground">
                  {name}
                </span>
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pixel">
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
            {filteredPixel.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() =>
                  copyImport(
                    `import { PixelIcon } from "@cogentic-co/ds/icons/pixel"\n\n<PixelIcon name="${name}" className="size-4" />`,
                  )
                }
                className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card p-3 transition-colors hover:border-focal hover:bg-muted/30"
                aria-label={`Copy import for ${name}`}
              >
                <PixelIcon name={name} size={20} />
                <span className="truncate text-[10px] text-muted-foreground group-hover:text-foreground">
                  {name}
                </span>
              </button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
