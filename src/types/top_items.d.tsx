
export interface AlbumImages{
    url: string;
    height: number;
    width: number;
    genres: string[];
}

export interface ArtistImages{
    url: string;
    height: string;
    width: string;
}

export interface Artist{
    datails_url: string;
    name: string;
    spotify_uri: string;
    images: ArtistImages[];
    popularity: number;
    
}

export interface ArtistObject{
    genres: string;
    
}
export interface Album{
    album_type: string;
    total_tracks: number;
    details_url: string;
    images: AlbumImages[];
    name: string;
    release_date: string;
    release_date_precision: string;
    spotify_uri: string;
    genres: string[];
    popularity: number;
    artists: Artist[];
}

export interface Tracks{
    album: Album;
    artists: 
}