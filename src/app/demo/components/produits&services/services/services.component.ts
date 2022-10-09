import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Token } from 'src/app/models/auth/token/token';
import { Service } from 'src/app/models/Service/service';
import { Utilisateur } from 'src/app/models/Utilisateur/utilisateur';
import { ProfileService } from 'src/app/services/auth/Profile/profile.service';
import { ServiceAppService } from 'src/app/services/ServiceApp/service-app.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: [MessageService]
})
export class ServicesComponent implements OnInit {

    service :Service = new Service();

    bool : boolean = false;

    services !: Service[];

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

      user !: Utilisateur;

    constructor(private profileService : ProfileService ,private messageService: MessageService, private serviceService : ServiceAppService) { }

    ngOnInit() {

        this.profileService.profile().subscribe(data=>{
            this.user = data;
        },err=>{
            this.ngOnInit();
        })

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

  editFournisseur(service: Service) {
      this.service = { ...service };
      this.productDialog = true;
  }

  deleteProduct(product: Service) {
      this.deleteProductDialog = true;
      this.service = { ...product };
  }

  confirmDeleteSelected() {
      this.deleteProductsDialog = false;
      this.products = this.products.filter(val => !this.selectedProducts.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      this.selectedProducts = [];
  }

  confirmDelete() {
      this.deleteProductDialog = false;
      this.serviceService.delete(this.service.id_service).subscribe(data=>{
        alert("Service bien supprime")
      },err=>{
        alert("Erroor")
      })
      this.service = new Service();
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  saveProduct() {
      this.submitted = true;

      this.serviceService.save(this.service).subscribe(data=>{
          this.service = new Service();
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
