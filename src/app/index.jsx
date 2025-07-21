import { ToastContainer } from 'react-toastify';
import { AppProvider } from './provider';
import { AppRouter } from './router';
import { ThemeProvider } from '../context/ThemeContext';

export const App = () => {
  return (
    <AppProvider>
        <ThemeProvider>
      <AppRouter />   
        </ThemeProvider>
      <ToastContainer/>
    </AppProvider>
  );
};