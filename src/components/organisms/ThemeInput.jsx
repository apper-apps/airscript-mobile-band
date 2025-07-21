import React, { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import FormField from "@/components/molecules/FormField";
import TonePreset from "@/components/molecules/TonePreset";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";

const ThemeInput = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = useState({
    title: "",
    theme: "",
    audience: "",
    tone: ""
  });

  const tonePresets = [
    {
      tone: "news",
      icon: "Newspaper",
      description: "Professional, informative, authoritative"
    },
    {
      tone: "comedy",
      icon: "Laugh",
      description: "Light-hearted, entertaining, humorous"
    },
    {
      tone: "lifestyle",
      icon: "Coffee",
      description: "Casual, conversational, relatable"
    }
  ];

  const audienceOptions = [
    { value: "", label: "Select target audience" },
    { value: "general", label: "General Audience" },
    { value: "young-adults", label: "Young Adults (18-35)" },
    { value: "professionals", label: "Working Professionals" },
    { value: "families", label: "Families" },
    { value: "seniors", label: "Seniors (55+)" },
    { value: "teens", label: "Teenagers" },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.theme || !formData.audience || !formData.tone) {
      return;
    }
    onGenerate(formData);
  };

  const isFormValid = formData.title && formData.theme && formData.audience && formData.tone;

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ApperIcon name="Sparkles" size={24} className="text-primary" />
          <span>Create New Episode</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField label="Show Title" required>
            <Input
              placeholder="e.g., Morning Drive Show, Tech Talk Tuesday"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              disabled={isLoading}
            />
          </FormField>

          <FormField label="Theme & Topic" required>
            <Textarea
              placeholder="Describe your show topic, key themes, or specific subjects you want to cover..."
              value={formData.theme}
              onChange={(e) => handleInputChange("theme", e.target.value)}
              disabled={isLoading}
              rows={4}
            />
          </FormField>

          <FormField label="Target Audience" required>
            <Select
              value={formData.audience}
              onChange={(e) => handleInputChange("audience", e.target.value)}
              disabled={isLoading}
            >
              {audienceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Tone & Style" required>
            <div className="grid gap-3">
              {tonePresets.map((preset) => (
                <TonePreset
                  key={preset.tone}
                  tone={preset.tone}
                  icon={preset.icon}
                  description={preset.description}
                  selected={formData.tone === preset.tone}
                  onClick={(tone) => handleInputChange("tone", tone)}
                />
              ))}
            </div>
          </FormField>

          <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ opacity: isFormValid ? 1 : 0.6 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              size="lg"
              className="w-full flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <ApperIcon name="Loader2" size={18} />
                  </motion.div>
                  <span>Generating Segments...</span>
                </>
              ) : (
                <>
                  <ApperIcon name="Wand2" size={18} />
                  <span>Generate Show Segments</span>
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ThemeInput;