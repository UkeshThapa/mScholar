/*

***************************************

File: textSelection.ts
By: Mr. Y

***************************************    
Description:

In this file the mouse highlighted text will be print in the console.
***************************************  



*/


export class textSelection{

    // Initialize the onSelect variable
    constructor(

        private readonly onSelect: (text: string) => void
    ) {}

    //mouse to use the event handler to find is this selected and is this string than we have to trim this section.

    private readonly handleMouseUp= (): void =>{
        const selectedText = window.getSelection()?.toString().trim();

        if (!selectedText) return;

        this.onSelect(selectedText);
    }

    
    public start(): void {
    document.addEventListener("mouseup", this.handleMouseUp);
    }

    public stop(): void {
    document.removeEventListener("mouseup", this.handleMouseUp);
    }
    


}