import { useState, useEffect } from 'react';
import api from '../utils/api';

const useQuote = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const { author, quote } = await api.getQuote();
        setQuote(quote);
        setAuthor(author);
      } catch (err) {
        alert(`Failed to fetch quote: ${err}`);
      }
    };

    fetchQuote();
  }, []);

  return { quote, author };
};

export default useQuote;
