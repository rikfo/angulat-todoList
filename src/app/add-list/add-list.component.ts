import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ListsService } from '../lists.service';
import { List } from '../Models/list.model';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit, OnDestroy{

  @ViewChild('f', {static: true}) creationForm: NgForm;

  listEditSub: Subscription;
  editMode = false;
  index: number;
  id: number;

  constructor(private router: Router,private route: ActivatedRoute,private listService: ListsService) { }

  ngOnInit(): void {
    this.editMode = false;
    this.listEditSub = this.route.params.subscribe((par: Params) => {
      if(par['id']){
        this.id = +par['id'];
        setTimeout(() => {
          this.creationForm.form.setValue({
            "desc": this.listService.getList(this.id).description
          })
        },0);
        this.editMode = true;
      }
    })
    console.log(this.editMode);
  }

  onSubmit(){
    if(!this.editMode){
      const list = new List(this.creationForm.value.desc,false,[]);
      this.listService.onAddList(list);
      this.router.navigate(['../']);
    } else {
      this.listService.onEditList(this.id,this.creationForm.value.desc);
      this.router.navigate(['../']);
    }
  }

  onCancel(){
    this.router.navigate(['/lists']);
  }

  ngOnDestroy(){
    this.listEditSub.unsubscribe();
  }
}
