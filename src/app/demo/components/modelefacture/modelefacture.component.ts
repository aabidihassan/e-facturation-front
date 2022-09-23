import { Component, OnInit } from '@angular/core';
import { Modele } from 'src/app/models/Modele/modele';
import { Utilisateur } from 'src/app/models/Utilisateur/utilisateur';
import { Product } from '../../api/product';
import { PhotoService } from '../../service/photo.service';
import { ProductService } from '../../service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ModeleService } from 'src/app/services/modele/modele.service';

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
    { label: 'Facture / Devis', value : "Facture / Devis" },
    { label: 'Facture', value : "Facture" },
    { label: 'Devis', value : "Devis" }
  ];

  writhing = [
    { label: 'Majuscule', value : 'true' },
    { label: 'minuscule', value: 'false' }
  ];

  tailles = [
    { label: '8', value : '8' },
    { label: '9' , value : '9'},
    { label: '10' , value : '10'},
    { label: '11' , value : '11'},
    { label: '12' , value : '12'},
    { label: '13' , value : '13'},
    { label: '14' , value : '14'}
  ];

  polices = [
    { label: 'Arial, sans-serif', value: "Arial, sans-serif" },
    { label: 'Courier', value: "Courier" },
    { label: 'Impact' , value: "Impact"},
    { label: 'Marker Felt' , value: "Marker Felt"},
    { label: 'Trebuchet MS' , value: "Trebuchet MS"},
    { label: 'Garamond' , value: "Garamond"},
    { label: 'Times New Roman' , value: "Times New Roman"},
    { label: 'monospace' , value: "monospace"},
    { label: 'Georgia' , value: "Georgia"}
  ];

  styles = [
    { label: 'none', value: "none" },
    { label: 'dotted' ,value: "dotted"},
    { label: 'inset',value: "inset" },
    { label: 'dashed solid' ,value: "dashed solid"},
    { label: 'dashed double none',value: "dashed double none" },
    { label: 'dashed groove none dotted' ,value: "dashed groove none dotted"},
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


  constructor(private productService: ProductService, private photoService: PhotoService, private modeleService : ModeleService) { }

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
    this.modele.cl_bas = "#000000"
  }

  hideDialog() {
    this.display = false;
    this.submitted = false;
  }
  save() {
    this.submitted = true;
    this.modeleService.save(this.modele).subscribe(data=>{
        console.log(data)
    },err=>{
        alert("Erroooooooor")
    })
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
