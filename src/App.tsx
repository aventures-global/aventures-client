import { Navigate, Route, Routes, useLocation, useSearchParams } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import ScrollToTop from './components/ScrollToTop'
import About from './pages/About'
import Ask from './pages/Ask'
import Blog from './pages/Blog'
import Cart from './pages/Cart'
import Destinations from './pages/Destinations'
import Faq from './pages/Faq'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Inquire from './pages/Inquire'
import Login from './pages/Login'
import MerchDetail from './pages/MerchDetail'
import NotFound from './pages/NotFound'
import Onboarding from './pages/Onboarding'
import Privacy from './pages/Privacy'
import ResetPassword from './pages/ResetPassword'
import Shop from './pages/Shop'
import Signup from './pages/Signup'
import Sitemap from './pages/Sitemap'
import Terms from './pages/Terms'
import TourDetail from './pages/TourDetail'
import VerifyEmail from './pages/VerifyEmail'
import VerifyReset from './pages/VerifyReset'
import VisaAssistance from './pages/VisaAssistance'
import VisaService from './pages/VisaService'

function CustomTourRedirect() {
    const [searchParams] = useSearchParams()
    const tour = searchParams.get('tour')
    const to = tour ? `/start-your-aventure?destination=${encodeURIComponent(tour)}` : '/start-your-aventure'
    return <Navigate to={to} replace />
}

function AnimatedRoutes() {
    const location = useLocation()
    const state = location.state as { backgroundLocation?: typeof location } | null
    const backgroundLocation = state?.backgroundLocation
    const pageLocation = backgroundLocation ?? location

    return (
        <>
            <ScrollToTop />
            <div key={pageLocation.pathname} className="max-w-full overflow-x-clip">
                <Routes location={pageLocation}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<Navigate to="/about/why-us" replace />} />
                    <Route path="/about/:section" element={<About />} />
                    <Route path="/destinations" element={<Destinations />} />
                    <Route path="/destinations/:slug" element={<TourDetail />} />
                    <Route path="/traveler-quiz" element={<Navigate to="/#traveler-quiz" replace />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/shop/:slug" element={<MerchDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/verify-reset" element={<VerifyReset />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/custom-tour" element={<CustomTourRedirect />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/start-your-aventure" element={<Onboarding />} />
                    <Route path="/inquire" element={<Inquire />} />
                    <Route path="/visa-assistance" element={<VisaAssistance />} />
                    <Route path="/services/visa/:slug" element={<VisaService />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/ask" element={<Ask />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/sitemap" element={<Sitemap />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <AnimatePresence>
                {backgroundLocation && location.pathname === '/inquire' && <Inquire key="inquire-modal" modal />}
            </AnimatePresence>
        </>
    )
}

export default function App() {
    return <AnimatedRoutes />
}
