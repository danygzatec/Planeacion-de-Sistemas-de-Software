export interface EvaluationPeriod {
    id : number,
    semester : string,
    evaluation_year : number,
    hours_to_complete : number
    has_uploaded? : boolean
}
