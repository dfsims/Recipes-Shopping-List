import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { root } from "rxjs/internal-compatibility";
import { DatatStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";

@Injectable({
    providedIn : 'root',
})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private dataStorageService: DatatStorageService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.dataStorageService.fetchRecipes();
    }
}