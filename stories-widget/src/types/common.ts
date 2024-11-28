export interface accountId {
  accountId: string;
}

export interface modalRef {
  open: () => void;
  close: () => void;
}
export interface productCta {
  photo_url: string;
  price: number;
  name: string;
  description: string;
  id: string;
  created_at: string;
  updated_at: string;
}
export interface videos {
  id: number;
  mux_playback_id: string | null;
  url: string | undefined;
}
export interface videoData {
  type: string;
  title: string;
  id: number;
  description: string;
  video: videos;

  products: productCta[];
}
export interface productData {
  type: string;
  title: string;
  id: number;
  products: productCta[];
  description: string;
  video: videos;
}

export type EventKey = "stories" | "grid" | "bubble" | "carousel";
