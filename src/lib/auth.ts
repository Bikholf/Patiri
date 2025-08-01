import { google } from "@lucia-auth/oauth/providers";
import { auth } from "./lucia.js";

const googleAuth = google(auth, configs);