export interface ImageParams {
  src: string;
  name: string;
  desc: string;
}

export interface VideoParams {
  videoId: string;
  title: string;
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
