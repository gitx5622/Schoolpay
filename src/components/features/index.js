import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";

export default function Features({ title, content, image }) {
  return (
    <Card className="max-w-[100%]">
      <CardHeader className="justify-between">
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
        <p className="p-3 pt-0">{content}</p>
      </CardBody>
    </Card>
  );
}
