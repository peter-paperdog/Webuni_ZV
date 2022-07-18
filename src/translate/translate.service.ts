import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Language} from './models/language.model';
import {map} from 'rxjs/operators';
import {Translation} from './models/translation.model';
import {Observable} from 'rxjs';
import {Detection} from './models/detection.model';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getLanguages() {
    return this.http.get<Language[]>(`${this.baseUrl}/languages`);
  }

  translate(source: string, target: string, q: string): Observable<string> {
    const formData = new FormData();
    formData.append('q', q);
    formData.append('source', source);
    formData.append('target', target);
    formData.append('format', 'text');
    return this.http.post<Translation>(`${this.baseUrl}/translate`, formData)
      .pipe(
        map(translate => translate.translatedText)
      );
  }

  detect(q: string): Observable<Detection> {
    const formData = new FormData();
    formData.append('q', q);

    return this.http.post<Detection[]>(`${this.baseUrl}/detect`, formData)
      .pipe(
        map((f: Detection[]) => {
          return f[0];
        })
      );
  }
}
