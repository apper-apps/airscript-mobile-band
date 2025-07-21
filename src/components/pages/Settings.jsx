import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";

const Settings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ApperIcon name="Settings" size={24} className="text-primary" />
          <span>Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mb-6 mx-auto waveform-pattern">
            <ApperIcon name="Settings" size={40} className="text-primary" />
          </div>
          
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Settings Panel</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Customize your AirScript Pro experience with preferences for AI generation, export formats, and more. Coming in a future update!
          </p>
          
          <Button onClick={() => window.history.back()} className="flex items-center space-x-2">
            <ApperIcon name="ArrowLeft" size={18} />
            <span>Go Back</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Settings;