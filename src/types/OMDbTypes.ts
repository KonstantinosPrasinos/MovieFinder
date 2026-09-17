export interface MovieItem {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface OMDbResponse {
    Response: 'True' | 'False';
    Search?: MovieItem[];
    totalResults?: string;
    Error?: string;
}