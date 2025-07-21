import React from "react";
import { useNavigate } from "react-router-dom";
import EpisodeLibrary from "@/components/organisms/EpisodeLibrary";

const Library = () => {
  const navigate = useNavigate();

  const handleLoadEpisode = (episode) => {
    navigate(`/?id=${episode.Id}`);
  };

  const handleNewEpisode = () => {
    navigate("/");
  };

  return (
    <div>
      <EpisodeLibrary
        onLoadEpisode={handleLoadEpisode}
        onNewEpisode={handleNewEpisode}
      />
    </div>
  );
};

export default Library;