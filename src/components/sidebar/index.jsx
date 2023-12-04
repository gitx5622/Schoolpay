import { navList } from "@/helpers/data";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../../public/equity.svg";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(2);

  const handleClick = (item) => {
    setSelectedIndex(item.id);
    router.push(item.path);
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
            color={"primary"}
            showDivider={true}
            textValue=""
          >
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className={`btn ${
                selectedIndex === item.id ? "active" : ""
              } active:bg-violet-700`}
            >
              <h3 className="text-md flex gap-3 items-center">
                <div className="text-sm">{item.icon}</div>
                {item.title}
              </h3>
            </button>
          </ListboxItem>
        )}
      </Listbox>
    </div>
  );
};

export default Sidebar;
