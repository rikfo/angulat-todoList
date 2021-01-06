import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { ListsService } from './lists.service';

@Injectable({providedIn: 'root'})
export class ListEditGuard implements CanActivate {
    constructor(private listServ: ListsService, private router: Router){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.listServ.listsChanged.pipe(
            map(listArr => {
                if (listArr.length>0)
                    return true;
                return this.router.createUrlTree(['/']);
            })
        )
    }
}