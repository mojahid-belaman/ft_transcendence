import {  Injectable } from "@nestjs/common";
import { Cat } from "./interfaces/cats.interface";
import { Observable ,of } from "rxjs";

@Injectable()

export class AppProvidersService{
    private  cats: Cat[] = [];

  create(cat: Cat) {
      this.cats = [...this.cats, cat];
  }

  findAll(): Observable<Cat[]> {
    return of(this.cats);
  }
}