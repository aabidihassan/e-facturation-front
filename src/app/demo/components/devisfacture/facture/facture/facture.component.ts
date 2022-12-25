import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { Generation } from 'src/app/dto/facture/generation/generation';
import { Facture } from 'src/app/models/Facture/facture';
import { Modele } from 'src/app/models/Modele/modele';
import { Utilisateur } from 'src/app/models/Utilisateur/utilisateur';
import { FactureService } from 'src/app/services/Facture/facture.service';
import { ModeleService } from 'src/app/services/modele/modele.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {

  sortByPrice: SelectItem[] = [];

  sortByEtat: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';

  telechargertDialog : boolean = false;

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

  factures !: Array<Facture>;
  facturesInitial !: Array<Facture>;
  factureSelected !: Facture;
  generation !: Generation;
  blob !: Blob;

  constructor(private factureService: FactureService, private router:Router, private modeleService : ModeleService) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem("user")!)

    this.sortByPrice = [
        { label: 'Total du haut au bas', value: '!ttc' },
        { label: 'Total de bas en haut', value: 'ttc' }
    ];

    this.sortByEtat = [
        { label: 'Tous', value: 'tous' },
        { label: 'Brouillant', value: 'brouillon' },
        { label: 'En cour de paiement', value: 'en cour de paiement' },
        { label: 'Paye', value: 'paye' },
        { label: 'Echoue', value: 'echoue' }
    ];

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

        this.factureService.getFacturesByEntreprise().subscribe(data=>{
            this.factures = data;
            this.facturesInitial = data;
        },err=>{
            this.router.navigate(['/'])
        })
}

onSortByPrice(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

onSortByEtat(event: any) {
    switch(event.value){
        case "brouillon" : this.factures = this.facturesInitial.filter(f=>f.statut=="brouillon")
            break;

        case "en cour de paiement": this.factures = this.facturesInitial.filter(f=>f.statut=="en cour de paiement")
            break;

        case "paye": this.factures = this.facturesInitial.filter(f=>f.statut=="paye")
            break;

        case "echoue": this.factures = this.facturesInitial.filter(f=>f.statut=="echoue")
            break;

        default : this.factures = this.facturesInitial;
    }
}

onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
}

goPlaces() {
  this.router.navigateByUrl('/factures/creation');
}
generer(modele:Modele){
    this.generation.modele = modele;
    this.factureService.generate(this.generation).subscribe(data=>{
        this.blob = new Blob([data.body!],
            { type: `${data.headers.get('Content-Type')};charset=utf-8`}),
            data.headers.get('File-Name')

            setTimeout(() =>
            {
                saveAs(this.blob, this.generation.facture.reference);
            },
            500);
    },err=>{
        alert("Erroooor")
    })
}
open(facture : Facture) {
    this.generation = new Generation();
    this.generation.facture = facture;
    this.telechargertDialog = true;
  }
  hideDialog() {
    this.telechargertDialog = false;
}

    details(facture : Facture){
        this.router.navigate(['/factures/creation'], { state: {facture: facture} });
    }

}
