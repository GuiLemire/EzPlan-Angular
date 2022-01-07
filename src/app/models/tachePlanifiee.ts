import { PartieDeTachePlanifiee } from "./partieDeTachePlanifiee";
import { Tache } from "./tache";

export class TachePlanifiee {
    tachePlanifieeID? : number;
    dateEcheance? : Date;
    tache? : Tache;
    partiesDeTachesPlanifiees? : PartieDeTachePlanifiee[];

    constructor(tache : Tache){
        this.tache = tache;
    }
}