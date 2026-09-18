import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Blog from './pages/Blog'
import Destinations from './pages/Destinations'
import Faq from './pages/Faq'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ServicePlaceholder from './pages/ServicePlaceholder'
import Sitemap from './pages/Sitemap'
import TourDetail from './pages/TourDetail'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="max-w-full overflow-x-clip"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:slug" element={<TourDetail />} />
          <Route
            path="/flights"
            element={
              <ServicePlaceholder
                title="Flights"
                description="Competitive airfare search and booking support — full booking tools arrive with the dynamic site."
              />
            }
          />
          <Route
            path="/hotels"
            element={
              <ServicePlaceholder
                title="Hotels"
                description="Curated stays worldwide. Hotel inventory and live rates will connect here soon."
              />
            }
          />
          <Route
            path="/cars"
            element={
              <ServicePlaceholder
                title="Cars & Transfers"
                description="Private transfers and car arrangements. Request assistance via our contact form today."
              />
            }
          />
          <Route path="/faq" element={<Faq />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return <AnimatedRoutes />
}
