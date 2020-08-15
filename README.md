# AngularHomeFirebase



## Personal Note 20200815
Learn how to use Firebase Storage to list all my images,
upload images and download images

Below are some notes:

1. [Angular Image Upload Made Easy - YouTube](https://www.youtube.com/watch?v=YkvqLNcJz3Y)

2. [Firebase Cloud Functions - Resizing Images after Upload - YouTube](https://www.youtube.com/watch?v=YGsmWKMMiYs&list=PL55RiY5tL51r5jyQoPZhwLueLpPeAV6P9&index=2)

3. See this to setup AngularFile [angular/angularfire: The official Angular library for Firebase.](https://github.com/angular/angularfire)  & https://stackblitz.com/edit/angular-fire-start

4. Or just use `AngualrFireStorage` => [angularfire/storage.md at master · angular/angularfire](https://github.com/angular/angularfire/blob/master/docs/storage/storage.md) <= see this step by step

5. You need to register in module level and then inject in component level

6. remember to check security rule, it's default to false

7. For download, I also use below ways:

   1. [ngx-filesaver/README.md at master · cipchk/ngx-filesaver](https://github.com/cipchk/ngx-filesaver/blob/master/README.md)
   2. [ngx-filesaver-khulzv - StackBlitz](https://stackblitz.com/edit/ngx-filesaver-khulzv?file=src%2Fapp%2Fapp.module.ts)

8. I need to add  `"enableIvy": false,` to `tsconfig.json` due to incompatible for `ngx-filesaver`

9. It's bad to set a lot of stuff to mess up the protocol..finally, I simple have below two setting and it works!

10. ```
    // note:
    // this is cors.json, need to run gsutil cors set cors.json gs://practice-7953d.appspot.com
    // gs://practice-7953d.appspot.com is my bucket name
    // you need to install gsutil, see here: https://firebase.google.com/docs/storage/web/download-files

    [{
      "origin": ["*"],
      "method": ["GET"],
      "maxAgeSeconds": 3600
    }]

    ```

11. ```tsx
    // skip many code
    // see 202000812_angular-home-firebase project
    // tldr: no need to set header here, all is take care by above gsutil command

          if (fromRemote) {
            this._httpClient.get(`${url}`, {
              observe: 'response',
              responseType: 'blob',
            })
              .subscribe(res => {
              this._FileSaverService.save(res.body, fileName);
            });
            retrn;
          }

    ```








-----
Below are original Note:
-----

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
