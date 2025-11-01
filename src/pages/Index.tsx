import { useState } from 'react';
import InstallationScreen from '@/components/browser/InstallationScreen';
import BrowserApp from '@/components/browser/BrowserApp';
import LandingPage from '@/components/landing/LandingPage';

export default function Index() {
  const [installing, setInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [browserOpen, setBrowserOpen] = useState(false);

  const startInstallation = () => {
    setInstalling(true);
    setInstallProgress(0);
    
    const interval = setInterval(() => {
      setInstallProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setInstalling(false);
            setBrowserOpen(true);
          }, 500);
          return 100;
        }
        return prev + 3;
      });
    }, 40);
  };

  if (installing) {
    return <InstallationScreen installProgress={installProgress} />;
  }

  if (browserOpen) {
    return <BrowserApp />;
  }

  return <LandingPage onStartInstallation={startInstallation} />;
}
