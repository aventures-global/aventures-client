import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import type { Tour } from '../../types/content'
import SafeImage from '../ui/SafeImage'

type SignatureExperiencesProps = {
  tours: Tour[]
}

const bannerImageClass: Record<string, string> = {
  'philippine-discovery': 'object-cover object-[center_12%] transition duration-700 group-hover:scale-105',
  'cebu-tour': 'object-cover object-[center_40%] transition duration-700 group-hover:scale-105',
  'boracay-serenity': 'object-cover object-[82%_58%] transition duration-700 group-hover:scale-105',
}

export default function SignatureExperiences({ tours }: SignatureExperiencesProps) {
  return (
    <section id="destinations" className="page-section">
      <div className="site-container">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 font-serif text-3xl text-gold-gradient sm:text-4xl"
        >
          Signature Experiences
        </motion.h2>

        <div className="flex flex-col gap-3">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                to={`/destinations/${tour.slug}`}
                className="group relative block aspect-[5/1] min-h-40 w-full overflow-hidden rounded-2xl"
              >
                <SafeImage
                  src={tour.coverImage}
                  alt={tour.title}
                  className="absolute inset-0 h-full w-full"
                  imgClassName={
                    bannerImageClass[tour.id] ??
                    'object-cover object-center transition duration-700 group-hover:scale-105'
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:px-7 sm:pb-6">
                  <h3 className="text-lg font-bold text-white sm:text-xl">
                    {tour.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-white/80">{tour.tagline}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/destinations"
            className="text-sm font-medium text-gold transition hover:text-ivory"
          >
            Explore more →
          </Link>
        </div>
      </div>
    </section>
  )
}
