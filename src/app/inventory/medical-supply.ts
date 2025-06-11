export interface MedicalSupply {
    id?: number;
    name: string;
    quantity: number;
    expiryDate?: string;
    supplier: string;
    status?: 'in_stock' | 'low_stock' | 'out_of_stock' | 'expired';
    receivedDate: string;
  }
  