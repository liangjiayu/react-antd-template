import { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const addCount = () => {
    setCount((c) => c + 1);
  };

  const reduceCount = () => {
    setCount((c) => c - 1);
  };

  return { count, addCount, reduceCount };
};
