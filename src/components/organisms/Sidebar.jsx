import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigationItems = [
    { path: "/", label: "New Episode", icon: "Plus", description: "Create a new show" },
    { path: "/library", label: "Episode Library", icon: "Library", description: "Saved drafts" },
    { path: "/templates", label: "Templates", icon: "FileText", description: "Coming soon" },
    { path: "/settings", label: "Settings", icon: "Settings", description: "Preferences" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <ApperIcon name="Radio" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">AirScript Pro</h1>
            <p className="text-xs text-gray-600">AI Radio Planner</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => onClose?.()}
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-primary text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100 hover:text-primary"
              )
            }
          >
            {({ isActive }) => (
              <>
                <ApperIcon
                  name={item.icon}
                  size={18}
                  className={cn(
                    "transition-colors duration-200",
                    isActive ? "text-white" : "text-gray-500 group-hover:text-primary"
                  )}
                />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className={cn(
                    "text-xs transition-colors duration-200",
                    isActive ? "text-white/80" : "text-gray-500"
                  )}>
                    {item.description}
                  </div>
                </div>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-200">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <ApperIcon name="Sparkles" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-gray-900">AI Powered</p>
              <p className="text-xs text-gray-600">Professional scripts in minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-200 z-50 lg:hidden"
          >
            <SidebarContent />
          </motion.div>
        </>
      )}
    </>
  );
};

export default Sidebar;