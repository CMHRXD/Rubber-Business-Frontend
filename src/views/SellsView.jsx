import { useState } from 'react';
import useSells from '../hooks/useSells';
import { TableSell } from '../components/TableSell';
import { motion } from 'framer-motion';
const SellsView = () => {

  const { sells, getSells } = useSells();

  return (
    <motion.div className=' w-full h-full p-3'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}  >
      {<TableSell />}
    </motion.div>
  )
}

export default SellsView;