import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { CKEditorComponent } from 'ng2-ckeditor';
import { ProductService } from 'src/app/demo/service/product.service';
import { Utilisateur } from 'src/app/models/Utilisateur/utilisateur';
import { LigneCommande } from 'src/app/models/LigneCommande/ligne-commande';
import { Facture } from 'src/app/models/Facture/facture';
import { FactureService } from 'src/app/services/Facture/facture.service';
import { DatePipe } from '@angular/common';
import { Reglement } from 'src/app/models/Reglement/reglement';
import * as printJS from "print-js";
import { Modele } from 'src/app/models/Modele/modele';
import { Generation } from 'src/app/dto/facture/generation/generation';
import { ModeleService } from 'src/app/services/modele/modele.service';
import { saveAs } from 'file-saver';
import { Send } from 'src/app/dto/facture/send/send';
@Component({
  selector: 'app-creationfacture',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {

  @ViewChild('ckeditor') ckeditor=CKEditorComponent;

  customers1: Customer[] = [];

  customers2: Customer[] = [];

  customers3: Customer[] = [];

  selectedCustomers1: Customer[] = [];

  selectedCustomer: Customer = {};

  representatives: Representative[] = [];

  statuses: any[] = [];

  products: Product[] = [];

  rowGroupMetadata: any;
  generation !: Generation;
  blob !: Blob;



  activityValues: number[] = [0, 100];

  isExpanded: boolean = false;

  idFrozen: boolean = false;

  loading: boolean = true;

  paiementDialog : boolean = false;
  commandeDialog : boolean = false;
  emailDialog : boolean = false;

  telechargertDialog : boolean = false;

  reglement !: Reglement;
  isEmail !: boolean;
  content !: Send;

  types = [
    { label: 'Service', value: "SERVICES" },
    { label: 'Produit' ,value: "PRODUITS"}
  ];

  facture !: Facture;

  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

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

  user !: Utilisateur;
  ligne !: LigneCommande;
  type !: string;
  today !: string;

  constructor( private productService: ProductService, private modeleService : ModeleService, private router:Router, private factureService : FactureService, private datepipe: DatePipe) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user")!);
    this.type = this.user.entreprise.categorie.nom_categorie;

    this.today = this.datepipe.transform((new Date), 'MM/dd/yyyy')!

    if(history.state.facture == null) {
        this.facture = new Facture();
        this.facture.numero = 0;
        this.facture.reste = 0;
        this.facture.creation = this.today;
    }
    else this.facture = history.state.facture;
    if(this.facture.lignes==null) {
        this.facture.lignes = new Array<LigneCommande>;
        this.facture.ht = 0;
        this.facture.ttc = 0;
    }
    console.log(this.facture)
    this.ligne = new LigneCommande();
    this.productService.getProducts().then(data => this.products = data);

  }

  generer(modele:Modele){

    if(this.isEmail){
        this.content = new Send();
        this.content.object = this.facture.reference;
        this.content.message = "<p>Cher(e) " + this.facture.client.raison + this.facture.client.nom + ".<br /> <br />Voici votre facture&nbsp;<strong>" + this.facture.reference +"</strong>&nbsp;d&#39;un montant de&nbsp;<strong>&nbsp;" + this.facture.ttc + "&nbsp;DH</strong>&nbsp;de <strong>" + this.user.entreprise.raison + "</strong>.<br />N&#39;h&eacute;sitez pas &agrave; nous contacter pour toutes questions</p>"
        this.content.facture = this.facture;
        this.content.modele = modele;
        this.hideDialog();
        this.openEamil();
    }else{
        this.generation = new Generation();
        this.generation.modele = modele;
        this.generation.facture = this.facture;
        this.factureService.generate(this.generation).subscribe(data=>{
            this.blob = new Blob([data.body!],
                { type: `${data.headers.get('Content-Type')};charset=utf-8`}),
                data.headers.get('File-Name')

                setTimeout(() =>
                {
                    const blobUrl = URL.createObjectURL(this.blob);
                    printJS(blobUrl);
                },
                500);

        },err=>{
            alert("Erroooor")
        })
    }
}

  openPaiement() {
    this.reglement = new Reglement();
    this.reglement.date = this.today;
    this.paiementDialog = true;
  }
  openCommande() {
    this.ligne = new LigneCommande();
    this.type = this.user.entreprise.categorie.nom_categorie;
    this.commandeDialog = true;
  }

  addReglement(){
    this.facture.reglements.push(this.reglement);
    let totalReglement = 0;
    this.facture.reglements.forEach((r)=>{
        totalReglement += r.montant;
    })
    this.facture.reste = (this.facture.ttc-totalReglement);
    if(totalReglement>=this.facture.ttc) this.facture.statut = 'paye';
    this.factureService.save(this.facture).subscribe(data=>{
        this.facture = data;
    },err=>{
        alert("Error");
    })
    this.paiementDialog = false;
  }

  addLigne(){
    switch(this.type){
        case 'PRODUITS' : this.ligne.ht = (this.ligne.produit.prix*this.ligne.qte); this.ligne.ttc = (this.ligne.ht + (this.ligne.ht*this.user.entreprise.taxe/100)); break;
        case 'SERVICES' : this.ligne.ht = (this.ligne.service.taux_horaire*this.ligne.qte); this.ligne.ttc = (this.ligne.ht + (this.ligne.ht*this.user.entreprise.taxe/100)); break;
    }
    this.ligne.id_ligne = 0;
    this.facture.lignes.push(this.ligne);
    this.facture.lignes.forEach((l)=>{
        this.facture.ht+=l.ht;
        this.facture.ttc+=l.ttc;
    })
    this.facture.reste+=this.ligne.ttc;
    this.commandeDialog = false;
  }

  sauvegarder(statut : any){
    this.facture.statut = statut;
    if(statut=='valide') this.facture.validation = this.today;
    if(statut != null){
        this.factureService.save(this.facture).subscribe(data=>{
        this.facture = data;
        },err=>{
            alert("Erooor");
        })
    }

  }

  annuler(){
    this.router.navigate(['/factures']);
  }

  openEamil() {
    this.emailDialog = true;
  }

  open(bool:boolean) {
    this.isEmail = bool;
    this.user.entreprise.modeles.forEach(mod=>{
        this.modeleService.download(mod.file).subscribe(data=>{
            mod.blob = new Blob([data.body!],
                { type: `${data.headers.get('Content-Type')};charset=utf-8`}),
                data.headers.get('File-Name')

                const fileReader = new FileReader();
                fileReader.onload = () => {
                    mod.pdf = new Uint8Array(fileReader.result as ArrayBuffer);
                };
                fileReader.readAsArrayBuffer(mod.blob);
        },err=>{
            alert("Errooooooooor");
        })
    })
    this.telechargertDialog = true;
  }

  sendMail(){
    this.factureService.sendMail(this.content).subscribe(data=>{
        alert("Email bien envoyer")
        this.hideDialog();
    },err=>{
        alert("Error")
    })
  }

  hideDialog() {
    this.paiementDialog = false;
    this.commandeDialog = false;
    this.emailDialog = false;
    this.telechargertDialog = false;

}



}
