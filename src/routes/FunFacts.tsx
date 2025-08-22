import { motion } from "framer-motion";
import styles from './FunFacts.module.css';

const facts = [
    "The word 'lens' comes from the Latin word for 'lentil', because the shape of a convex lens resembles a lentil bean.",
    "Rainbows are an optical illusion caused by the dispersion and reflection of light in water droplets (like rain or mist).",
    "Polarized sunglasses work by blocking glare, which is horizontally polarized light reflecting off surfaces like water or roads.",
];

const FunFacts = () => {
    return (
        <div className={styles.container}>
            <motion.h2 
                className={`sectionTitle`}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                Did You Know?
            </motion.h2>
            <motion.p 
                className={`sectionSubtitle`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                A few mind-bending facts about the world of optics.
            </motion.p>
            <motion.div 
                className={styles.grid}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ staggerChildren: 0.2 }}
            >
                {facts.map((fact, index) => (
                    <motion.div 
                        key={index} 
                        className={`glassmorphismCard ${styles.factCard}`}
                        variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ type: 'spring', stiffness: 100 }}
                    >
                        <div className={styles.cardNumber}>{index + 1}</div>
                        <p>{fact}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default FunFacts;