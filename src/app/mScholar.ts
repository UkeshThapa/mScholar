/**
***************************************

File: mScholar.ts
By: Mr. Y

***************************************    

The whole feature of the mScholar are collectively used in this file

features: 
1. In this we started with the text printing on the console log
2. 

***************************************    

 */



  import { mouseTracker } from "../features/mouse/mouseTracker";
  import { textSelection } from "@/features/mouse/textSelection";

  export class mScholar {

    private readonly textSelection = new textSelection(
        (text) => this.handleSelection(text)
      );


      // this function will actually start
      public start(): void {
        this.textSelection.start();
        console.log("[mScholar] Ready for text selection");
      }

      
      private handleSelection(text: string): void {
        alert(`[mScholar] Selected text:, ${text}`);
      }


      //Stop tracking mouse events when the extension is inactive. 
      public stop(): void {
        this.textSelection.stop();
      }


  }
