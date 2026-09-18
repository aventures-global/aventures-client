import { motion } from 'motion/react'
import type { Partner } from '../../types/content'
import SafeImage from '../ui/SafeImage'

type PartnersProps = {
  partners: Partner[]
}

export default function Partners({ partners }: PartnersProps) {
  return (
    <section className="border-y border-white/5 bg-ink-soft/40 py-14">
      <div className="site-container text-center">
        <p className="mb-8 text-xs font-medium uppercase tracking-[0.25em] text-gold">
          As Trusted By:
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
        >
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex h-10 w-28 items-center justify-center opacity-80 grayscale brightness-200 contrast-125 transition hover:opacity-100 sm:w-32"
            >
              <SafeImage
                src={partner.logoSrc}
                alt={partner.name}
                className="h-full w-full"
                imgClassName="object-contain"
              />
            </div>
          ))}
        </motion.div>
        <p className="mt-8 text-sm text-gold/80">
          The Most Dynamic Global Tour and Travel Support
        </p>
      </div>
    </section>
  )
}
