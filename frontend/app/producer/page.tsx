"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { ShieldCheck, Send } from "lucide-react" 
import { Button } from "@/components/ui/button";
import { pollSqsAndPushToDB, submitForm } from "../lib/actions";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import FormFieldWrapper from "@/components/ui/FormFieldWrapper"
import { fieldNames, validationErrorMsgs as vem } from "../lib/data"

const formSchema = z.object({
  ownerFirstName: z.string().min(2, vem.nameLength).max(50, vem.nameLength).regex(/^[A-Za-z]+$/,vem.nameCharacters),
  ownerLastName: z.string().min(2, vem.nameLength).max(50, vem.nameLength).regex(/^[A-Za-z]+$/,vem.nameCharacters),
  id: z.string().regex(/^\d{9}$/, vem.id),
  insuranceLimit: z.coerce.number().min(1),
  insuranceCoverage: z.coerce.number().min(1),
  insurancePremium: z.coerce.number().min(1),
  type: z.string().min(1,vem.type),
})

export default function ProducerPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ownerFirstName: "",
            ownerLastName: "",
            id: "",
            insuranceLimit: 0,
            insuranceCoverage: 0,
            insurancePremium: 0,
            type: "",
        },
    })
  
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("form submitted");
        console.log(values);
        const response = await submitForm(values);
        alert(response.clientExists === true ? "Cannot send the data, this client already exists": "Thank you! Your details has been sent.")
        await pollSqsAndPushToDB();
    }

    return (
        <>
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-amber-100 to-amber-50 p-6">
            <div className="text-center mb-8">
                <ShieldCheck className="w-12 h-12 mx-auto text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-800 mt-2">Insurance Data Submission</h2>
                <p className="text-gray-600 mt-1">
                    Fill in the details and securely send them for processing.
                </p>
            </div>

            <div className="bg-gradient-to-b from-cyan-50 to-cyan-100 p-8 rounded-xl shadow-xl w-full max-w-lg">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormFieldWrapper fieldNames={fieldNames} form={form}/>
                        <Button className="w-full bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 transition-all duration-300 shadow-md" type="submit">Submit</Button>
                    </form>
                </Form>
            </div>

            <footer className="mt-10 text-center text-gray-500 text-sm">
                <p>Powered by Polisave™</p>
            </footer>
        </div>
        </>
    )
}