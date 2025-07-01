export interface MedicalSupply {
    id?: number;
    medicineName: string;
    unitPrice: string;
    quantity: number;
    location: string;
    expiryDate?: string;
    supplier: string;
    status: string;
    createdAt: Date;
    createdBy: string;
    receivedDate: string;
    recordType: string;
    totalQuantity: number;
    description: string;
  }
  