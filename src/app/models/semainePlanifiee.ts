import { HoraireDisponibilites } from "./horaireDisponibilites"
import { JourneePlanifiee } from "./journeePlanifiee";
import { TachePlanifiee } from "./tachePlanifiee";

export class SemainePlanifiee {
    semainePlanifieeID? : number;
    dateDebut : Date = new Date();
    horaireDisponibilites? : HoraireDisponibilites;
    tachesPlanifiees? : TachePlanifiee[];
    journeesPlanifiees? : JourneePlanifiee[];
}