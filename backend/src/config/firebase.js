// import admin from "firebase-admin";
import { initializeApp, cert } from 'firebase-admin/app';

import serviceAccount from "./hamperapp-9c4c1-firebase-adminsdk-fbsvc-3590b39124.json" with { type: "json" };
const app = initializeApp({
    credential: cert(serviceAccount),
});

export default app;