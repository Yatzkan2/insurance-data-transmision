import { UseFormReturn } from "react-hook-form";
import { z } from "zod"

export type InsuranceDetailsInputs = {
    ownerFirstName:string,
    ownerLastName: string,
    id: string,
    insuranceLimit: string,
    insuranceCoverage: string,
    insurancePremium: string,
    type: string,
}

export type InsuranceDetails = {
    ownerFirstName:string,
    ownerLastName: string,
    id: string,
    insuranceLimit: number,
    insuranceCoverage: number,
    insurancePremium: number,
    type: string,
    sentTimeStamp?: number,
}