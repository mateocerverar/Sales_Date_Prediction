import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CustomersService } from '../../core/services/controllers/customers/customers.service';
import { SalesDatePrediction } from '../../core/interfaces/controllers/customers/customers';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrdersViewComponent } from '../orders-view/orders-view.component';
import { NewOrderFormComponent } from '../new-order-form/new-order-form.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sales-date-prediction-view',
  standalone: true,
  imports: [CommonModule, TableModule, IconFieldModule, InputIconModule, InputTextModule, ButtonModule, ToastModule],
  templateUrl: './sales-date-prediction-view.component.html',
  styleUrl: './sales-date-prediction-view.component.scss'
})
export class SalesDatePredictionViewComponent implements OnInit {

  private customerService: CustomersService = inject(CustomersService)
  private dialogService: DialogService = inject(DialogService)
  private messageService: MessageService = inject(MessageService)

  protected customers!: SalesDatePrediction[];
  protected ref!: DynamicDialogRef;

  ngOnInit(): void {
    this.getSalesDatePrediction()
  }

  private getSalesDatePrediction() {
    this.customerService.getSalesDatePrediction().subscribe({
      next: (v => {
        this.customers = v
      }),
      error: (e => {
        console.error(e);
      })
    })
  }

  protected showOrdersView(customer: SalesDatePrediction) {
    this.ref = this.dialogService.open(OrdersViewComponent, {
      header: `${customer.customername} - Orders`,
      data: {
        customerid: customer.custid
      },
      width: '100%',
      modal: true,
      height: '100vh',
      closable: false
    });
  }

  protected showNewOrderView(customer: SalesDatePrediction) {
    this.ref = this.dialogService.open(NewOrderFormComponent, {
      header: `${customer.customername} - New Order`,
      data: {
        customerid: customer.custid,
        customername: customer.customername
      },
      width: '60%',
      modal: true,
      height: '100vh',
      closable: false
    });

    this.ref.onClose.subscribe((order: { orderid: number, customername: string }) => {
      console.log('order: ', order);
      if (order.orderid) {
        this.messageService.add({ severity: 'success', summary: 'Order Created', detail: `The order with ID ${order.orderid} was successfully created for the client ${order.customername}`, life: 5000 });
      }
    });
  }
}
