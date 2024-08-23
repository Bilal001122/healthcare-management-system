import clsx from "clsx";
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
      size="default"
      className={clsx("w-full text-sm font-bold", props.className)}
      disabled={props.isLoading}
    >
      {props.isLoading ? <p>Loading ...</p> : props.children}
    </Button>
  );
}
