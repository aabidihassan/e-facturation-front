export class Modele {

    public id_modele !: number;
    public nom_modelep !: string;
    public prefixe !: string;
    public description !: string;
    public position !: string;
    public casse !: string;
    public pied !: string;
    public cl_titre_corps !: string;
    public cl_txt_corps !: string;
    public pl_titre_corps !: string;
    public pl_txt_corps !: string;
    public cl_bas !: string;
    public cl_total !: string;
    public taill_titre_corps !: string;
    public taill_txt_corps !: string;
    public cl_titre_entt !: string;
    public cl_txt_entt !: string;
    public pl_titre_entt !: string;
    public pl_txt_entt !: string;
    public taill_titre_entt !: string;
    public taill_txt_entt !: string;

    public pl_bas !: string;
    public taill_bas !: string;

    public pl_total !: string;
    public taill_total !: string;
    public style_bordure !: string;
    public cl_bordure !: string;
    public cl_template !: string;
    public file !: string;
    public blob !: Blob;
    public pdf !: Uint8Array;
}
