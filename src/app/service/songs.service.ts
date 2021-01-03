import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Song } from '../shared/model/song.model';
import { ApiResponse } from '../shared/model/response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor(private http: HttpClient) { }

  getSongById(id: string): Observable<ApiResponse<Song>> {
    return this.http.get<ApiResponse<Song>>(`${ environment.API_BASE_URL }/api/v1/songs/get/${ id }`);
  }
}
