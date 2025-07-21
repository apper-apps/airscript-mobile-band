import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import ThemeInput from "@/components/organisms/ThemeInput";
import SegmentEditor from "@/components/organisms/SegmentEditor";
import ScriptPreview from "@/components/organisms/ScriptPreview";
import Loading from "@/components/ui/Loading";
import episodeService from "@/services/api/episodeService";
import segmentService from "@/services/api/segmentService";
import { toast } from "react-toastify";

const EpisodeCreator = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const episodeId = searchParams.get("id");

  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [segments, setSegments] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Load existing episode if ID is provided
  useEffect(() => {
    if (episodeId) {
      loadEpisode(parseInt(episodeId));
    }
  }, [episodeId]);

  const loadEpisode = async (id) => {
    try {
      setIsLoading(true);
      const episode = await episodeService.getById(id);
      setCurrentEpisode(episode);
      setSegments(episode.segments || []);
    } catch (err) {
      toast.error("Failed to load episode");
      console.error("Error loading episode:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSegments = async (themeData) => {
    try {
      setIsGenerating(true);
      
      // Create new episode
      const newEpisode = {
        title: themeData.title,
        theme: themeData.theme,
        audience: themeData.audience,
        tone: themeData.tone,
        segments: [],
        totalDuration: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const savedEpisode = await episodeService.create(newEpisode);
      
      // Simulate AI generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate segments based on theme and tone
      const generatedSegments = await segmentService.generateSegments(themeData);
      
      // Update episode with segments
      const totalDuration = generatedSegments.reduce((sum, segment) => sum + segment.duration, 0);
      const updatedEpisode = {
        ...savedEpisode,
        segments: generatedSegments,
        totalDuration: totalDuration,
        updatedAt: new Date()
      };

      const finalEpisode = await episodeService.update(savedEpisode.Id, updatedEpisode);
      
      setCurrentEpisode(finalEpisode);
      setSegments(generatedSegments);
      
      // Update URL to include episode ID
      navigate(`/?id=${finalEpisode.Id}`, { replace: true });
      
      toast.success("Segments generated successfully!");
      
    } catch (err) {
      toast.error("Failed to generate segments");
      console.error("Error generating segments:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSegmentsUpdate = async (updatedSegments) => {
    setSegments(updatedSegments);
    
    if (currentEpisode) {
      const totalDuration = updatedSegments.reduce((sum, segment) => sum + segment.duration, 0);
      const updatedEpisode = {
        ...currentEpisode,
        segments: updatedSegments,
        totalDuration: totalDuration,
        updatedAt: new Date()
      };
      
      setCurrentEpisode(updatedEpisode);
    }
  };

  const handleSaveEpisode = async () => {
    if (!currentEpisode) return;

    try {
      const totalDuration = segments.reduce((sum, segment) => sum + segment.duration, 0);
      const updatedEpisode = {
        ...currentEpisode,
        segments: segments,
        totalDuration: totalDuration,
        updatedAt: new Date()
      };

      await episodeService.update(currentEpisode.Id, updatedEpisode);
      setCurrentEpisode(updatedEpisode);
      toast.success("Episode saved successfully!");
    } catch (err) {
      toast.error("Failed to save episode");
      console.error("Error saving episode:", err);
    }
  };

  const handleExportScript = (script) => {
    // Convert script to formatted text
    const formatScript = (script) => {
      let formattedScript = `${currentEpisode.title}\n`;
      formattedScript += `${"=".repeat(currentEpisode.title.length)}\n\n`;
      formattedScript += `Theme: ${currentEpisode.theme}\n`;
      formattedScript += `Audience: ${currentEpisode.audience}\n`;
      formattedScript += `Tone: ${currentEpisode.tone}\n`;
      formattedScript += `Duration: ${currentEpisode.totalDuration} minutes\n\n`;
      
      formattedScript += `INTRODUCTION (0:00 - 2:00)\n`;
      formattedScript += `${"-".repeat(30)}\n`;
      formattedScript += `${script.intro}\n\n`;

      script.segments.forEach((segment, index) => {
        let currentTime = 2;
        for (let i = 0; i < index; i++) {
          currentTime += script.segments[i].duration;
        }
        const endTime = currentTime + segment.duration;

        formattedScript += `SEGMENT ${index + 1}: ${segment.title} (${currentTime}:00 - ${endTime}:00)\n`;
        formattedScript += `${"-".repeat(50)}\n`;
        formattedScript += `Duration: ${segment.duration} minutes\n\n`;
        formattedScript += `Talking Points:\n`;
        segment.talkingPoints.forEach((point) => {
          formattedScript += `• ${point}\n`;
        });
        formattedScript += `\nTransition: ${segment.transition}\n\n`;
      });

      formattedScript += `OUTRO (${currentEpisode.totalDuration - 2}:00 - ${currentEpisode.totalDuration}:00)\n`;
      formattedScript += `${"-".repeat(30)}\n`;
      formattedScript += `${script.outro}\n`;

      return formattedScript;
    };

    const formattedScript = formatScript(script);
    const blob = new Blob([formattedScript], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${currentEpisode.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_script.txt`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success("Script exported successfully!");
    setShowPreview(false);
  };

  if (isLoading) {
    return <Loading message="Loading episode..." />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ThemeInput
            onGenerate={generateSegments}
            isLoading={isGenerating}
          />
        </div>
        
        <div className="lg:col-span-2">
          {isGenerating ? (
            <Loading message="AI is generating your segments..." />
          ) : (
            <SegmentEditor
              segments={segments}
              episode={currentEpisode}
              onUpdate={handleSegmentsUpdate}
              onSave={handleSaveEpisode}
              onPreview={() => setShowPreview(true)}
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {showPreview && currentEpisode && (
          <ScriptPreview
            episode={currentEpisode}
            segments={segments}
            onClose={() => setShowPreview(false)}
            onExport={handleExportScript}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EpisodeCreator;