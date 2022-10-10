import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Token } from 'src/app/models/auth/token/token';
import { Produit } from 'src/app/models/Produit/produit';
import { Utilisateur } from 'src/app/models/Utilisateur/utilisateur';
import { ProfileService } from 'src/app/services/auth/Profile/profile.service';
import { ProduitService } from 'src/app/services/Produit/produit.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss'],
  providers: [MessageService]
})
export class ProduitsComponent implements OnInit {

    produit :Produit = new Produit();

    bool : boolean = false;

    produits !: Produit[];

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

      formData !: FormData;

      selectedFiles?: FileList;

      file !: Blob;

    constructor(private productService: ProductService, private profileService : ProfileService, private sanitizer: DomSanitizer ,private messageService: MessageService, private produitService : ProduitService) { }

    ngOnInit() {
        this.profileService.profile().subscribe(data=>{
            this.user = data;
            this.productService.getProducts().then(data => this.products = data);
      this.user.entreprise.produits.forEach((prod)=>{
        this.produitService.logo(prod).subscribe(dt=>{
            this.file = new Blob([dt.body!],
                { type: `${dt.headers.get('Content-Type')};charset=utf-8`}),
                dt.headers.get('File-Name')

            const unsafeImg = URL.createObjectURL(this.file);
            prod.file= this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        },err=>{
            alert("Erroor");
        })
      })
        })
        this.formData = new FormData();

  }

  openNew() {
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editFournisseur(produit: Produit) {
      this.produit = { ...produit };
      this.productDialog = true;
  }

  deleteProduct(produit: Produit) {
    //   this.deleteProductDialog = true;
    //   this.produit = { ...produit };
    this.produitService.delete(produit.reference).subscribe(data=>{
        alert("Produit bien supprime");
        this.refresh();
    },err=>{
        alert("Erroor")
    })
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

    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }

  saveProduct() {
    this.submitted = true;
    this.formData.append("produit", JSON.stringify(this.produit));
    const file: File | null = this.selectedFiles?.item(0)!;
    this.formData.append("file", file);
      this.produitService.save(this.formData).subscribe(data=>{
          this.submitted = true;
          this.productDialog = false;
          this.profileService.profile().subscribe(data=>{
            this.user = data;
            localStorage.setItem("user", JSON.stringify(this.user));
            this.ngOnInit();
        })
      },err=>{
          alert("Error, try again");
      })
  }

  refresh(){
    this.profileService.profile().subscribe(data=>{
        this.user = data;
        localStorage.setItem("user", JSON.stringify(this.user))
        this.ngOnInit();
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
