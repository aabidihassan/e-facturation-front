import { Facture } from "src/app/models/Facture/facture";
import { Modele } from "src/app/models/Modele/modele";

export class Send {
    public facture !: Facture;
    public modele !: Modele;
    public message !: string;
    public object !: string;
}
