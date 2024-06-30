import { Observable } from "rxjs";

declare module 'shell/EventService' {
  export class EventService {
    public getInputSearchEvent$(): Observable<string>;
    searchInputChange$: Observable<string>
  }
}