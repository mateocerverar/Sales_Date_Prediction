import { FormControl } from "@angular/forms";

export interface Order {
  orderid: number;
  requireddate: Date;
  shippeddate: Date;
  shipname: string;
  shipaddress: string;
  shipcity: string;
}

export interface CreateOrder {
  custid: FormControl<number | null>;
  empid: FormControl<number | null>;
  orderdate: FormControl<Date | null>;
  requireddate: FormControl<Date | null>;
  shippeddate: FormControl<Date | null>;
  shipperid: FormControl<number | null>;
  freight: FormControl<number | null>;
  shipname: FormControl<string | null>;
  shipaddress: FormControl<string | null>;
  shipcity: FormControl<string | null>;
  shipcountry: FormControl<string | null>;
  productid: FormControl<number | null>;
  unitprice: FormControl<number | null>;
  quantity: FormControl<number | null>;
  discount: FormControl<number | null>;
}
