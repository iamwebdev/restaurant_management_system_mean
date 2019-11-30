import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  tableTypes:any = []
  tableForm: FormGroup
  
  constructor(private tableService: TableService, private formBuilder: FormBuilder, private toastr: ToastrService) { 
    this.tableForm = this.formBuilder.group({
        table_type : ['',[Validators.required]],
        table_count : ['', [Validators.required]],
        compartment : ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.tableService.getAllTableTypes().subscribe((res) => {
      if(res['status'])
        this.tableTypes = res['data']
    })
  }

  addTable() {
    this.tableService.saveTable(this.tableForm.value).subscribe((res) => {
      if(res['status']) {
        this.ngOnInit()
        this.tableForm.reset()
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
  
  deleteTable(id) {   
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.tableService.deleteTableById(id).subscribe((res) => {
          if(res['status']) {
            this.ngOnInit()
            Swal.fire(
              'Deleted!',
              'Table record has been deleted.',
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
          'Your table record is safe :)',
          'error'
        )
      }
    })
  }
}