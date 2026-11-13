export interface IPhoto {
  _id?: string;
  title: string;
  plateNumber: string;
  slug: string;
  location: {
    city: string;
    specificLocation: string;
    coordinates?: string;
  };
  dateTaken: string | Date;
  year: number;
  cloudinary: {
    publicId: string;
    secureUrl: string;
    width: number;
    height: number;
    aspectRatio: number;
  };
  exif: {
    camera?: string;
    lens?: string;
    focalLength?: string;
    shutterSpeed?: string;
    aperture?: string;
    iso?: string;
    filmStock?: string;
  };
  category: string;
  tags: string[];
  isFeaturedOnIndex: boolean;
  featuredIndexOrder?: number;
}

export interface IDispatch {
  _id?: string;
  title: string;
  dossierNumber: string;
  slug: string;
  location: string;
  publishedDate: string | Date;
  readTimeMinutes: number;
  plateCount: number;
  abstract: string;
  contentMarkdown: string;
  formatTag: string;
  leadCoverPhotoUrl?: string;
  leadCoverPhoto?: IPhoto;
  galleryPhotos?: Array<{
    imageUrl: string;
    caption?: string;
    title?: string;
  }>;
  atmosphericLog?: {
    temperature?: string;
    barometer?: string;
    cloudCover?: string;
    wind?: string;
  };
  locationalMemorandum?: string;
  isLeadDispatch: boolean;
  published: boolean;
}

// Purely user-driven collection - no mock or seed data
export const FALLBACK_PHOTOS: IPhoto[] = [];
export const FALLBACK_DISPATCHES: IDispatch[] = [];
