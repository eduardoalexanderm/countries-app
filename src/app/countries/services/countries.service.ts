import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1';
    // Para mantener la data en caché
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
        return this.getCountiesRequest(url).pipe(
            tap(countries => this.cacheStore.byCapital = { term, countries })
        )
            ;
    }

    searchCountry(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/name/${term}`;
        return this.getCountiesRequest(url).pipe(
            tap(countries => this.cacheStore.byCountry = { term, countries })
        );
    }

    searchRegion(region: Region): Observable<Country[]> {
        const url = `${this.apiUrl}/region/${region}`;
        return this.getCountiesRequest(url).pipe(
            tap(countries => this.cacheStore.byRegion = { region, countries }
            ));
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