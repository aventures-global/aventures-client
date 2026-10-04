import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import SecondaryButton from '../ui/SecondaryButton'

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null)
    const reduceMotion = useReducedMotion()
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    })

    const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.48], [1, 1, 0])
    const titleY = useTransform(scrollYProgress, [0, 0.48], [0, -44])
    const descriptionOpacity = useTransform(scrollYProgress, [0, 0.3, 0.58], [1, 1, 0])
    const descriptionY = useTransform(scrollYProgress, [0, 0.58], [0, -30])
    const buttonOpacity = useTransform(scrollYProgress, [0, 0.4, 0.68], [1, 1, 0])
    const buttonY = useTransform(scrollYProgress, [0, 0.68], [0, -18])
    const imageOpacity = useTransform(scrollYProgress, [0, 0.42, 1], [1, 1, 0])

    return (
        <section
            ref={heroRef}
            className="relative flex min-h-svh items-center justify-center overflow-hidden"
        >
            <motion.div
                aria-hidden
                style={reduceMotion ? undefined : { opacity: imageOpacity }}
                className="absolute inset-0"
            >
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.25, ease: 'easeOut' }}
                    className="h-full w-full"
                >
                    <img
                        src="/assets/images/hero-travel-flight.png"
                        alt=""
                        className="h-full w-full object-cover object-center"
                        fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,15,20,0.28)_0%,rgba(10,15,20,0.08)_44%,rgba(10,15,20,0.3)_100%)]" />
                </motion.div>
            </motion.div>

            <div className="site-container relative z-10 flex justify-center py-32 text-center">
                <div className="flex max-w-4xl flex-col items-center">
                    <motion.div
                        style={reduceMotion ? undefined : { opacity: titleOpacity, y: titleY }}
                    >
                        <motion.h1
                            initial={
                                reduceMotion
                                    ? false
                                    : { opacity: 0, y: 26, letterSpacing: '0.08em' }
                            }
                            animate={{ opacity: 1, y: 0, letterSpacing: '0em' }}
                            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="hero-title-gradient font-lejour whitespace-nowrap text-[clamp(1.65rem,7vw,6rem)] leading-none"
                        >
                            JOURNEY MADE EASIER
                        </motion.h1>
                    </motion.div>
                    <motion.div
                        style={
                            reduceMotion
                                ? undefined
                                : { opacity: descriptionOpacity, y: descriptionY }
                        }
                        className="mt-2"
                    >
                        <motion.p
                            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.48, ease: 'easeOut' }}
                            className="font-noto-serif text-lg text-[#fffaf0] drop-shadow-md sm:text-2xl"
                        >
                            Dream It. Plan It. Live the AVENture.
                        </motion.p>
                    </motion.div>
                    <motion.div
                        style={reduceMotion ? undefined : { opacity: buttonOpacity, y: buttonY }}
                        className="mt-2"
                    >
                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.68, ease: 'easeOut' }}
                        >
                            <SecondaryButton to="/start-your-aventure" className="!border-2">
                                Start Your AVENture
                            </SecondaryButton>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
