class SegmentService {
  constructor() {
    // Template segments for different tones
    this.segmentTemplates = {
      news: [
        { title: "Breaking News Update", duration: 8, type: "content" },
        { title: "In-Depth Analysis", duration: 12, type: "content" },
        { title: "Expert Interview", duration: 15, type: "content" },
        { title: "Market Watch", duration: 8, type: "content" },
        { title: "Headlines Roundup", duration: 10, type: "content" },
        { title: "Weather & Traffic", duration: 5, type: "content" },
      ],
      comedy: [
        { title: "Comedy Opening", duration: 6, type: "content" },
        { title: "Funny Stories", duration: 12, type: "content" },
        { title: "Listener Jokes", duration: 8, type: "content" },
        { title: "Comedy Sketch", duration: 15, type: "content" },
        { title: "Rapid Fire Jokes", duration: 10, type: "content" },
        { title: "Comedy News", duration: 8, type: "content" },
      ],
      lifestyle: [
        { title: "Wellness Check-in", duration: 8, type: "content" },
        { title: "Lifestyle Tips", duration: 12, type: "content" },
        { title: "Guest Chat", duration: 15, type: "content" },
        { title: "Viewer Questions", duration: 10, type: "content" },
        { title: "Product Reviews", duration: 8, type: "content" },
        { title: "Life Hacks", duration: 6, type: "content" },
      ]
    };

    // Talking points generators based on theme keywords
    this.talkingPointsGenerators = {
      technology: [
        "Latest tech innovations and breakthroughs",
        "Impact on daily life and user experience",
        "Future implications and predictions",
        "Industry expert opinions and analysis",
        "Consumer adoption rates and trends"
      ],
      health: [
        "Scientific research and evidence",
        "Practical tips for implementation",
        "Common myths and misconceptions",
        "Expert medical opinions",
        "Real-world success stories"
      ],
      entertainment: [
        "Celebrity news and updates",
        "Box office and ratings analysis",
        "Behind-the-scenes insights",
        "Fan reactions and social media buzz",
        "Industry trends and predictions"
      ],
      business: [
        "Market analysis and trends",
        "Economic impact and implications",
        "Success strategies and best practices",
        "Industry leader insights",
        "Future outlook and predictions"
      ],
      lifestyle: [
        "Practical everyday applications",
        "Personal development insights",
        "Community and social aspects",
        "Cost-effective solutions",
        "Sustainable practices"
      ]
    };
  }

  async generateSegments(themeData) {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI processing

    const { theme, tone, audience } = themeData;
    const templates = this.segmentTemplates[tone] || this.segmentTemplates.lifestyle;
    
    // Select 6-8 segments randomly from templates
    const numSegments = Math.floor(Math.random() * 3) + 6; // 6-8 segments
    const selectedTemplates = this.shuffleArray([...templates]).slice(0, numSegments);
    
    // Generate segments with talking points
    const segments = selectedTemplates.map((template, index) => {
      const talkingPoints = this.generateTalkingPoints(theme, tone, template.title);
      
      return {
        Id: index + 1,
        title: this.customizeSegmentTitle(template.title, theme, tone),
        duration: template.duration,
        talkingPoints: talkingPoints,
        order: index + 1,
        type: template.type
      };
    });

    // Adjust total duration to be close to 60 minutes
    this.adjustSegmentDurations(segments);

    return segments;
  }

