import { ProductsService } from './../../core/services/controllers/products/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { EmployeesService } from '../../core/services/controllers/employees/employees.service';
import { ShippersService } from '../../core/services/controllers/shippers/shippers.service';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../core/interfaces/controllers/employees/employees';
import { Product } from '../../core/interfaces/controllers/products/products';
import { Shippers } from '../../core/interfaces/controllers/shippers/shippers';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateOrder } from '../../core/interfaces/controllers/orders/orders';
import { OrdersService } from '../../core/services/controllers/orders/orders.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-order-form',
  standalone: true,
  imports: [DropdownModule, ReactiveFormsModule, InputTextModule, CalendarModule, InputNumberModule, DividerModule],
  templateUrl: './new-order-form.component.html',
  styleUrl: './new-order-form.component.scss'
})
export class NewOrderFormComponent implements OnInit {
  private employeeService: EmployeesService = inject(EmployeesService)
  private shippersService: ShippersService = inject(ShippersService)
  private productsService: ProductsService = inject(ProductsService)
  private ordersService: OrdersService = inject(OrdersService)
  private dialogService: DialogService = inject(DialogService)
  private messageService: MessageService = inject(MessageService)

  protected createNewOrder: FormGroup<CreateOrder> = new FormGroup<CreateOrder>({
    custid: new FormControl<number | null>(null),
    empid: new FormControl<number | null>(null, [Validators.required]),
    orderdate: new FormControl<Date | null>(null, [Validators.required]),
    requireddate: new FormControl<Date | null>(null, [Validators.required]),
    shippeddate: new FormControl<Date | null>(null, [Validators.required]),
    shipperid: new FormControl<number | null>(null, [Validators.required]),
    freight: new FormControl<number | null>(null, [Validators.required]),
    shipname: new FormControl<string | null>(null, [Validators.required]),
    shipaddress: new FormControl<string | null>(null, [Validators.required]),
    shipcity: new FormControl<string | null>(null, [Validators.required]),
    shipcountry: new FormControl<string | null>(null, [Validators.required]),

    productid: new FormControl<number | null>(null, [Validators.required]),
    unitprice: new FormControl<number | null>(null, [Validators.required]),
    quantity: new FormControl<number | null>(null, [Validators.required]),
    discount: new FormControl<number | null>(null, [Validators.required]),
  })

  protected employees!: Employee[];
  protected shippers!: Shippers[];
  protected products!: Product[];
  protected customerid!: number;
  protected customername!: string;

  protected instance!: DynamicDialogComponent;

  constructor(public ref: DynamicDialogRef) {
    this.instance = this.dialogService.getInstance(this.ref);
  }

  ngOnInit(): void {
    this.customerid = this.instance.data['customerid'];
    this.customername = this.instance.data['customername'];
    this.getEmployees()
    this.getProducts()
    this.getShippers()
  }

  protected getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (v => {
        this.employees = v
      }),
      error: (e => {
        console.error(e);
      })
    })
  }

  protected getShippers() {
    this.shippersService.getShippers().subscribe({
      next: (v => {
        this.shippers = v
      }),
      error: (e => {
        console.error(e);
      })
    })
  }

  protected getProducts() {
    this.productsService.getProducts().subscribe({
      next: (v => {
        this.products = v
      }),
      error: (e => {
        console.error(e);
      })
    })
  }

  protected closeModal(orderid?: number) {
    this.createNewOrder.reset()
    this.ref.close({orderid: orderid, customername: this.customername})
  }

  protected saveOrder() {
    this.createNewOrder.controls.custid.setValue(this.customerid)
    this.ordersService.postNewOrder(this.createNewOrder).subscribe({
      next: (v => {
        this.closeModal(v)
      }),
      error: (e => {
        console.error(e);
      })
    })
  }
}
