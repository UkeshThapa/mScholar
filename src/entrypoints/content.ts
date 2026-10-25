import { defineContentScript } from "wxt/utils/define-content-script";
import { mScholar } from "../app/mScholar";

export default defineContentScript({
  matches: ["http://*/*", "https://*/*"],

  main() {
    const app = new mScholar();
    app.start();
  },
});
