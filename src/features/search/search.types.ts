export interface SearchResult {
  type: string;
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  image_url?: string;
}

export interface SearchData {
  query: string;
  total: number;
  results: SearchResult[];
}

export interface SearchResponse {
  success: boolean;
  message: string;
  data: SearchData;
}
