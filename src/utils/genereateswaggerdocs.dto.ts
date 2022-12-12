export interface swaggergenerate{
    apitype:"get"|"post"|"put"|"delete"
    apititle:string,
    apisummary:string
    addinpreviousapi?:string
    property:[any]
    url:string
    propertyof:"queryparams"|"path"|"body"|"params"
}