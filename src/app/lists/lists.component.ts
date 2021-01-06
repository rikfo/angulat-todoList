import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { ListsService } from '../lists.service';
import { List } from '../Models/list.model';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit, OnDestroy{
  
  lists: List[] = [];
  listsSub: Subscription;
  isComplete = false;

  constructor(private router: Router, private listService: ListsService) { }

  ngOnInit(): void {
    this.listsSub = this.listService.listsChanged.subscribe((listsArr: List[]) => {
      this.lists = listsArr;
    })
  }
  
  onAddList(){
    this.router.navigate(['../addList']);
  }

  onEditList(i){
    this.router.navigate(['../edit/'+i]);
  }

  onDeleteList(i){
    this.lists.splice(i,1);
    this.listService.onDeleteList(i);
  }

  ngOnDestroy(){
    this.listsSub.unsubscribe();
  }
}
