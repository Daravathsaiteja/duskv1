import { CloudLightning } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/">
      <motion.div
        className="flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <CloudLightning className="h-8 w-8" />
        <span className="font-display text-xl font-bold tracking-tight">
          NORTH DUSK
        </span>
      </motion.div>
    </Link>
  );
}