  customizeSegmentTitle(baseTitle, theme, tone) {
    const themeKeywords = this.extractKeywords(theme);
    const customizations = {
      news: {
        "Breaking News Update": `${themeKeywords[0]} News Update`,
        "In-Depth Analysis": `Deep Dive: ${themeKeywords[0]}`,
        "Expert Interview": `Expert Insights on ${themeKeywords[0]}`,
        "Headlines Roundup": `Today's ${themeKeywords[0]} Headlines`
      },
      comedy: {
        "Comedy Opening": `Funny Take on ${themeKeywords[0]}`,
        "Funny Stories": `Hilarious ${themeKeywords[0]} Stories`,
        "Comedy Sketch": `${themeKeywords[0]} Comedy Corner`,
        "Comedy News": `${themeKeywords[0]} Laughs`
      },
      lifestyle: {
        "Wellness Check-in": `${themeKeywords[0]} Wellness Tips`,
        "Lifestyle Tips": `Living Better with ${themeKeywords[0]}`,
        "Guest Chat": `${themeKeywords[0]} Expert Chat`,
        "Life Hacks": `${themeKeywords[0]} Life Hacks`
      }
    };

    const toneCustomizations = customizations[tone] || {};
    return toneCustomizations[baseTitle] || baseTitle;
  }

  generateTalkingPoints(theme, tone, segmentTitle) {
    const themeKeywords = this.extractKeywords(theme);
    const category = this.categorizeTheme(theme);
    const basePoints = this.talkingPointsGenerators[category] || this.talkingPointsGenerators.lifestyle;
    
    // Customize talking points based on theme and tone
    const customizedPoints = basePoints.slice(0, 4).map(point => {
      return point.replace(/\b(technology|health|entertainment|business|lifestyle)\b/gi, themeKeywords[0] || theme.split(" ")[0]);
    });

    // Add tone-specific talking points
    const toneSpecificPoints = this.getToneSpecificPoints(tone, themeKeywords[0]);
    
    return [...customizedPoints, ...toneSpecificPoints].slice(0, 5);
  }

  getToneSpecificPoints(tone, keyword) {
    const tonePoints = {
      news: [
        `Latest developments and breaking updates on ${keyword}`,
        `Economic and social implications of ${keyword} trends`
      ],
      comedy: [
        `Funny anecdotes and humorous takes on ${keyword}`,
        `Listener jokes and comedic stories about ${keyword}`
      ],
      lifestyle: [
        `Practical everyday tips for ${keyword} enthusiasts`,
        `Personal experiences and lifestyle integration`
      ]
    };

    return tonePoints[tone] || tonePoints.lifestyle;
  }

  extractKeywords(theme) {
    const commonWords = ["the", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by", "is", "are", "was", "were", "be", "been", "have", "has", "had", "do", "does", "did", "will", "would", "should", "could", "can", "may", "might", "must"];
    const words = theme.toLowerCase().split(/\W+/).filter(word => 
      word.length > 3 && !commonWords.includes(word)
    );
    
    return words.slice(0, 3).map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    );
  }

  categorizeTheme(theme) {
    const themeWords = theme.toLowerCase();
    
    if (themeWords.includes("tech") || themeWords.includes("ai") || themeWords.includes("digital") || themeWords.includes("innovation")) {
      return "technology";
    } else if (themeWords.includes("health") || themeWords.includes("wellness") || themeWords.includes("fitness") || themeWords.includes("medical")) {
      return "health";
    } else if (themeWords.includes("movie") || themeWords.includes("music") || themeWords.includes("celebrity") || themeWords.includes("entertainment")) {
      return "entertainment";
    } else if (themeWords.includes("business") || themeWords.includes("finance") || themeWords.includes("market") || themeWords.includes("economy")) {
      return "business";
    } else {
      return "lifestyle";
    }
  }

  adjustSegmentDurations(segments) {
    const currentTotal = segments.reduce((sum, segment) => sum + segment.duration, 0);
    const targetTotal = 60;
    
    if (Math.abs(currentTotal - targetTotal) <= 3) {
      return; // Close enough
    }
    
    const difference = targetTotal - currentTotal;
    const adjustment = Math.round(difference / segments.length);
    
    segments.forEach((segment, index) => {
      if (index < segments.length - 1) {
        segment.duration = Math.max(5, segment.duration + adjustment);
      } else {
        // Last segment gets any remaining adjustment
        const newTotal = segments.slice(0, -1).reduce((sum, s) => sum + s.duration, 0);
        segment.duration = Math.max(5, targetTotal - newTotal);
      }
    });
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

const segmentService = new SegmentService();
export default segmentService;