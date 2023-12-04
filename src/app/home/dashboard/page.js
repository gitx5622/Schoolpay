import React from "react";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import ChartComponent from "@/components/charts";

const Dashboard = () => {
  return (
    <div>
      <div className="flex gap-3 p-3 justify-around flex-wrap">
        <div className="flex grow-1">
          <Card className="col-span-12 sm:col-span-4 h-[350px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-black/60 uppercase font-bold">
                Schoolpay Dashboard
              </p>
              <h4 className="text-black font-medium text-large">
                Where success succeeds
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="https://i.postimg.cc/6qNWwxw2/magicpattern-svg-chart-1701681997784.png"
            />
          </Card>
        </div>
        <div className="flex gap-5 flex-col justify-center grow-1">
          <div className="grow-1">
            <Card
              isFooterBlurred
              className="w-full h-[150px] col-span-12 sm:col-span-5"
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-black/60 uppercase font-bold">
                  Available
                </p>
                <h4 className="text-black font-medium text-2xl">Schools : 30</h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src="https://i.postimg.cc/g2PGZW6g/magicpattern-svg-chart-1701682279344.png"
              />
              <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div>
                  <p className="text-black text-tiny">Available</p>
                  <p className="text-black text-tiny">Schools registered</p>
                </div>
                <Button
                  className="text-tiny"
                  color="primary"
                  radius="full"
                  size="sm"
                >
                  33%
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="grow-1">
            <Card
              isFooterBlurred
              className="w-full h-[150px] col-span-12 sm:col-span-5"
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-black/60 uppercase font-bold">
                  Available
                </p>
                <h4 className="text-black font-medium text-2xl">Users : 60</h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src="https://i.postimg.cc/pXkhvvX5/magicpattern-svg-chart-1701682678320.png"
              />
              <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div>
                  <p className="text-black text-tiny">Available</p>
                  <p className="text-black text-tiny">Users Registered</p>
                </div>
                <Button
                  className="text-tiny"
                  color="primary"
                  radius="full"
                  size="sm"
                >
                  80%
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <ChartComponent height={350} />
    </div>
  );
};

export default Dashboard;
