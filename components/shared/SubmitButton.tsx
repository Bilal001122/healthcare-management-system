import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type SubmitButtonProps = {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function SubmitButton(props: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      size="lg"
      className={cn("w-full text-base font-bold", props.className)}
      disabled={props.isLoading}
    >
      {props.isLoading ? <p>Loading ...</p> : props.children}
    </Button>
  );
}
