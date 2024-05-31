"use client";

import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchData } from "@/lib/fetchData";
import Loading from "../../components/Loading";
import { PaginationComponent } from "../../components/Pagination";
import FormFee from "../../components/FormFee";
export default function Fees() {
  const searchParams = useSearchParams();
  const [fees, setFees] = useState<any>({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    const name = searchParams.get("name");
    let url = `public/fees?limit=${limit}&page=${page}`;
    if (name) {
      url = `public/fees?type=${name}&limit=${limit}&page=${page}`;
    }
    fetchData(url, setFees);
    setLoading(false);
  }, [page, searchParams]);
  console.log(fees);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">
              Danh sách các loại phí
            </h1>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button className="bg-slate-500 w-14 h-14 rounded-full">
                  <SquarePen className="w-8 h-8" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="!max-w-[800px] !h-fit flex !flex-col !justify-start">
                <AlertDialogCancel className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-xl !text-white">
                  X
                </AlertDialogCancel>
                <FormFee setFees={setFees} limit={limit} page={page} />
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <Card
            x-chunk="dashboard-06-chunk-0"
            className="min-h-[600px] flex flex-col justify-between"
          >
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>STT</TableHead>
                    <TableHead>Loại phí</TableHead>
                    <TableHead>Đơn vị</TableHead>
                    <TableHead>Giá/đơn vị</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fees?.data?.fees.map((fee: any, index: number) => (
                    <AlertDialog key={fee.id}>
                      <AlertDialogTrigger asChild>
                        <TableRow className="cursor-pointer">
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{fee.type}</TableCell>
                          <TableCell>{fee.description}</TableCell>
                          <TableCell>{`${fee.price}đ`}</TableCell>
                        </TableRow>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="!max-w-[800px] !h-fit flex !flex-col !justify-start">
                        <AlertDialogCancel className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-xl !text-white">
                          X
                        </AlertDialogCancel>
                        <FormFee
                          fee={fee}
                          setFees={setFees}
                          limit={limit}
                          page={page}
                        />
                      </AlertDialogContent>
                    </AlertDialog>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing{" "}
                <strong>
                  {(page - 1) * limit + 1}-
                  {(page - 1) * limit + fees?.data?.fees.length}
                </strong>
                of <strong>{fees?.data?.count}</strong> fees
              </div>
            </CardFooter>
          </Card>
          <PaginationComponent
            totalPages={
              fees?.data?.count > 0 ? Math.ceil(fees?.data?.count / limit) : 1
            }
            className="mt-4"
            setPage={setPage}
          />
        </main>
      )}
    </>
  );
}