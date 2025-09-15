export async function createDelay(delay: number) {
  await new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export const getStates = [
  {
    title: "Maharashtra",
    id: 1,
  },
  {
    title: "Gujarat",
    id: 2,
  },
  {
    title: "Rajasthan",
    id: 3,
  },
  {
    title: "Punjab",
    id: 4,
  },
  {
    title: "Jammu and Kashmir",
    id: 5,
  },
];

export const tabsData = [
  {
    id: 1,
    title: "All",
    icon: "",
    count: 0,
    show: true,
  },
  {
    id: 2,
    title: "Files",
    icon: "Paperclip",
    count: 0,
    show: true,
  },
  {
    id: 3,
    title: "People",
    icon: "User",
    count: 0,
    show: true,
  },
  {
    id: 4,
    title: "Chats",
    icon: "Chat",
    count: 0,
    show: false,
  },
  {
    id: 5,
    title: "Lists",
    icon: "List",
    count: 0,
    show: false,
  },
];

export const contents = [
  {
    id: 1,
    type: "people",
    icon: "",
    isActive: true,
    lastActiveDate: "now",
    title: "Caroline Dribsson",
    folder: "",
  },

  {
    id: 2,
    type: "file",
    icon: "presentation",
    isActive: false,
    lastActiveDate: "Edited now",
    title: "website_design.jpg",
    folder: "Design",
  },

  {
    id: 3,
    type: "people",
    icon: "",
    isActive: false,
    lastActiveDate: "unactivated",
    title: "Adam Cadribean",
    folder: "",
  },
  {
    id: 4,
    type: "people",
    icon: "",
    isActive: true,
    lastActiveDate: "1w ago",
    title: "Margareth Cendribgssen",
    folder: "",
  },
  {
    id: 5,
    type: "file",
    icon: "video",
    isActive: false,
    lastActiveDate: "Added 12m ago",
    title: "files_krande_michelle.avi",
    folder: "Videos",
  },
  {
    id: 6,
    type: "people",
    icon: "",
    isActive: true,
    lastActiveDate: "now",
    title: "Randall Johnsson",
    folder: "",
  },
  {
    id: 7,
    type: "people",
    icon: "",
    isActive: true,
    lastActiveDate: "2d ago",
    title: "Kristinge Karand",
    folder: "",
  },
  {
    id: 8,
    type: "file",
    icon: "presentation",
    isActive: false,
    lastActiveDate: "Edited 1w ago",
    title: "final_dribbble_presentation.jpg",
    folder: "Presentations",
  },
  {
    id: 9,
    type: "file",
    icon: "video",
    isActive: false,
    lastActiveDate: "Edited 1w ago",
    title: "dribble_animation_.avi",
    folder: "Videos",
  },
];
