import { navList } from "@/helpers/data";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../../public/equity.svg";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const [bg, setBg] = useState(2);

  const handleClick = (item) => {
    router.push(item.path);
    setBg(item.id);
  };

  return (
    <div className="h-screen w-80 bg-[#F5F4F5]">
      <div className="flex gap-8 text-center bg-[#871914] text-3xl p-2 pl-8">
        <Image src={Logo} width={60} height={60} alt="Logo" />
        <div>
          <h2 className="flex justify-content-end text-white pt-3">
            SchoolPay
          </h2>
        </div>
      </div>
      <Listbox
        items={navList}
        aria-label="Dynamic Actions"
        className="pt-6 text-2xl"
      >
        {(item) => (
          <ListboxItem
            key={item.id}
            color={bg !== "" ? "primary" : "default"}
            className={`${bg}:bg-blue-600 p-5 text-2xl active"]`}
            showDivider={true}
            onPress={() => handleClick(item)}
          >
            <h3 className="text-md flex gap-3 items-center">
              <div className="text-sm">{item.icon}</div>
              {item.title}
            </h3>
          </ListboxItem>
        )}
      </Listbox>
    </div>
  );
};

export default Sidebar;
