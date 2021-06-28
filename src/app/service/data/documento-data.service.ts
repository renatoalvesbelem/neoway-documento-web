import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Documento } from 'src/app/model/Documento';
import { OrderBy } from 'src/app/model/OrderBy';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentoDataService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getTodosDocumentos(nuDocumento: string = '', cdTpDocumento: number[] = [], page: number, orderBy?: OrderBy): Observable<any> {

    let parameters = new HttpParams();
    if (orderBy) {
      parameters = parameters.append('column', orderBy.coluna);
      parameters = parameters.append('order', orderBy.orderAsc ? 'ASC' : 'DESC');
    }
    parameters = parameters.append('page', String(page));
    cdTpDocumento.forEach(colunaTipo => parameters = parameters.append('cdTpDocumento', String(colunaTipo)));
    parameters = parameters.append('nuDocumento', nuDocumento);
    return this.http.get<any>(`${this.baseUrl}/api/documento`,
      {
        params: parameters
      }
    );
  }

  getDocumento(idDocumento: number): Observable<Documento>  {
    return this.http.get<Documento>(`${this.baseUrl}/api/documento/${idDocumento}`);
  }

  deletarDocumento(cdDocumento: number): Observable<any>  {
    return this.http.delete<any>(`${this.baseUrl}/api/documento/${cdDocumento}`);
  }

  cadastrarDocumento(documento: Documento): Observable<any>  {
    return this.http.post<any>(`${this.baseUrl}/api/documento`, documento);
  }

  atualizarDocumento(documento: Documento): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/documento`, documento);
  }
}

