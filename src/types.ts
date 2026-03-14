export interface ImageParams {
  src: string;
  name: string;
  desc: string;
}

export interface VideoParams {
  videoId: string;
  title: string;
}

export interface Member {
  src: string;
  name: string;
  desc: string;
  dept: number;
  role?: string;
  head?: string;
  priority?: number;
}

export interface Season {
  year: number;
  seasonName: string;
  src: string;
  robot: {
    name: string;
    desc: string;
    src?: string;
    github?: string;
  };
}
