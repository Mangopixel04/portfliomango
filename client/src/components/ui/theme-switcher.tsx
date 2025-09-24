import { useState } from "react";

const themes = [
  { name: 'default', color: 'bg-blue-600' },
  { name: 'purple', color: 'bg-purple-600' },
  { name: 'green', color: 'bg-green-600' },
  { name: 'orange', color: 'bg-orange-600' },
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('default');

  const switchTheme = (themeName: string) => {
    setCurrentTheme(themeName);
    
    // Remove all theme classes
    themes.forEach(theme => {
      document.documentElement.classList.remove(`theme-${theme.name}`);
    });
    
    // Add new theme class if not default
    if (themeName !== 'default') {
      document.documentElement.classList.add(`theme-${themeName}`);
    }
  };

  return (
    <div className="fixed top-6 right-6 flex gap-2 z-50" data-testid="theme-switcher">
      {themes.map((theme) => (
        <button
          key={theme.name}
          onClick={() => switchTheme(theme.name)}
          className={`w-8 h-8 rounded-full ${theme.color} border-2 transition-all hover:scale-110 ${
            currentTheme === theme.name ? 'border-foreground' : 'border-transparent'
          }`}
          data-testid={`theme-option-${theme.name}`}
          aria-label={`Switch to ${theme.name} theme`}
        />
      ))}
    </div>
  );
}
