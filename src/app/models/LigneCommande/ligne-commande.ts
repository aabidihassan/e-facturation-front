import { Facture } from "../Facture/facture";
import { Produit } from "../Produit/produit";
import { Service } from "../Service/service";

export class LigneCommande {

    public id_ligne !: number;
    public produit !: Produit | null;
    public service !: Service | null;
    public qte !: number;
    public ht !: number;
    public ttc !: number;
    public facture !: Facture;
}
