import type { ComponentProps, ReactNode } from "react"

type IconProps = ComponentProps<"svg">

function EthereumIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 256 417" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M127.961 0L125.166 9.5V285.168L127.961 287.958L255.923 212.32L127.961 0Z" fill="currentColor" fillOpacity={0.6} />
      <path d="M127.962 0L0 212.32L127.962 287.958V154.158V0Z" fill="currentColor" />
      <path d="M127.961 312.187L126.386 314.107V412.306L127.961 416.905L255.999 236.587L127.961 312.187Z" fill="currentColor" fillOpacity={0.6} />
      <path d="M127.962 416.905V312.187L0 236.587L127.962 416.905Z" fill="currentColor" />
    </svg>
  )
}

function BitcoinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16.5 8.25C16.5 6.04 14.46 5.25 12 5.25V3H10.5V5.25H9V3H7.5V5.25H4.5V7.5H6V16.5H4.5V18.75H7.5V21H9V18.75H10.5V21H12V18.75C14.46 18.75 16.5 17.96 16.5 15.75C16.5 14.04 15.42 13.2 14.25 12.75C15.18 12.3 16.5 11.46 16.5 8.25ZM9 7.5H12C13.24 7.5 14.25 8.01 14.25 9.75C14.25 11.49 13.24 12 12 12H9V7.5ZM12 16.5H9V12.75H12C13.24 12.75 14.25 13.26 14.25 15C14.25 16.74 13.24 16.5 12 16.5Z" fill="currentColor" />
    </svg>
  )
}

function TronIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M61.55 19.28L33.53 1.28C33.13 1.02 32.67 0.89 32.2 0.89C31.88 0.89 31.56 0.95 31.26 1.09L2.86 13.68C2.15 13.99 1.65 14.64 1.53 15.41C1.41 16.18 1.68 16.96 2.25 17.49L27.85 41.19L30.37 62.19C30.48 63.08 31.14 63.8 32.01 63.99C32.16 64.02 32.31 64.04 32.46 64.04C33.18 64.04 33.86 63.68 34.27 63.08L62.67 21.48C63.17 20.75 63.16 19.78 61.55 19.28ZM34.21 55.22L32.27 38.97L51.93 22.5L34.21 55.22ZM29.07 37.21L8.1 16.06L28.56 7.02L48.63 20.11L29.07 37.21Z" fill="currentColor" />
    </svg>
  )
}

function PolygonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 38 33" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M28.8 12.3C28.1 11.9 27.2 11.9 26.4 12.3L21.2 15.3L17.6 17.3L12.5 20.3C11.8 20.7 10.9 20.7 10.1 20.3L6.1 17.9C5.4 17.5 4.9 16.7 4.9 15.8V11.2C4.9 10.4 5.3 9.5 6.1 9.1L10.1 6.8C10.8 6.4 11.7 6.4 12.5 6.8L16.5 9.2C17.2 9.6 17.7 10.4 17.7 11.3V14.3L21.3 12.2V9.1C21.3 8.3 20.9 7.4 20.1 7L12.6 2.7C11.9 2.3 11 2.3 10.2 2.7L2.5 7.1C1.7 7.5 1.3 8.3 1.3 9.1V17.9C1.3 18.7 1.7 19.6 2.5 20L10.1 24.3C10.8 24.7 11.7 24.7 12.5 24.3L17.6 21.4L21.2 19.3L26.3 16.4C27 16 27.9 16 28.7 16.4L32.7 18.7C33.4 19.1 33.9 19.9 33.9 20.8V25.4C33.9 26.2 33.5 27.1 32.7 27.5L28.8 29.8C28.1 30.2 27.2 30.2 26.4 29.8L22.4 27.5C21.7 27.1 21.2 26.3 21.2 25.4V22.5L17.6 24.6V27.6C17.6 28.4 18 29.3 18.8 29.7L26.4 34C27.1 34.4 28 34.4 28.8 34V25.9L36.3 21.6C37 21.2 37.5 20.4 37.5 19.5V10.8C37.5 10 37.1 9.1 36.3 8.7L28.8 12.3Z" fill="currentColor" />
    </svg>
  )
}

function SolanaIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 398 312" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M64.6 237.9C66.5 236 69 234.9 71.7 234.9H391.5C395.8 234.9 398 240.1 395 243.1L333.4 304.7C331.5 306.6 329 307.7 326.3 307.7H6.5C2.2 307.7 0 302.5 3 299.5L64.6 237.9Z" fill="currentColor" />
      <path d="M64.6 7.4C66.6 5.5 69.1 4.4 71.7 4.4H391.5C395.8 4.4 398 9.6 395 12.6L333.4 74.2C331.5 76.1 329 77.2 326.3 77.2H6.5C2.2 77.2 0 72 3 69L64.6 7.4Z" fill="currentColor" />
      <path d="M333.4 121.8C331.5 119.9 329 118.8 326.3 118.8H6.5C2.2 118.8 0 124 3 127L64.6 188.6C66.5 190.5 69 191.6 71.7 191.6H391.5C395.8 191.6 398 186.4 395 183.4L333.4 121.8Z" fill="currentColor" />
    </svg>
  )
}

function BnbIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16 4L9.8 10.2L12.2 12.6L16 8.8L19.8 12.6L22.2 10.2L16 4Z" fill="currentColor" />
      <path d="M4 16L6.4 13.6L8.8 16L6.4 18.4L4 16Z" fill="currentColor" />
      <path d="M9.8 21.8L16 28L22.2 21.8L19.8 19.4L16 23.2L12.2 19.4L9.8 21.8Z" fill="currentColor" />
      <path d="M23.2 16L25.6 13.6L28 16L25.6 18.4L23.2 16Z" fill="currentColor" />
      <path d="M19 16L16 13L13 16L16 19L19 16Z" fill="currentColor" />
    </svg>
  )
}

const CHAIN_ICONS: Record<string, (props: IconProps) => ReactNode> = {
  ethereum: EthereumIcon,
  bitcoin: BitcoinIcon,
  tron: TronIcon,
  polygon: PolygonIcon,
  solana: SolanaIcon,
  bnb: BnbIcon,
}

export { CHAIN_ICONS, BnbIcon, BitcoinIcon, EthereumIcon, PolygonIcon, SolanaIcon, TronIcon }
