import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MedicalSupply } from './medical-supply';


@Injectable({ providedIn: 'root' })
export class InventoryService {
  private supplies: MedicalSupply[] = [
    { id: 1, name: 'Face Mask', quantity: 100, expiryDate:'2025-06-11', supplier: 'ABC Medical',status:'in_stock' },
    { id: 2, name: 'Paracetamol', quantity: 50, expiryDate: '2025-06-11', supplier: 'PharmaCo',status:'in_stock' },
    { id: 3, name: 'Bandages', quantity: 75, expiryDate: '2025-06-11', supplier: 'MedLine',status:'in_stock' },
    { id: 4, name: 'Stethoscope', quantity: 20, expiryDate: '2025-06-11', supplier: 'HealthCorp',status:'in_stock' },
  ];

  private subject = new BehaviorSubject<MedicalSupply[]>(this.supplies);
  supplies$ = this.subject.asObservable();

  addSupply(supply: MedicalSupply) {
    supply.id = Date.now();
    this.supplies.push(supply);
    this.subject.next([...this.supplies]);
  }
}
