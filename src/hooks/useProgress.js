import { useContext } from 'react';
import ProgressContext from '../context/ProgressContext';

// Custom hook to use progress context
const useProgress = () => {
  const context = useContext(ProgressContext);
  
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  
  return context;
};

export default useProgress;