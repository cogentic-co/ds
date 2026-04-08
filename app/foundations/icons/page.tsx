"use client"

import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Archive,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  AtSign,
  BarChart2,
  Bell,
  BellOff,
  Bookmark,
  BookOpen,
  Bot,
  Briefcase,
  Calendar,
  Camera,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  Clipboard,
  Clock,
  Cloud,
  CloudDownload,
  CloudUpload,
  Code,
  Copy,
  CreditCard,
  Database,
  Download,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  File,
  FileText,
  Filter,
  Flag,
  Folder,
  FolderOpen,
  Globe,
  Grid,
  HardDrive,
  Hash,
  Heart,
  HelpCircle,
  Home,
  Image,
  Inbox,
  Info,
  Key,
  Layers,
  Layout,
  Link,
  List,
  Lock,
  LogIn,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Minus,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Move,
  Music,
  Navigation,
  Package,
  Paperclip,
  Pause,
  Percent,
  Phone,
  Play,
  Plus,
  Power,
  Printer,
  RefreshCw,
  Save,
  Search,
  Send,
  Server,
  Settings,
  Share,
  Shield,
  ShoppingCart,
  Sliders,
  Star,
  Sun,
  Tag,
  Terminal,
  Trash,
  Trash2,
  TrendingUp,
  Type,
  Unlock,
  Upload,
  User,
  UserCheck,
  UserMinus,
  UserPlus,
  Users,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  X,
  XCircle,
  Zap,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import { useMemo, useState } from "react"
import { toast } from "sonner"
import { Input } from "@/src/components/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/tabs"
import { PixelIcon } from "@/src/icons/pixel"

// Curated set of ~80 lucide icons covering common categories
const LUCIDE_ICONS = [
  // Navigation
  { name: "Home", Component: Home },
  { name: "Menu", Component: Menu },
  { name: "Search", Component: Search },
  { name: "Navigation", Component: Navigation },
  { name: "ArrowUp", Component: ArrowUp },
  { name: "ArrowDown", Component: ArrowDown },
  { name: "ArrowLeft", Component: ArrowLeft },
  { name: "ArrowRight", Component: ArrowRight },
  { name: "ChevronUp", Component: ChevronUp },
  { name: "ChevronDown", Component: ChevronDown },
  { name: "ChevronLeft", Component: ChevronLeft },
  { name: "ChevronRight", Component: ChevronRight },
  // Actions
  { name: "Plus", Component: Plus },
  { name: "Minus", Component: Minus },
  { name: "X", Component: X },
  { name: "Check", Component: Check },
  { name: "Edit", Component: Edit },
  { name: "Trash", Component: Trash },
  { name: "Trash2", Component: Trash2 },
  { name: "Copy", Component: Copy },
  { name: "Save", Component: Save },
  { name: "Download", Component: Download },
  { name: "Upload", Component: Upload },
  { name: "Share", Component: Share },
  { name: "Send", Component: Send },
  { name: "RefreshCw", Component: RefreshCw },
  // Status & Feedback
  { name: "Info", Component: Info },
  { name: "AlertCircle", Component: AlertCircle },
  { name: "AlertTriangle", Component: AlertTriangle },
  { name: "CheckCircle", Component: CheckCircle },
  { name: "XCircle", Component: XCircle },
  { name: "HelpCircle", Component: HelpCircle },
  // User
  { name: "User", Component: User },
  { name: "Users", Component: Users },
  { name: "UserPlus", Component: UserPlus },
  { name: "UserMinus", Component: UserMinus },
  { name: "UserCheck", Component: UserCheck },
  { name: "Bot", Component: Bot },
  // Content
  { name: "File", Component: File },
  { name: "FileText", Component: FileText },
  { name: "Folder", Component: Folder },
  { name: "FolderOpen", Component: FolderOpen },
  { name: "Image", Component: Image },
  { name: "Video", Component: Video },
  { name: "VideoOff", Component: VideoOff },
  { name: "Music", Component: Music },
  { name: "Clipboard", Component: Clipboard },
  { name: "Archive", Component: Archive },
  { name: "Paperclip", Component: Paperclip },
  { name: "BookOpen", Component: BookOpen },
  // Communication
  { name: "Mail", Component: Mail },
  { name: "MessageSquare", Component: MessageSquare },
  { name: "Bell", Component: Bell },
  { name: "BellOff", Component: BellOff },
  { name: "Inbox", Component: Inbox },
  { name: "AtSign", Component: AtSign },
  // System & Settings
  { name: "Settings", Component: Settings },
  { name: "Sliders", Component: Sliders },
  { name: "Filter", Component: Filter },
  { name: "Grid", Component: Grid },
  { name: "List", Component: List },
  { name: "Layout", Component: Layout },
  { name: "Layers", Component: Layers },
  { name: "Database", Component: Database },
  { name: "Server", Component: Server },
  { name: "Terminal", Component: Terminal },
  { name: "Code", Component: Code },
  { name: "HardDrive", Component: HardDrive },
  { name: "Power", Component: Power },
  // Security
  { name: "Lock", Component: Lock },
  { name: "Unlock", Component: Unlock },
  { name: "Shield", Component: Shield },
  { name: "Key", Component: Key },
  // Misc
  { name: "Star", Component: Star },
  { name: "Heart", Component: Heart },
  { name: "Bookmark", Component: Bookmark },
  { name: "Flag", Component: Flag },
  { name: "Tag", Component: Tag },
  { name: "Hash", Component: Hash },
  { name: "Link", Component: Link },
  { name: "ExternalLink", Component: ExternalLink },
  { name: "Eye", Component: Eye },
  { name: "EyeOff", Component: EyeOff },
  { name: "Globe", Component: Globe },
  { name: "Camera", Component: Camera },
  { name: "Calendar", Component: Calendar },
  { name: "Clock", Component: Clock },
  { name: "Activity", Component: Activity },
  { name: "TrendingUp", Component: TrendingUp },
  { name: "BarChart2", Component: BarChart2 },
  { name: "Percent", Component: Percent },
  { name: "Zap", Component: Zap },
  { name: "Sun", Component: Sun },
  { name: "Moon", Component: Moon },
  { name: "Cloud", Component: Cloud },
  { name: "CloudDownload", Component: CloudDownload },
  { name: "CloudUpload", Component: CloudUpload },
  { name: "Wifi", Component: Wifi },
  { name: "WifiOff", Component: WifiOff },
  { name: "Phone", Component: Phone },
  { name: "Briefcase", Component: Briefcase },
  { name: "ShoppingCart", Component: ShoppingCart },
  { name: "CreditCard", Component: CreditCard },
  { name: "Package", Component: Package },
  { name: "Printer", Component: Printer },
  { name: "Play", Component: Play },
  { name: "Pause", Component: Pause },
  { name: "Volume2", Component: Volume2 },
  { name: "VolumeX", Component: VolumeX },
  { name: "Move", Component: Move },
  { name: "ZoomIn", Component: ZoomIn },
  { name: "ZoomOut", Component: ZoomOut },
  { name: "MoreHorizontal", Component: MoreHorizontal },
  { name: "MoreVertical", Component: MoreVertical },
  { name: "Circle", Component: Circle },
  { name: "Type", Component: Type },
  { name: "LogIn", Component: LogIn },
  { name: "LogOut", Component: LogOut },
] as const

