interface Borrowable {
    borrow(memberName: string): string;
    returnItem(): string;
    isAvailable(): boolean;
}   

abstract class LibraryItem implements Borrowable {
    private title: string; 
    private itemId: number;
    private available: boolean = true;

    constructor(title: string, itemId: number) {
        this.title = title;
        this.itemId = itemId;
    }
    
    public get Title(): string {
        return this.title;
    }

    public set Available(available: boolean) {
        this.available = available;
    }

    public isAvailable(): boolean {
        return this.available;
    }

    public borrow(memberName: string): string {
        if (this.available) {
            this.available = false;
            return `${memberName} borrowed "${this.title}".`;
        } else {
            return `"${this.title}" is currently not available.`;
        }
    }

    public returnItem(): string {
        this.available = true;
        return `"${this.title}" has been returned.`;
    }
}



