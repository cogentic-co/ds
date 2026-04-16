import {
  Archive,
  ArrowDown,
  ArrowRight,
  ArrowsHorizontal,
  AvatarCircle,
  Bell,
  Blocks,
  Calendar,
  Chart,
  Check,
  Checkbox,
  Clock,
  Cpu,
  Eye,
  File,
  FileText,
  Flag,
  Globe,
  Link,
  Lock,
  Mail,
  MapPin,
  Moon,
  Scale,
  Search,
  Send,
  Shield,
  Sparkles,
  SquareAlert,
  Terminal,
  User,
  UserPlus,
  Users,
  WarningDiamond,
  Zap,
} from "pixelarticons/react"
import type { ComponentType, SVGProps } from "react"

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

/**
 * Consolidated icon map used by bento / showcase visuals that accept
 * `icon: string` in their data shape. All icons are pixelarticons for
 * consistent pixel-art style.
 *
 * Importing this module pulls in ~35 pixelarticons. If you don't use
 * string-based icon resolution, pass a JSX node to the component's
 * `icon` prop directly (most bento components accept `ReactNode` as
 * well as `string`).
 */
export const ICON_MAP: Record<string, IconComponent> = {
  // Core product/brand
  shield: Shield,
  shieldOff: Shield,
  zap: Zap,
  globe: Globe,
  lock: Lock,
  users: Users,
  user: User,
  userCheck: User,
  userPlus: UserPlus,
  sparkles: Sparkles,

  // Data + charts
  chart: Chart,
  barChart: Chart,
  "bar-chart": Chart,
  barChart3: Chart,
  trending: Chart,
  trendingUp: Chart,
  gauge: Chart,
  activity: Chart,

  // Files + docs
  file: File,
  fileText: FileText,
  fileCheck: FileText,
  fileClock: FileText,
  fileInput: FileText,
  fileSearch: FileText,
  fileWarning: FileText,
  fileSpreadsheet: Chart,
  clipboardList: FileText,
  bookOpen: FileText,

  // State / status
  check: Check,
  checkCircle2: Check,
  checkSquare: Checkbox,
  circleDot: Flag,
  flag: Flag,
  bell: Bell,
  alertTriangle: WarningDiamond,

  // Layout / structure
  target: Flag,
  layers: Blocks,
  building: Blocks,
  building2: Blocks,
  landmark: Blocks,
  blocks: Blocks,
  database: Archive,
  cpu: Cpu,
  gitBranch: ArrowsHorizontal,
  network: Users,

  // Time
  clock: Clock,
  calendar: Calendar,
  refreshCw: Clock,

  // Dev
  code: Terminal,
  terminal: Terminal,

  // Communication
  mail: Mail,
  send: Send,
  mapPin: MapPin,

  // Navigation / misc
  arrowRight: ArrowRight,
  arrowDown: ArrowDown,
  arrowLeftRight: ArrowsHorizontal,
  arrowRightLeft: ArrowsHorizontal,
  arrowUpRight: ArrowRight,
  search: Search,
  eye: Eye,
  briefcase: FileText,
  creditCard: FileText,
  listChecks: Checkbox,
  tag: Flag,
  moon: Moon,
  scale: Scale,
  avatar: AvatarCircle,
  link: Link,
  squareAlert: SquareAlert,
}

const NORMALISED_ICON_MAP: Record<string, IconComponent> = Object.fromEntries(
  Object.entries(ICON_MAP).map(([key, icon]) => [key.toLowerCase().replace(/[\s_-]/g, ""), icon]),
)

/**
 * Resolve a case-insensitive icon name to a pixelarticons component.
 * Falls back to `Check` if the name is unknown.
 */
export function getIcon(iconName?: string, fallback: IconComponent = Check): IconComponent {
  if (!iconName) return fallback
  const normalized = iconName.toLowerCase().replace(/[\s_-]/g, "")
  return NORMALISED_ICON_MAP[normalized] || fallback
}

type IconProps = SVGProps<SVGSVGElement> & {
  name: string
  size?: number
}

/**
 * Resolve a string icon name to a rendered pixelarticons component.
 * If the name doesn't match the map, falls back to rendering the
 * string as text — useful for emoji or plain-text markers.
 */
export function Icon({ name, size = 12, className, ...rest }: IconProps) {
  const key = name.toLowerCase().replace(/[\s_-]/g, "")
  const Component = NORMALISED_ICON_MAP[key]
  if (Component) {
    return <Component width={size} height={size} className={className} aria-hidden {...rest} />
  }
  return <span className={className}>{name}</span>
}
