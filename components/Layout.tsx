import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-900 sm:border-x border-dark-3 dark:border-light-3 px-4 sm:px-8 lg:px-16">
      <div className="bg-white dark:bg-neutral-900">{children}</div>
    </main>
  );
};

export default Layout;
