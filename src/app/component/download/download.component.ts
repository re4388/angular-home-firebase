import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { FileSaverService } from 'ngx-filesaver';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  profileUrl: Observable<string | null>;
  text: BlobPart;
  defaultPathToDownload = 'test0/1597455313935';
  formGroup: FormGroup;
  post: any = '';

  downloadDiskForm: FormGroup;
  post2: any = ``;

  titleAlert: string = 'This field is required';

  constructor(
    private storage: AngularFireStorage,
    private _httpClient: HttpClient,
    private _FileSaverService: FileSaverService,
    private formBuilder: FormBuilder) { }

  clearImageContent(): void {
    this.profileUrl = null;
  }

  downloadToDisplay(): void {
    const ref = this.storage.ref('test0/1597455313935');
    this.profileUrl = ref.getDownloadURL();
    console.log(this.profileUrl);

  }

  downloadToDisk(type: string, fromRemote: boolean) {
    const ref = this.storage.ref(this.defaultPathToDownload);
    let url: any;

    ref.getDownloadURL().subscribe(res => {
      url = res;
      const fileName = `save.${type}`;
      // console.log(url);

      if (fromRemote) {
        this._httpClient.get(`${url}`, {
          observe: 'response',
          responseType: 'blob',
        }).subscribe(response => {
          this._FileSaverService.save(response.body, fileName);
        });
        return;
      }

      const fileType = this._FileSaverService.genType(fileName);
      const txtBlob = new Blob([this.text], { type: fileType });
      this._FileSaverService.save(txtBlob, fileName);
    });

  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [this.defaultPathToDownload, Validators.required],
    });
  }

  createForm2() {
    this.downloadDiskForm = this.formBuilder.group({
      name2: [this.defaultPathToDownload, Validators.required],
    });
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  get name2() {
    return this.downloadDiskForm.get('name2') as FormControl;
  }

  onSubmit(post) {
    this.post = post;
    // console.log(this.post.name);
    const imgPath = this.post.name;

    // firestore part
    const ref = this.storage.ref(imgPath);
    this.profileUrl = ref.getDownloadURL();
  }

  onSubmit2(post) {
    this.post2 = post;
    // console.log(this.post2.name);
    const imgPath = this.post2.name2;
    const ref = this.storage.ref(imgPath);
    let url: any;

    ref.getDownloadURL().subscribe(res => {
      url = res;
      const type = 'jpg';
      const fromRemote = true;
      const fileName = `save.${type}`;
      if (fromRemote) {
        this._httpClient.get(`${url}`, {
          observe: 'response',
          responseType: 'blob',
        }).subscribe(response => {
          this._FileSaverService.save(response.body, fileName);
        });
        return;
      }

      const fileType = this._FileSaverService.genType(fileName);
      const txtBlob = new Blob([this.text], { type: fileType });
      this._FileSaverService.save(txtBlob, fileName);
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.createForm2();
  }

}
