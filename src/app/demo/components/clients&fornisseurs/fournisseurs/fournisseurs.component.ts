import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Token } from 'src/app/models/auth/token/token';
import { Fournisseur } from 'src/app/models/Fournisseur/fournisseur';
import { Utilisateur } from 'src/app/models/Utilisateur/utilisateur';
import { ProfileService } from 'src/app/services/auth/Profile/profile.service';
import { FournisseurService } from 'src/app/services/Fournisseur/fournisseur.service';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.scss'],
  providers: [MessageService]
})
export class FournisseursComponent implements OnInit {

    fournisseur :Fournisseur = new Fournisseur();

    bool : boolean = false;

    fournisseurs !: Fournisseur[];

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

    constructor(private productService: ProductService, private profileService : ProfileService ,private messageService: MessageService, private fournisseurService : FournisseurService) { }

    ngOnInit() {
      console.log(Token.getDecodedAccessToken(this.token.accesstoken));
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

  change(){
    if(this.fournisseur.type == "entreprise"){
        this.bool = false;
        this.fournisseur.nom = "";
    }
    if(this.fournisseur.type == "individuel"){
        this.bool = true;
        this.fournisseur.raison = "";
    }
}

  openNew() {
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editFournisseur(fournisseur: Fournisseur) {
      this.fournisseur = { ...fournisseur };
      this.productDialog = true;
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

      this.fournisseurService.save(this.fournisseur).subscribe(data=>{
          this.fournisseur = new Fournisseur();
          alert("Fournisseur bien ajoute");
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
