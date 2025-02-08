export interface Slider {
  id: number;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetSlider {
  sliders: Slider[];
}
