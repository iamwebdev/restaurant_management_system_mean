import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuService } from '../menu.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuTypes: any = []
  menuForm:FormGroup

  constructor(private menuService:MenuService,private formBuilder:FormBuilder,private toastr:ToastrService) {
    this.menuForm = this.formBuilder.group({
      menu_type : ['',[Validators.required]],
      item: ['',[Validators.required]],
      price: ['',[Validators.required]],
      category : ['',[Validators.required]]
    });
   }

  ngOnInit() {
    this.menuService.getAllItem(this.menuForm.value).subscribe((res) => {
        if(res['status'])
          this.menuTypes = res['data']
      })
  }

  addItem() {
    this.menuService.saveItem(this.menuForm.value).subscribe((res) => {
      if(res['status']) {
        this.ngOnInit()
        this.menuForm.reset()
        this.toastr.success(res['message'], 'Success', {
          timeOut: 3000
        });
      } else {
        this.toastr.error(res['message'], 'Oops', {
          timeOut: 3000
        });
      }
    })
  }

  deleteItem(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.menuService.deleteItemById(id).subscribe((res) => {
          if(res['status']) {
            this.ngOnInit()
            Swal.fire(
              'Deleted!',
              'Item record has been deleted.',
              'success'
            )
          } else {
            this.toastr.error(res['message'], 'Oops', {
              timeOut: 3000
            });
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your item record is safe :)',
          'error'
        )
      }
  })
  }
}
