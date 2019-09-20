import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnChanges {
  @Input() param: any;
  closeResult: string;
  currentRes: any;
  currentData = [];
  resultList = [];
  
  constructor(private modalService: NgbModal, private apiService: ApiService) { }

  ngOnChanges() {
    this.getResult();
  }

  getResult() {
    this.apiService.getResult(this.param).subscribe(res => {
      // console.log(res.detail)
      this.resultList = res.detail;
    })
  }

  viewDataClick(content, res) {
  this.currentData = [];
  this.currentRes = res;
  
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  deleteClick(confirmDelete, res) {
    this.currentRes = res;
    this.modalService.open(confirmDelete, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  confirmDeleteClick(res) {
    this.apiService.removeResult(res.id).subscribe(res => {
      this.modalService.dismissAll();
      this.getResult();
      console.log("remove result complete!");
    })
  }

}