// Curated selection of ~80 pixelarticons covering common categories
// Full set has 480+ icons — see node_modules/@iconify-icons/pixelarticons
const PIXEL_ICON_NAMES = [
  // Navigation
  "home",
  "menu",
  "search",
  "arrow-up",
  "arrow-down",
  "arrow-left",
  "arrow-right",
  "arrow-up-box",
  "arrow-down-box",
  "arrow-left-box",
  "arrow-right-box",
  "chevron-up",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  // Actions
  "plus",
  "minus",
  "close",
  "check",
  "edit",
  "trash",
  "copy",
  "save",
  "download",
  "upload",
  "forward",
  "reload",
  "undo",
  "redo",
  // Status
  "info-box",
  "alert",
  "warning-box",
  "check-double",
  // User
  "user",
  "users",
  "user-plus",
  "user-minus",
  "user-x",
  "avatar",
  "human",
  // Content
  "file",
  "file-alt",
  "folder",
  "image",
  "video",
  "music",
  "clipboard",
  "archive",
  "paperclip",
  "book-open",
  "article",
  "draft",
  // Communication
  "mail",
  "message",
  "notification",
  "notification-off",
  "chat",
  "at",
  "inbox",
  // System & Settings
  "sliders",
  "sliders-2",
  "grid",
  "list",
  "list-box",
  "layout",
  "server",
  "code",
  "script",
  "command",
  "debug",
  "analytics",
  // Security
  "lock",
  "lock-open",
  "shield",
  "key",
  // Misc
  "star",
  "heart",
  "bookmark",
  "flag",
  "label",
  "link",
  "external-link",
  "eye",
  "eye-closed",
  "globe",
  "map",
  "camera",
  "calendar",
  "clock",
  "trending-up",
  "trending-down",
  "chart",
  "chart-bar",
  "sun",
  "moon",
  "cloud",
  "cloud-download",
  "cloud-upload",
  "wifi",
  "play",
  "pause",
  "volume-3",
  "volume-x",
  "zap",
  "zoom-in",
  "zoom-out",
  "more-horizontal",
  "more-vertical",
  "login",
  "logout",
  "power",
  "phone",
  "briefcase",
  "cart",
  "credit-card",
  "wallet",
  "printer",
] as const

export default function IconsPage() {
  const [query, setQuery] = useState("")

  const filteredLucide = useMemo(
    () => LUCIDE_ICONS.filter((icon) => icon.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  const filteredPixel = useMemo(
    () => PIXEL_ICON_NAMES.filter((name) => name.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-8">
      <header>
        <h1 className="font-semibold text-3xl">Icons</h1>
        <p className="mt-1 text-muted-foreground">
          Two icon sets are available: the default lucide-react set and the alternate pixelarticons
          set for a distinctive pixel-art look. Click any icon to copy its import statement.
        </p>
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
                onClick={() => {
                  navigator.clipboard.writeText(`import { ${name} } from "lucide-react"`)
                  toast.success(`Copied ${name}`)
                }}
                className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card p-3 transition-colors hover:border-focal hover:bg-muted/30"
                aria-label={`Copy import for ${name}`}
              >
                <Component className="size-5" />
                <span className="w-full truncate text-center text-[10px] text-muted-foreground group-hover:text-foreground">
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
                onClick={() => {
                  navigator.clipboard.writeText(
                    `import { PixelIcon } from "@cogentic-co/ds/icons/pixel"\n\n<PixelIcon name="${name}" className="size-5" />`,
                  )
                  toast.success(`Copied ${name}`)
                }}
                className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card p-3 transition-colors hover:border-focal hover:bg-muted/30"
                aria-label={`Copy import for ${name}`}
              >
                <PixelIcon name={name} size={20} />
                <span className="w-full truncate text-center text-[10px] text-muted-foreground group-hover:text-foreground">
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
