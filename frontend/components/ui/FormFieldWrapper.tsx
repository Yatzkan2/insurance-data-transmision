import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { insuranceTypes } from "@/app/lib/data"
import { Input } from "@/components/ui/input"
import { InsuranceDetailsInputs } from "@/app/lib/definitions"
export default function FormFieldWrapper({fieldNames, form}:{fieldNames: InsuranceDetailsInputs, form: any}) { //need to type it later on
    return (
        <div>
            {Object.entries(fieldNames).map(([key, value], index) => {
                return (
                    <FormField
                        key={index}
                        control={form.control}
                        name={key}
                        render={({ field }) => (
                            (key !== "type") ?
                            // INPUT
                            <FormItem>
                            <FormLabel>{value}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                
                            </FormDescription>
                            <FormMessage />
                            </FormItem> :

                            // SELECT
                            <FormItem>
                            <FormLabel>Insurance type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>

                                <FormControl>
                                    <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Select insurance type" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    {insuranceTypes.map((value, index) => {
                                        return (
                                            <SelectItem key={index} value={value}>{value}</SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                              
                            </FormDescription>
                            <FormMessage />
                          </FormItem>

                        )}
                    /> 
                )
            })}
        </div>
    )
  }
  