import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from '../menu.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  editMenuForm: FormGroup
  menuDetails:any = []
  id: String

  constructor(private Router: Router, private fb: FormBuilder, private tostr: ToastrService, private  menuService: MenuService, private route: ActivatedRoute) {
    this.id = route.snapshot.params.id
    this.menuService.getItemById(this.id).subscribe((res) => {
      if(res['status'])
      {
        this.menuDetails = res['data']
        this.editMenuForm = this.fb.group({
          menu_type: [this.menuDetails.menu_type,[Validators.required]],
          item: [this.menuDetails.item,[Validators.required]],
          price : [this.menuDetails.price,[Validators.required]],
          category: [this.menuDetails.category,[Validators.required]]
        })
      }
    })
  }

  ngOnInit() {
    this.editMenuForm = this.fb.group({
      menu_type: ['',[Validators.required]],
      item: ['',[Validators.required]],
      price : ['',[Validators.required]],
      category: ['',[Validators.required]]
    })
  }

  updateItem() {
    this.menuService.updateItemById(this.editMenuForm.value,this.id).subscribe((res) => {
      if (res['status']) {
        this.tostr.success(res['message'], 'Success', {
          timeOut: 3000
        });
        this.Router.navigate(['/add-menu'])
      } else {
        this.tostr.error(res['message'], 'Oops', {
          timeOut: 3000
        });
      }
    })
  }
}
