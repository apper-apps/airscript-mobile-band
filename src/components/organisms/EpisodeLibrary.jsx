import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import EpisodeCard from "@/components/molecules/EpisodeCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import episodeService from "@/services/api/episodeService";
import { toast } from "react-toastify";

const EpisodeLibrary = ({ onLoadEpisode, onNewEpisode }) => {
  const [episodes, setEpisodes] = useState([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [toneFilter, setToneFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const loadEpisodes = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await episodeService.getAll();
      setEpisodes(data);
      setFilteredEpisodes(data);
    } catch (err) {
      setError("Failed to load episodes");
      console.error("Error loading episodes:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEpisodes();
  }, []);

  useEffect(() => {
    let filtered = [...episodes];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(episode =>
        episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        episode.theme.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply tone filter
    if (toneFilter) {
      filtered = filtered.filter(episode => episode.tone === toneFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        case "oldest":
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        case "title":
          return a.title.localeCompare(b.title);
        case "duration":
          return b.totalDuration - a.totalDuration;
        default:
          return 0;
      }
    });

    setFilteredEpisodes(filtered);
  }, [episodes, searchQuery, toneFilter, sortBy]);

  const handleDeleteEpisode = async (episodeId) => {
    if (!confirm("Are you sure you want to delete this episode? This action cannot be undone.")) {
      return;
    }

    try {
      await episodeService.delete(episodeId);
      setEpisodes(prev => prev.filter(episode => episode.Id !== episodeId));
      toast.success("Episode deleted successfully");
    } catch (err) {
      toast.error("Failed to delete episode");
      console.error("Error deleting episode:", err);
    }
  };

  if (isLoading) {
    return <Loading message="Loading your episodes..." />;
  }

  if (error) {
    return <Error message={error} onRetry={loadEpisodes} />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <ApperIcon name="Library" size={24} className="text-primary" />
            <span>Episode Library</span>
          </CardTitle>
          <Button onClick={onNewEpisode} className="flex items-center space-x-2">
            <ApperIcon name="Plus" size={16} />
            <span>New Episode</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {episodes.length === 0 ? (
          <Empty
            title="No episodes yet"
            description="Start creating your first radio show script to build your episode library."
            actionLabel="Create First Episode"
            onAction={onNewEpisode}
            icon="Radio"
          />
        ) : (
          <>
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <ApperIcon
                    name="Search"
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    placeholder="Search episodes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select
                value={toneFilter}
                onChange={(e) => setToneFilter(e.target.value)}
                className="w-full sm:w-40"
              >
                <option value="">All Tones</option>
                <option value="news">News</option>
                <option value="comedy">Comedy</option>
                <option value="lifestyle">Lifestyle</option>
              </Select>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-40"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
                <option value="duration">Duration</option>
              </Select>
            </div>

            {/* Episodes Grid */}
            {filteredEpisodes.length === 0 ? (
              <Empty
                title="No episodes found"
                description="Try adjusting your search or filter criteria."
                actionLabel="Clear Filters"
                onAction={() => {
                  setSearchQuery("");
                  setToneFilter("");
                  setSortBy("newest");
                }}
                icon="Search"
              />
            ) : (
              <motion.div
                layout
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence>
                  {filteredEpisodes.map((episode) => (
                    <EpisodeCard
                      key={episode.Id}
                      episode={episode}
                      onLoad={onLoadEpisode}
                      onDelete={handleDeleteEpisode}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EpisodeLibrary;