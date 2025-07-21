import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";
import EpisodeCreator from "@/components/pages/EpisodeCreator";
import Library from "@/components/pages/Library";
import Templates from "@/components/pages/Templates";
import Settings from "@/components/pages/Settings";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
      
      <div className="lg:pl-72">
        <Header 
          onMenuClick={handleMenuClick} 
          title="AirScript Pro"
          subtitle="AI-Powered Radio Show Planner"
        />
        
        <main className="py-6 px-6">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<EpisodeCreator />} />
              <Route path="/library" element={<Library />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="!rounded-lg !shadow-lg"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;