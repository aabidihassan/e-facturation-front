import { Token } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { CountryService } from 'src/app/demo/service/country.service';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Utilisateur } from 'src/app/models/Utilisateur/utilisateur';
import { LoginService } from 'src/app/services/auth/login/login.service';
import { ProfileService } from 'src/app/services/auth/Profile/profile.service';
interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  customers1: Customer[] = [];

  customers2: Customer[] = [];

  customers3: Customer[] = [];

  selectedCustomers1: Customer[] = [];

  selectedCustomer: Customer = {};

  representatives: Representative[] = [];

  rowGroupMetadata: any;


  expandedRows: expandedRows = {};

  activityValues: number[] = [0, 100];

  isExpanded: boolean = false;

  idFrozen: boolean = false;

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;


  selectedMulti: any;


    statuses = [
        { nom_categorie: 'PRODUITS & SERVICES'},
        { nom_categorie: 'PRODUITS' },
        { nom_categorie: 'SERVICES'}
    ];

    user !: Utilisateur;
    productDialog : boolean = false;
    submitted :boolean= false;

    products: Product[] = [];

    product: Product = {};

    valCheck: string[] = ['remember'];

    password!: string;

    countries: any[] = [];



    userAuth : Utilisateur = new Utilisateur();

    formData : FormData = new FormData();

    selectedFiles?: FileList;

    repeted !: string;


  constructor(public layoutService: LayoutService,private customerService: CustomerService, private productService: ProductService, private profileService : ProfileService ,private router : Router ,private countryService: CountryService, private loginService : LoginService) { }

  ngOnInit() {
    this.customerService.getCustomersLarge().then(customers => {
        this.customers1 = customers;
        this.loading = false;

        // @ts-ignore
        this.customers1.forEach(customer => customer.date = new Date(customer.date));
    });
    this.customerService.getCustomersMedium().then(customers => this.customers2 = customers);
    this.customerService.getCustomersLarge().then(customers => this.customers3 = customers);
    this.productService.getProductsWithOrdersSmall().then(data => this.products = data);

    this.representatives = [
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ];


}

logout(){
    localStorage.clear();
    this.router.navigate(['auth/login'])
}

onSort() {
    this.updateRowGroupMetaData();
}

updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.customers3) {
        for (let i = 0; i < this.customers3.length; i++) {
            const rowData = this.customers3[i];
            const representativeName = rowData?.representative?.name || '';

            if (i === 0) {
                this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
            }
            else {
                const previousRowData = this.customers3[i - 1];
                const previousRowGroup = previousRowData?.representative?.name;
                if (representativeName === previousRowGroup) {
                    this.rowGroupMetadata[representativeName].size++;
                }
                else {
                    this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                }
            }
        }
    }
}

expandAll() {
    if (!this.isExpanded) {
        this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');

    } else {
        this.expandedRows = {};
    }
    this.isExpanded = !this.isExpanded;
}

formatCurrency(value: number) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}
openNew() {
  this.product = {};
  this.submitted = false;
  this.productDialog = true;
}

hideDialog() {
  this.productDialog = false;
  this.submitted = false;
}


register() {
  this.submitted = true;
  const file: File | null = this.selectedFiles?.item(0)!;
  this.formData.append("file", file);
  this.formData.append("user", JSON.stringify(this.user));
  this.loginService.register(this.formData).subscribe(data=>{
      alert("Votre compte est bien cree")

  },err=>{
      this.formData = new FormData();
      alert("Erroooor")
  })
}

clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}
}
