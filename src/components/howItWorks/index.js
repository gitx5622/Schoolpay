import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";
import { Listbox, ListboxItem, cn } from "@nextui-org/react";
import { AcmeLogo } from "../icons/AcmeLogo";

export default function HowItWorks({ title, content, image }) {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Card className="max-w-[100%]">
      <CardHeader className="">
        <div className="flex gap-5">
          <Image src={image} width={60} height={60} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {title}
            </h4>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <Listbox variant="faded" aria-label="Listbox menu with icons">
          {content.map((item) => (
            <ListboxItem
              key={item.id}
              startContent={<AcmeLogo className={iconClasses} />}
            >
              <p>{item.title}</p>
            </ListboxItem>
          ))}
        </Listbox>
      </CardBody>
    </Card>
  );
}
