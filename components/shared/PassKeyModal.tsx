"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import { Button } from "../ui/button";

export default function PassKeyModal() {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const storedHash =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  useEffect(() => {
    if (storedHash) {
      const accessKey = process.env.NEXT_PUBLIC_ADMIN_PASSKEY;
      if (bcrypt.compareSync(accessKey!, storedHash)) {
        setOpen(false);
        router.push("/admin");
      } else {
        setOpen(true);
      }
    }
  }, [path, router, storedHash]);

  const validatePasskey = useCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>
    ) => {
      e.preventDefault();
      const accessKey = bcrypt.hashSync(
        process.env.NEXT_PUBLIC_ADMIN_PASSKEY!,
        10
      );
      if (bcrypt.compareSync(passkey, accessKey!)) {
        const hashedPasskey = bcrypt.hashSync(passkey, 10);
        localStorage.setItem("accessKey", hashedPasskey);
        setOpen(false);
        router.push("/admin");
      } else {
        setError("Invalid passkey. Please try again.");
      }
    },
    [passkey, router]
  );

  useEffect(() => {
    function handleKeyDown(
      e: React.KeyboardEvent<HTMLButtonElement> | KeyboardEvent
    ) {
      if (e.key === "Enter") {
        validatePasskey(e as React.KeyboardEvent<HTMLButtonElement>);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [passkey, validatePasskey]);

  const closeModal = (e: React.MouseEvent<HTMLImageElement>) => {
    setOpen(false);
    router.push("/");
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between">
            Admin access verification
            <Image
              src={"/assets/icons/close.svg"}
              alt="Close icon"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={closeModal}
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin dashboard, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="item self-center w-full justify-self-center mt-5">
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => {
              setPasskey(value);
            }}
            className="flex justify-around"
          >
            <InputOTPGroup className="flex justify-around w-full">
              <InputOTPSlot
                className="rounded-md border border-inputBorder"
                index={0}
              />
              <InputOTPSlot
                className="rounded-md border border-inputBorder"
                index={1}
              />
              <InputOTPSlot
                className="rounded-md border border-inputBorder"
                index={2}
              />
              <InputOTPSlot
                className="rounded-md border border-inputBorder"
                index={3}
              />
              <InputOTPSlot
                className="rounded-md border border-inputBorder"
                index={4}
              />
              <InputOTPSlot
                className="rounded-md border border-inputBorder"
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="text-red-500 text-sm text-center mt-5">{error}</p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={validatePasskey} className="mt-5">
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
