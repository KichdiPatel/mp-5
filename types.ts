export type ShortenedUrlProps = {
  alias: string;
  url: string;
};

export type CreateShortenedUrlResponse = {
  success: boolean;
  data?: ShortenedUrlProps;
  error?: string;
};
