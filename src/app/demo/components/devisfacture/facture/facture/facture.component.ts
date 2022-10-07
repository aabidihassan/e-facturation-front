import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Facture } from 'src/app/models/Facture/facture';
import { Utilisateur } from 'src/app/models/Utilisateur/utilisateur';
import { ProfileService } from 'src/app/services/auth/Profile/profile.service';
import { FactureService } from 'src/app/services/Facture/facture.service';
import { ModeleService } from 'src/app/services/modele/modele.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {

  products: Product[] = [];

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';

  sourceCities: any[] = [];

  targetCities: any[] = [];

  orderCities: any[] = [];

  telechargertDialog : boolean = false;

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

  factures !: Array<Facture>;


  constructor(private productService: ProductService, private factureService: FactureService, private router:Router, private modeleService : ModeleService, private profileService: ProfileService) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem("user")!)

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
        },err=>{
            this.router.navigate(['/'])
        })
}

onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
}

goPlaces() {
  this.router.navigateByUrl('/factures/creation');
}
open() {

    this.telechargertDialog = true;
  }
  hideDialog() {
    this.telechargertDialog = false;
}

    details(facture : Facture){
        this.router.navigate(['/factures/creation'], { state: {facture: facture} });
    }

}
