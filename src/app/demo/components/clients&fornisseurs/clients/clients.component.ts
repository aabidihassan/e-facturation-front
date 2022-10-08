
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Token } from 'src/app/models/auth/token/token';
import { Client } from 'src/app/models/Client/client';
import { Facture } from 'src/app/models/Facture/facture';
import { Utilisateur } from 'src/app/models/Utilisateur/utilisateur';
import { ProfileService } from 'src/app/services/auth/Profile/profile.service';
import { ClientService } from 'src/app/services/Client/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [MessageService]
})
export class ClientsComponent implements OnInit {
  client !:Client;

  bool : boolean = false;

  clients !: Client[];

  types = [
    { label: 'Entreprise', value: 'entreprise' },
    { label: 'Individuel', value: 'individuel' }
];

  selectedProduct: Product = {};

  productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    token : Token = JSON.parse(localStorage.getItem("token")!);

    user : Utilisateur = JSON.parse(localStorage.getItem("user")!)

  constructor(private router : Router, private productService: ProductService, private profileService : ProfileService ,private messageService: MessageService, private clientService : ClientService) { }

  ngOnInit() {

    this.client = new Client();

    console.log(Token.getDecodedAccessToken(this.token.accesstoken));

    this.client = new Client();
    this.productService.getProducts().then(data => this.products = data);

    this.cols = [
        { field: 'product', header: 'Product' },
        { field: 'price', header: 'Price' },
        { field: 'category', header: 'Category' },
        { field: 'rating', header: 'Reviews' },
        { field: 'inventoryStatus', header: 'Status' }
    ];

    this.statuses = [
        { label: 'INSTOCK', value: 'instock' },
        { label: 'LOWSTOCK', value: 'lowstock' },
        { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
}

openNew() {
    this.submitted = false;
    this.productDialog = true;
}

deleteSelectedProducts() {
    this.deleteProductsDialog = true;
}

editProduct(client: Client) {
    this.client = { ...client };
    this.productDialog = true;
}

change(){
    if(this.client.type == "entreprise"){
        this.bool = false;
        this.client.nom = "";
    }
    if(this.client.type == "individuel"){
        this.bool = true;
        this.client.raison = "";
    }
}

openFacture(facture : Facture){
    this.router.navigate(['/factures/creation'], { state: {facture: facture} });
}

deleteProduct(product: Product) {
    this.deleteProductDialog = true;
    this.product = { ...product };
}

confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.products = this.products.filter(val => !this.selectedProducts.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    this.selectedProducts = [];
}

confirmDelete() {
    this.deleteProductDialog = false;
    this.products = this.products.filter(val => val.id !== this.product.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    this.product = {};
}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}

saveProduct() {
    this.submitted = true;

    this.clientService.save(this.client).subscribe(data=>{
        this.client = new Client();
        this.submitted = true;
        this.productDialog = false;
        this.profileService.profile().subscribe(data=>{
            this.user = data;
            localStorage.setItem("user", JSON.stringify(this.user))
            this.ngOnInit();
        })

    },err=>{
        alert("Error, try again");
    })
}

findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

formatCurrency(value: number) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
}
