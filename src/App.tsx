import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Blog from './pages/Blog'
import Destinations from './pages/Destinations'
import Faq from './pages/Faq'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import ServiceRequest from './pages/ServiceRequest'
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
              <ServiceRequest
                kind="flights"
                title="Flights"
                description="Tell us where you are flying and when. We source competitive airfare that fits your itinerary — arranged by request, not a live search."
              />
            }
          />
          <Route
            path="/hotels"
            element={
              <ServiceRequest
                kind="hotels"
                title="Hotels"
                description="Share your destination and dates. We shortlist stays for setting, quiet, and ease of movement — curated by request, not a public inventory list."
              />
            }
          />
          <Route
            path="/cars"
            element={
              <ServiceRequest
                kind="cars"
                title="Cars & Transfers"
                description="Airport greetings, private cars, and island transfers. Tell us pickup details and we will arrange the vehicle alongside your journey."
              />
            }
          />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy" element={<Privacy />} />
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
