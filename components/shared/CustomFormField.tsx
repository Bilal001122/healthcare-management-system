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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";

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
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            disabled={props.disabled}
            className="text-base bg-input border-inputBorder"
            {...field}
          />
        </FormControl>
      );
    case FormFieldType.SELECT:
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl className="bg-input border-inputBorder h-[2.6rem]">
            <SelectTrigger>
              <SelectValue
                className="text-foreground"
                placeholder={props.placeholder}
              />
            </SelectTrigger>
          </FormControl>
          <SelectContent>{props.children}</SelectContent>
        </Select>
      );
    case FormFieldType.CHECKBOX:
      return (
        <div className="flex gap-4 items-center">
          <FormControl>
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormLabel
            htmlFor={props.name}
            className="text-base text-foreground/70 cursor-pointer"
          >
            {props.label}
          </FormLabel>
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
            className="flex w-full rounded-md border-[1px] border-inputBorder bg-input  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 !text-base !h-11"
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex gap-4 h-10">
          <Image
            src="/assets/icons/calendar.svg"
            alt="calendar"
            height={28}
            width={28}
            className="object-contain"
          />
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full h-10 px-3 py-2 justify-start text-left font-normal bg-input border-inputBorder hover:bg-primary/10 border-[1px] text-sm",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{props.placeholder}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                  captionLayout="dropdown-buttons"
                />
              </PopoverContent>
            </Popover>
          </FormControl>
        </div>
      );

    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;

    default:
      break;
  }
}
