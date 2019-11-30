import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {
  editTableForm: FormGroup
  id : string 
  editMovieDetais:any = []

  constructor(private tableService:TableService,private route: ActivatedRoute, private fb: FormBuilder,private toast: ToastrService,private router: Router) { 
    this.id = route.snapshot.params.id;
    this.editTableForm = this.fb.group({
      table_type : ['',[Validators.required]],
      table_count : ['',[Validators.required]],
      compartment: ['', [Validators.required]]
    })
  } 

  ngOnInit() {
    this.tableService.getTableDataById(this.id).subscribe((res) => {
      if (res['status']) {
        this.editTableForm = this.fb.group({
          table_type : [res['data'].table_type,[Validators.required]],
          table_count : [res['data'].count,[Validators.required]],
          compartment: [res['data'].compartment, [Validators.required]]
        })
      }
    })
  }

  updateTable() {
    this.tableService.updateTableById(this.id, this.editTableForm.value).subscribe((res) => {
      if (res['status']) {
        this.toast.success(res['message'], 'Success', {
          timeOut: 3000
        });
        this.router.navigate(['/add-table'])
      } else {
        this.toast.error(res['message'], 'Oops', {
          timeOut: 3000
        });
      }
    })
  }

}
