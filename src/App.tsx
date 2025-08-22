import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Home from '@/routes/Home';
import OpticsIntro from '@/routes/OpticsIntro';
import MirrorsLab from '@/routes/MirrorsLab';
import LensesLab from '@/routes/LensesLab';
import Practice from '@/routes/Practice';
import Summary from '@/routes/Summary';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';
import FunFacts from '@/routes/FunFacts';

function App() {
  return (
    // Wrap everything in a motion.div for the page load animation
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <Header />
      <ProgressBar />
      <main>
        <div id="home" className="section"><Home /></div>
        <div id="intro" className="section"><OpticsIntro /></div>
        <div id="mirrors" className="section"><MirrorsLab /></div>
        <div id="lenses" className="section"><LensesLab /></div>
        <div id="funfacts" className="section"><FunFacts /></div>
        <div id="practice" className="section"><Practice /></div>
        <div id="summary" className="section"><Summary /></div>
      </main>
      <Footer />
      
    </motion.div>
  );
}

export default App;