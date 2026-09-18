import SafeImage from './SafeImage'

type BrandLogoProps = {
  markClassName?: string
  textClassName?: string
  tagline?: string
}

export default function BrandLogo({
  markClassName = 'h-9 w-9',
  textClassName = 'text-xl sm:text-2xl',
  tagline,
}: BrandLogoProps) {
  return (
    <span className="flex items-center gap-2.5">
      <SafeImage
        src="/logo.png"
        alt=""
        className={`${markClassName} shrink-0`}
        imgClassName="object-contain"
      />
      <span className="flex flex-col">
        <span className={`font-serif tracking-wide leading-none ${textClassName}`}>
          <span className="text-gold-gradient">AVEN</span>
          <span className="text-white">tures</span>
        </span>
        {tagline ? (
          <span className="mt-1.5 text-[11px] font-medium leading-tight tracking-wide text-gold">
            {tagline}
          </span>
        ) : null}
      </span>
    </span>
  )
}
