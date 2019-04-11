import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const API_URL = '/api/<%= dasherize(name) %>';

@Injectable({
    providedIn: 'root'
})
export class <%= classify(name) %>CrudResourceService {
    constructor(private http: HttpClient) {}

    findAll(): Observable<I<%= classify(name) %>[]> {
        <% if(transform) { %>
            return this.http.get<I<%= classify(name) %>Response>(API_URL).pipe(map(this.transform));
        <% } else { %>
            return this.http.get<I<%= classify(name) %>[]>(API_URL);
        <% } %>
    }

    create(<%= camelize(name) %>: I<%= classify(name) %>): Observable<number> {
        return this.http.post<number>(API_URL, <%= camelize(name) %>);
    }

    <% if(transform) { %>
        private transform(response: I<%= classify(name) %>Response): I<%= classify(name) %> {
            return {
                someProperty: response.someResponseProperty
            }
        }
    <% } %>
}

export interface I<%= classify(name) %> {
    someProperty: string;
}

<% if(transform) { %>
export interface I<%= classify(name) %>Response {
    someResponseProperty: string;
}
<% } %>
