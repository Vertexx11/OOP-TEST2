interface Borrowable {
  borrow(memberName: string): string;
  returnItem(): string;
  isAvailable: boolean;
}

abstract class LibraryItem implements Borrowable {
  protected title: string;
  protected itemId: string;
  protected available: boolean;
  isAvailable: boolean;

  constructor(title: string, itemId: string, available: boolean) {
    this.title = title;
    this.itemId = itemId;
    this.available = available;
    this.isAvailable = available;
  }

  get titleItem(): string {
    return this.title;
  }

  set availableItem(available: boolean) {
    this.available = available;
    this.isAvailable = available;
  }

  abstract getDetail(): string;

  borrow(memberName: string): string {
    if (!this.available) {
      return `Item ${this.title} is not available.`;
    }
    this.available = false;
    return `${memberName} borrowed ${this.title}`;
  }

  returnItem(): string {
    this.available = true;
    return `${this.title} returned successfully.`;
  }
}

class Book extends LibraryItem {
  private author: string;

  constructor(title: string, itemId: string, available: boolean, author: string) {
    super(title, itemId, available);
    this.author = author;
  }

  getDetail(): string {
    return `Book: ${this.title}, Author: ${this.author}`;
  }
}

class Magazine extends LibraryItem {
  private issueDate: string;

  constructor(title: string, itemId: string, available: boolean, issueDate: string) {
    super(title, itemId, available);
    this.issueDate = issueDate;
  }

  getDetail(): string {
    return `Magazine: ${this.title}, Issue Date: ${this.issueDate}`;
  }
}

class EBook extends LibraryItem {
  private filesizeMb: number;
  private format: string;

  constructor(title: string, itemId: string, available: boolean, filesizeMb: number, format: string) {
    super(title, itemId, available);
    this.filesizeMb = filesizeMb;
    this.format = format;
  }

  getDetail(): string {
    return `EBook: ${this.title}, Size: ${this.filesizeMb}MB, Format: ${this.format}`;
  }
}

class AudioBook extends LibraryItem {
  private durationMinutes: number;
  private narrator: string;

  constructor(title: string, itemId: string, available: boolean, durationMinutes: number, narrator: string) {
    super(title, itemId, available);
    this.durationMinutes = durationMinutes;
    this.narrator = narrator;
  }

  getDetail(): string {
    return `AudioBook: ${this.title}, Duration: ${this.durationMinutes} mins, Narrator: ${this.narrator}`;
  }
}

class Technology extends LibraryItem {
  private deviceType: string;
  private brand: string;

  constructor(title: string, itemId: string, available: boolean, deviceType: string, brand: string) {
    super(title, itemId, available);
    this.deviceType = deviceType;
    this.brand = brand;
  }

  getDetail(): string {
    return `Technology: ${this.title}, Type: ${this.deviceType}, Brand: ${this.brand}`;
  }
}

class LibraryMember {
  private memberName: string;
  private memberId: string;
  private borrowedItems: LibraryItem[];

  constructor(memberName: string, memberId: string) {
    this.memberName = memberName;
    this.memberId = memberId;
    this.borrowedItems = [];
  }

  get name(): string {
    return this.memberName;
  }

  borrowItem(item: LibraryItem): string {
    const message = item.borrow(this.memberName);
    if (message.includes("borrowed")) {
      this.borrowedItems.push(item);
    }
    return message;
  }

  returnItem(itemId: string): string {
    const itemIndex = this.borrowedItems.findIndex((item) => item["itemId"] === itemId);
    if (itemIndex !== -1) {
      const item = this.borrowedItems[itemIndex];
      this.borrowedItems.splice(itemIndex, 1);
      return item.returnItem();
    }
    return `Item not found in borrowed list.`;
  }

  listBorrowedItems(): string {
    return this.borrowedItems.map((item) => item.getDetail()).join("\n");
  }
}

class Library {
  private items: LibraryItem[];
  private members: LibraryMember[];

  constructor() {
    this.items = [];
    this.members = [];
  }

  addItem(item: LibraryItem): void {
    this.items.push(item);
  }

  addMember(member: LibraryMember): void {
    this.members.push(member);
  }

  findItemById(itemId: string): LibraryItem | undefined {
    return this.items.find((item) => item["itemId"] === itemId);
  }

  findMemberById(memberId: string): LibraryMember | undefined {
    return this.members.find((member) => member["memberId"] === memberId);
  }

  borrowItem(memberId: string, itemId: string): string {
    const member = this.findMemberById(memberId);
    const item = this.findItemById(itemId);
    if (member && item) {
      return member.borrowItem(item);
    }
    return "Member or Item not found.";
  }

  returnItem(memberId: string, itemId: string): string {
    const member = this.findMemberById(memberId);
    if (member) {
      return member.returnItem(itemId);
    }
    return "Member not found.";
  }

  getLibrarySummary(): string {
    return this.items.map((item) => item.getDetail()).join("\n");
  }
}

const myLibrary = new Library();

const book1 = new Book("OOP Basics", "B001", true, "Kin Dev");
const mag1 = new Magazine("Tech Weekly", "M001", true, "2025-09-10");
const ebook1 = new EBook("Learn TypeScript", "E001", true, 5, "PDF");
const audio1 = new AudioBook("History of AI", "A001", true, 120, "John Doe");
const tech1 = new Technology("Arduino Kit", "T001", true, "Electronics", "Arduino");

myLibrary.addItem(book1);
myLibrary.addItem(mag1);
myLibrary.addItem(ebook1);
myLibrary.addItem(audio1);
myLibrary.addItem(tech1);

const member1 = new LibraryMember("Alice", "M1001");
const member2 = new LibraryMember("Bob", "M1002");

myLibrary.addMember(member1);
myLibrary.addMember(member2);
console.log(myLibrary.borrowItem("M1001", "B001")); 
console.log(myLibrary.borrowItem("M1002", "A001")); 
console.log(myLibrary.borrowItem("M1001", "B001")); 
console.log("\nAlice borrowed:");
console.log(member1.listBorrowedItems());
console.log("\nBob borrowed:");
console.log(member2.listBorrowedItems());
console.log("\n" + myLibrary.returnItem("M1001", "B001"));
console.log("\n=== Library Summary ===");
console.log(myLibrary.getLibrarySummary());

