import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";
import onBardingImg from "@/public/assets/images/onboarding-img.png";
import PassKeyModal from "@/components/shared/PassKeyModal";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const isAdmin = searchParams.admin === "true";
  return (
    <div className="flex-1 flex">
      {isAdmin && <PassKeyModal />}
      <div className="custom-scrollbar flex-1 md:w-[50%] flex flex-col overflow-y-auto px-10 md:px-12 xl:px-32 py-6 custom-scrollbar h-screen">
        <div className="flex flex-col flex-1 justify-between">
          <Image
            src={"/assets/icons/logo-full.svg"}
            width={200}
            height={100}
            style={{ width: "200px", height: "100px" }}
            priority
            alt="CarePulse logo"
            className="object-contain mt-5"
          />
          <PatientForm />
          <div className="text-base flex justify-between items-center mt-4">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePulse
            </p>
            <Link
              href="/?admin=true"
              className="text-primary px-4 py-2 rounded-md hover:bg-primary/10"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>

      <div className="relative w-[50%] hidden md:block">
        <Image
          src={onBardingImg}
          fill
          quality={75}
          sizes="100%"
          placeholder="blur"
          alt="Doctor image"
          className="object-cover rounded-tl-2xl rounded-bl-2xl"
        />
      </div>
    </div>
  );
}
