
import data from './placeholder-images.json' with { type: 'json' };

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  audioUrl?: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
