// 📁 src/components/Typewriter.jsx
import React, { useEffect, useState } from 'react';

const Typewriter = ({ sequence, className }) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (sequence.length === 0) return;

    if (subIndex === sequence[index].length + 1 && !isDeleting) {
      setTimeout(() => setIsDeleting(true), 1500);
      return;
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % sequence.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, sequence]);

  useEffect(() => {
    if (sequence.length > 0) {
      setText(sequence[index].substring(0, subIndex));
    }
  }, [subIndex, index, sequence]);

  return <span className={className}>{text}</span>;
};

export default Typewriter;
