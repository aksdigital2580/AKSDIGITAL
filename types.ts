
export interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  audioUrl: string;
  downloadUrl: string;
  category: 'Dance' | 'Romantic' | 'Sad';
  uploadDate: Date;
  downloads: number;
  views: number;
}

export interface Admin {
  email: string;
  password: string;
  profileEmail?: string;
}
