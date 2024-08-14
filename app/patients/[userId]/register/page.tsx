import Image from "next/image";
import registerImg from "@/public/assets/images/register-img.png";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";

export default async function Page({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const user = await getUser(userId);
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 h-screen overflow-auto px-10 md:px-12 xl:px-32 py-6 overflow-y-auto custom-scrollbar">
        <Image
          src={"/assets/icons/logo-full.svg"}
          width={200}
          height={100}
          style={{ width: "200px", height: "100px" }}
          priority
          alt="CarePulse logo"
          className="object-contain mt-5"
        />

        <RegisterForm user={user} />
      </div>
      <div className="relative w-[30%] hidden md:block">
        <Image
          src={registerImg}
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
