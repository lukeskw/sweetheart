import { memo } from 'react';
import { motion } from 'framer-motion';

const RomanticMessage = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.8 }}
      className="text-center px-6 mb-8"
    >
      <motion.p
        className="text-gray-300 text-sm leading-relaxed"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Hoje é Dia dos Namorados, mas a verdade é que todo
        dia ao seu lado é um verdadeiro exemplo do amor. É
        impressionante como você consegue transformar
        momentos simples em memórias eternas. Seu jeitinho,
        sorriso e olhar... tudo em você me faz querer ser
        alguém melhor. Você é meu lar, minha melhor escolha
        todos os dias. Obrigado por estar comigo, por me amar
        do jeito que eu sou e por fazer meu mundo mais bonito
        só por existir nele. Que venham muitos dias dos namorados
        juntos, e todos os outros também.
        <p className='text-red-500'>Te amo com tudo que sou</p>
        <p className='text-slate-400'>Com amor</p>
        <p className='text-slate-400'>Luke!</p>
      </motion.p>
    </motion.div>
  );
});

RomanticMessage.displayName = 'RomanticMessage';
export default RomanticMessage;