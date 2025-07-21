import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const ScriptPreview = ({ episode, segments, onClose, onExport }) => {
  const generateScript = () => {
    const script = {
      intro: `Welcome to ${episode.title}! I'm your host, and today we're diving into ${episode.theme}. This show is designed for ${episode.audience} with a ${episode.tone} approach. Let's get started!`,
      segments: segments.map((segment, index) => ({
        ...segment,
        transition: index < segments.length - 1 
          ? `That wraps up our segment on ${segment.title}. Coming up next, we'll be discussing...`
          : "And that brings us to the end of today's show."
      })),
      adSlots: [
        { position: "15min", content: "[AD BREAK - 2 minutes]" },
        { position: "30min", content: "[AD BREAK - 2 minutes]" },
        { position: "45min", content: "[AD BREAK - 2 minutes]" }
      ],
      outro: `Thanks for tuning in to ${episode.title}. Remember to subscribe and join us next time for more great content. Until then, keep listening!`
    };

    return script;
  };

  const script = generateScript();

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary/5 to-accent/5">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{episode.title}</h2>
            <div className="flex items-center space-x-4 mt-2">
              <Badge variant="primary" className="capitalize">{episode.tone}</Badge>
              <Badge variant="outline">{segments.length} segments</Badge>
              <Badge variant="accent">{formatDuration(episode.totalDuration)}</Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="accent"
              onClick={() => onExport(script)}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Download" size={16} />
              <span>Export Script</span>
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <ApperIcon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
          <div className="prose prose-gray max-w-none">
            {/* Show Intro */}
            <section className="mb-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <ApperIcon name="Play" size={20} className="text-primary" />
                <h3 className="text-lg font-semibold text-gray-900 m-0">Show Introduction</h3>
                <Badge variant="outline">0:00 - 2:00</Badge>
              </div>
              <p className="text-gray-700 leading-relaxed m-0">{script.intro}</p>
            </section>

            {/* Segments */}
            {script.segments.map((segment, index) => {
              let currentTime = 2; // Start after intro
              for (let i = 0; i < index; i++) {
                currentTime += script.segments[i].duration;
              }
              const endTime = currentTime + segment.duration;

              return (
                <section key={segment.Id} className="mb-6">
                  <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 m-0">{segment.title}</h3>
                        <Badge variant="secondary" className="mt-1">
                          {formatDuration(currentTime)} - {formatDuration(endTime)}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="accent">{segment.duration} min</Badge>
                  </div>

                  <div className="pl-4 border-l-2 border-primary/20">
                    <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                      <ApperIcon name="List" size={16} className="mr-2 text-primary" />
                      Talking Points:
                    </h4>
                    <ul className="space-y-2 mb-4">
                      {segment.talkingPoints.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start space-x-2">
                          <span className="text-primary font-bold mt-1">•</span>
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>

                    {segment.transition && (
                      <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                        <p className="text-sm text-gray-700 italic m-0">
                          <strong>Transition:</strong> {segment.transition}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Ad Breaks */}
                  {script.adSlots.some(ad => {
                    const adTime = parseInt(ad.position);
                    return adTime >= currentTime && adTime <= endTime;
                  }) && (
                    <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <ApperIcon name="Radio" size={16} className="text-warning" />
                        <span className="font-medium text-warning">
                          {script.adSlots.find(ad => {
                            const adTime = parseInt(ad.position);
                            return adTime >= currentTime && adTime <= endTime;
                          })?.content}
                        </span>
                      </div>
                    </div>
                  )}
                </section>
              );
            })}

            {/* Show Outro */}
            <section className="mt-8 p-6 bg-gradient-to-r from-success/10 to-primary/10 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <ApperIcon name="Square" size={20} className="text-success" />
                <h3 className="text-lg font-semibold text-gray-900 m-0">Show Outro</h3>
                <Badge variant="outline">{formatDuration(episode.totalDuration - 2)} - {formatDuration(episode.totalDuration)}</Badge>
              </div>
              <p className="text-gray-700 leading-relaxed m-0">{script.outro}</p>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScriptPreview;