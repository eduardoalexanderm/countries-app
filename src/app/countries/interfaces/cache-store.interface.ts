import { Country } from './country';

export interface CacheStore {
    byCapital: TermCountries;
    byCountry: TermCountries;
    byRegion: RegionCountries;
}

export interface TermCountries {
    term: string;
    countries: Country[];
}


export interface RegionCountries {
    region?: string;
    countries: Country[];
}