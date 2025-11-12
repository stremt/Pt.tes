import { ContactForm } from "@shared/schema";
import { randomUUID } from "crypto";

export interface ContactMessage extends ContactForm {
  id: string;
  timestamp: string;
}

export interface IStorage {
  createContactMessage(data: ContactForm): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.contactMessages = new Map();
  }

  async createContactMessage(data: ContactForm): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...data,
      id,
      timestamp: new Date().toISOString(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }
}

export const storage = new MemStorage();
