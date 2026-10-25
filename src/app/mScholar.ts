/**
***************************************

File: mScholar.ts
By: Mr. Y

***************************************    

The whole feature of the mScholar are collectively used in this file

features: 
1. MouseTracker

***************************************    

 */



import { mouseTracker } from "../features/mouse/mouseTracker";

export class mScholar {

  private readonly mouseTracker: mouseTracker;


// constructor to initialize the content
  constructor() {
    this.mouseTracker = new mouseTracker();

    console.log("2. MScholar constructor called");
  }

  public start(): void {
    console.log("MScholar started");

    this.mouseTracker.start();
  }
}
