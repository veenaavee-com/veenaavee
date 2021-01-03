/*export interface Name {
    enUs: string;
    siLk: string;
}
*/
export interface Artist {
    name: Map<string, string>;
}

export interface Title {
    lang: string;
    value: string;
}

export interface OriginalMetadata {
    title: Title;
    artist: Artist[];
    composer: Artist[];
    lyricist: Artist[];
    key: string;
}

export interface CurrentMetadata {
    key: string;
}

export interface Meta {
    original: OriginalMetadata;
    current: CurrentMetadata;
}

export interface Song {
    meta: Meta;
    chords: Map<string, string[]>;
}
