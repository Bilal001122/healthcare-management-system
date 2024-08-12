import { E164Number } from "libphonenumber-js/core";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "../forms/PatientForm";

type CustomFormFieldProps = {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  icon?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormater?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
};

export default function CustomFormField(props: CustomFormFieldProps) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.fieldType !== FormFieldType.CHECKBOX && props.label && (
            <FormLabel className="text-dark-700 text-base">
              {props.label}
            </FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="font-semibold" />
        </FormItem>
      )}
    />
  );
}

function RenderField({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldProps;
}) {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex gap-4">
          {props.icon && (
            <Image
              src={props.icon}
              alt={props.iconAlt || "icon"}
              height={28}
              width={28}
              className="object-contain"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              className="text-base h-fit"
              {...field}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="DZ"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={(field.value as E164Number) || undefined}
            onChange={(value) => field.onChange(value)}
            className="flex w-full rounded-md border border-input bg-background  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 !text-base !h-fit"
          />
        </FormControl>
      );
    default:
      break;
  }
}
