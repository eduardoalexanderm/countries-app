import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1';
    public cacheStore: CacheStore = {
        byCapital: { term: '', countries: [] },
        byCountry: { term: '', countries: [] },
        byRegion: { region: '', countries: [] },
    }

    constructor(private http: HttpClient) { }
    private getCountiesRequest(url: string): Observable<Country[]> {
        return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
    }

    searchCapital(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/capital/${term}`;
        return this.getCountiesRequest(url);
    }

    searchCountry(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/name/${term}`;
        return this.getCountiesRequest(url);
    }

    searchRegion(region: string): Observable<Country[]> {
        const url = `${this.apiUrl}/region/${region}`;
        return this.getCountiesRequest(url);
    }

    // Para buscar por código de país
    searchCountryByCode(code: string): Observable<Country | null> {
        const url = `${this.apiUrl}/alpha/${code}`;
        return this.http.get<Country[]>(url).
            pipe(
                map(countries => countries.length > 0 ? countries[0] : null),
                catchError(() => of(null))
            );
    }

}