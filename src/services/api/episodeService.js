import episodeData from "@/services/mockData/episodes.json";

class EpisodeService {
  constructor() {
    this.episodes = [...episodeData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.episodes];
  }

  async getById(Id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const episode = this.episodes.find(episode => episode.Id === Id);
    if (!episode) {
      throw new Error("Episode not found");
    }
    return { ...episode };
  }

  async create(episodeData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...this.episodes.map(e => e.Id), 0) + 1;
    const newEpisode = {
      Id: newId,
      ...episodeData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.episodes.unshift(newEpisode);
    return { ...newEpisode };
  }

  async update(Id, updatedData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.episodes.findIndex(episode => episode.Id === Id);
    if (index === -1) {
      throw new Error("Episode not found");
    }
    
    this.episodes[index] = {
      ...this.episodes[index],
      ...updatedData,
      Id: Id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };
    
    return { ...this.episodes[index] };
  }

  async delete(Id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = this.episodes.findIndex(episode => episode.Id === Id);
    if (index === -1) {
      throw new Error("Episode not found");
    }
    
    const deleted = this.episodes.splice(index, 1)[0];
    return { ...deleted };
  }
}

const episodeService = new EpisodeService();
export default episodeService;