import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';



@Component({
  selector: 'app-img-list',
  templateUrl: './img-list.component.html',
  styleUrls: ['./img-list.component.css']
})
export class ImgListComponent implements OnInit {
  imageList = [];
  constructor(private storage: AngularFireStorage) {}

  showImage() {
    const ref = this.storage.ref('test0');
    ref.listAll().subscribe(res => res.items.forEach((item: any) => {
      this.imageList.push(item.location.path_);
    }));

  }
  ngOnInit(): void {
    this.showImage();
  }

}
