import { Component, inject, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { OrdersService } from '../../core/services/controllers/orders/orders.service';
import { Order } from '../../core/interfaces/controllers/orders/orders';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-view',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './orders-view.component.html',
  styleUrl: './orders-view.component.scss'
})
export class OrdersViewComponent implements OnInit {
  private dialogService: DialogService = inject(DialogService)
  private ordersService: OrdersService = inject(OrdersService)

  protected instance: DynamicDialogComponent | undefined;
  protected customerid!: number;
  protected orders!: Order[];

  constructor(public ref: DynamicDialogRef) {
    this.instance = this.dialogService.getInstance(this.ref);
  }

  ngOnInit(): void {
    this.getOrders()
  }

  protected getOrders() {
    if (this.instance && this.instance.data) {
      this.customerid = this.instance.data['customerid'];
      this.ordersService.getOrdersByClient(this.customerid).subscribe({
        next: (v => {
          this.orders = v
        })
      })
    }
  }

  protected closeModal() {
    this.ref.close()
  }
}
