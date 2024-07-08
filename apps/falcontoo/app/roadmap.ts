export const roadmap = {
  soon: ["Public Reading Profile", "Article Recommendations"],
  later: ["Auto-track reading progress", "Highlights", "Chat with the article"],
  backlog: [
    "Article to Podcast",
    "Article Reflections Practice",
    "Import chrome bookmarks",
  ],
  issues: ["Miscalculation of reading time", "Saving the article is slow"],
};

export const updateLog = [
  {
    date: "8th July, 2024",
    changes: [
      {
        title: "Faster Article Loading",
        description: "Saved articles now load 2x faster than before.",
      },
      {
        title: "Fixed Logout Issues",
        description:
          "Users got an error when trying to logout. This has been fixed.",
      },
    ],
  },
  {
    date: "6th July, 2024",
    changes: [
      {
        title: "Custom Reader Fonts & Themes",
        description:
          "You can now choose from a variety of fonts, themes and typography options by clicking the settings icon on the top right of the reader.",
      },
    ],
  },
] as const;
