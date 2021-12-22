import { HoraireDisponibilites } from "./horaireDisponibilites"
import { JourneePlanifiee } from "./journeePlanifiee";
import { TachePlanifiee } from "./tachePlanifiee";

export class SemainePlanifiee {
    semainePlanifieeID? : number;
    dateDebut : Date;
    horaireDisponibilites? : HoraireDisponibilites;
    tachesPlanifiees? : TachePlanifiee[];
    journeesPlanifiees? : JourneePlanifiee[];

    constructor(){
        var t = new Date(Date.now());
        t.setDate(t.getDate() - (t.getDay()) - 1);
        this.dateDebut = t;
    }
}