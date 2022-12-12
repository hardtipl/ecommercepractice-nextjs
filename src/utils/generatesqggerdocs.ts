import { swaggergenerate } from "./genereateswaggerdocs.dto"
export class generateSwaggerdocs {

    apitype: string
    apititle: string
    apisummary: string
    addinpreviousapi: string
    property: [any]
    url: string
    propertyof: "queryparams" | "path" | "body" | "params"
    constructor(apitype: "get" | "post" | "put" | "delete",
        apititle: string,
        apisummary: string,
        addinpreviousapi: string,
        property: [any],
        url: string,
        propertyof: "queryparams" | "path" | "body" | "params") {
            this.apitype=apitype
            this.apititle=apititle
            this.apisummary= apisummary
            this.addinpreviousapi= addinpreviousapi
            this.property= property
            this.url= url
            this.propertyof= propertyof
    }
}