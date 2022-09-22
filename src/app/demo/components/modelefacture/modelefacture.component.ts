import { Component, OnInit } from '@angular/core';
import { Modele } from 'src/app/models/Modele/modele';
import { Utilisateur } from 'src/app/models/Utilisateur/utilisateur';
import { Product } from '../../api/product';
import { PhotoService } from '../../service/photo.service';
import { ProductService } from '../../service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-modelefacture',
  templateUrl: './modelefacture.component.html',
  styleUrls: ['./modelefacture.component.scss']
})
export class ModelefactureComponent implements OnInit {
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";


  products!: Product[];

  images!: any[];
  display: boolean = false;
  submitted: boolean = false;
  product: Product = {};
  user !: Utilisateur;
  modele !: Modele;

  statuses = [
    { desinePour: 'Facture / Devis' },
    { desinePour: 'Facture' },
    { desinePour: 'Devis' }
  ];

  writhing = [
    { casse: 'Majuscule' },
    { casse: 'minuscule' }
  ];

  tailles = [
    { taille: '8' },
    { taille: '9' },
    { taille: '10' },
    { taille: '11' },
    { taille: '12' },
    { taille: '13' },
    { taille: '14' }
  ];

  polices = [
    { police: 'Arial, sans-serif' },
    { police: 'Courier' },
    { police: 'Impact' },
    { police: 'Marker Felt' },
    { police: 'Trebuchet MS' },
    { police: 'Garamond' },
    { police: 'Times New Roman' },
    { police: 'monospace' },
    { police: 'Georgia' }
  ];

  styles = [
    { style: 'none' },
    { style: 'dotted' },
    { style: 'inset' },
    { style: 'dashed solid' },
    { style: 'dashed double none' },
    { style: 'dashed groove none dotted' },
  ];




  carouselResponsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  private confirmationService: ConfirmationService = new ConfirmationService(); private messageService: MessageService = new MessageService();


  constructor(private productService: ProductService, private photoService: PhotoService) { }

  ngOnInit() {


    this.modele = new Modele();
    this.user = new Utilisateur();
    this.productService.getProductsSmall().then(products => {
      this.products = products;
    });

    this.photoService.getImages().then(images => {
      this.images = images;
    });
  }
  openNew() {
    this.product = {};
    this.submitted = false;
    this.display = true;
  }

  hideDialog() {
    this.display = false;
    this.submitted = false;
  }
  saveProduct() {
    this.submitted = true;
  }
  confirm2(event: Event) {
    this.confirmationService.confirm({
      key: 'confirm2',
      target: event.target || new EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }

    });

  }
}