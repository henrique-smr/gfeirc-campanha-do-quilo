import admin from "firebase-admin"
import yml from 'yaml'
import fs from 'fs'

import serviceAccount from "./service-account.json";

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as any),
	databaseURL: "https://gfeirc-default-rtdb.firebaseio.com"
});

const listFile = fs.readFileSync('./list.yml', 'utf-8')

admin.database().ref('/list').set(
	yml.parse(listFile)
).then(_ => console.log("list ok"))
