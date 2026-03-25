import { Outlet, Link, useLocation } from 'react-router-dom';
import { BrainCircuit, BarChart3, MessageSquareText } from 'lucide-react';
import classNames from 'classnames';

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Assess', icon: BrainCircuit },
    { path: '/results', label: 'Report', icon: BarChart3 },
    { path: '/mentor', label: 'AI Mentor', icon: MessageSquareText },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shadow-inner">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <div className="font-heading font-bold text-xl tracking-tight text-slate-900" aria-label="PsycheScale Logo">
                PsycheScale<span className="text-primary-600">.</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={classNames(
                      "inline-flex items-center gap-2 px-1 pt-1 border-b-2 text-sm font-medium transition-colors",
                      isActive 
                        ? "border-primary-500 text-primary-600" 
                        : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Profile / Action - Stub */}
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full border-2 border-primary-100 bg-primary-50"></div>
            </div>
            
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500 font-mono">
          PsycheScale 2026 Platform Prototype
        </div>
      </footer>
    </div>
  );
}
