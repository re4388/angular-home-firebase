const functions = require('firebase-functions');
// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();
const os = require('os');
const path = require('path');



/*
Create and Deploy Your First Cloud Functions
https://firebase.google.com/docs/functions/write-firebase-functions
Endpoint: https://us-central1-practice-7953d.cloudfunctions.net/helloWorld
*/
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});



/*
Endpoint: https://us-central1-practice-7953d.cloudfunctions.net/addMessage?text=helloQQ
Take the text parameter passed to this HTTP endpoint and insert it into
Cloud Firestore under the path /messages/:documentId/original
*/
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const textToInsert = req.query.text;
  // Push the new message into Cloud Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('messages').add({original: textToInsert});
  // Send back a message that we've succesfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});


/*
Listens for new messages added to /messages/:documentId/original and creates an
uppercase version of the message to /messages/:documentId/uppercase
*/
exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate((snap, context) => {
      // Grab the current value of what was written to Cloud Firestore.
      const changingDocOriginalField = snap.data().original;

      // Access the parameter `{documentId}` with `context.params`
      functions.logger.log('Uppercasing', context.params.documentId, changingDocOriginalField);

      const uppercase = changingDocOriginalField.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to Cloud Firestore.
      // Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
      return snap.ref.set({uppercase}, {merge: true});
    });



/* upload image
https://codepen.io/Hussein818/pen/KKdRjJY?editors=1010
https://firebase.google.com/docs/functions/gcp-storage-events
*/
// exports.onFileChange = functions.storage.object().onFinalize((object) => {

//   const fileBucket = object.bucket; // The Storage bucket that contains the file.
//   const filePath = object.name; // File path in the bucket.
//   const contentType = object.contentType; // File content type.
//   const fileName = path.basename(filePath);

//   if (!contentType.startsWith('image/')) {
//     return console.log('This is not an image.');
//   }
//   if (fileName.startsWith('rename-')) {
//     return console.log('Already a renamed.');
//   }

//   const bucket = admin.storage().bucket(fileBucket);
//   const tempFilePath = path.join(os.tmpdir(), fileName);

//   return bucket
//       .file(filePath)
//       .download({
//           destination: tempFilePath
//       })
//       .then(function () {
//           return bucket
//               .upload(tempFilePath, {
//                   destination: 'rename-' + path.basename(filePath),
//                   metadata: {
//                       contentType: contentType
//                   },
//               });
//       })
//       .catch(function (error) {
//           console.log(error);
//       });
// });

