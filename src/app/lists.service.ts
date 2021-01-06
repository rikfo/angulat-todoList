import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { List } from './Models/list.model';

@Injectable({providedIn: 'root'})
export class ListsService{

    listsChanged = new BehaviorSubject([]);
    startEditing = new BehaviorSubject<List>(new List("",false,[]));

    private ListsArr: List[] = [];

    onAddList(list: List){
        this.ListsArr.push(list);
        this.listsChanged.next(this.ListsArr.slice());
    }

    onEditList(index: number,desc: string){
        this.ListsArr[index].description = desc;
    }

    getList(index: number){
        return this.ListsArr.slice()[index];
    }

    getLists(){
        return this.ListsArr.slice();
    }

    onDeleteList(index: number){
        this.ListsArr.splice(index,1);
    }
}