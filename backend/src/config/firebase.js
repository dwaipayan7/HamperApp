import admin from "firebase-admin";
import serviceAccount from "./hamperapp-9c4c1-firebase-adminsdk-fbsvc-3590b39124.json" assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;