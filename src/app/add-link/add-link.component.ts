import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { map } from 'rxjs/operators';

export interface Link {
  id: string;
  name: string;
  url: string;
}

@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.css']
})
export class AddLinkComponent implements OnInit {
  form = new FormGroup({});
  model = {} ;
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Name',
        placeholder: 'Video Name',
        required: true,
      }
    },
    {
      key: 'url',
      type: 'input',
      templateOptions: {
        label: 'Url',
        placeholder: 'Video link',
        required: true,
      }
    },
  ];

  // we will only use this here,so declare it as private
  // This is the variable ref holding our firestore collection
  // This collection contain Link type
  private youtubeSaveLinkCollection: AngularFirestoreCollection<any>;

  // we will receive observable Link type element in array
  links: Observable<Link[]>;

  constructor(private afs: AngularFirestore, private sanitizer: DomSanitizer) {
    // get the collection
    this.youtubeSaveLinkCollection = afs
      .collection<Link>('youtubeSaveLink');

    // get all value in collections
    // this.links = this.youtubeSaveLinkCollection.valueChanges();
    // console.log(this.links);

    // we need to have doc id
    this.links = this.youtubeSaveLinkCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Link;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )

  }


  addLink(link: Link): void {
    this.youtubeSaveLinkCollection.add(link);
  }

  removeLink(link: Link): void {
    console.log(link);
    console.log(link.name);
    this.afs.collection('youtubeSaveLink').doc(link.id).delete();
  }



  onSubmit() {
    if (this.form.valid) {
      console.log(this.model);
      // const data = JSON.stringify(this.model, null, 2)
      this.youtubeSaveLinkCollection.add(this.model);
    }
  }
  

  ngOnInit(): void {
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
