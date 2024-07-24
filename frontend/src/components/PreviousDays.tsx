import { useContext, useEffect, useState } from "react";
import moment from "moment";

import { AuthContext } from "@/contexts/AuthContext";
import { axiosInstance } from "@/services/axiosInstance";
import { PointType } from "@/types/PointType";
import { PointTypeEnum } from "@/utils/PointTypeEnum";

export function PreviousDays() {
  const { user } = useContext(AuthContext)!
  const [points, setPoints] = useState<PointType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPoints = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/points/${user?.id}`);
        const { points } = response.data
        setPoints(points)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getPoints();
  }, [user]);


  return (
    <div className="bg-[#0F172A] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-4">
        <div className="text-white font-bold">Dias anteriores</div>
        <div className="space-y-2">
          {loading ? (
            <p>carregando...</p>
          ) : (
            points.map((point) => (
              <div key={point.id} className="bg-gray-800 rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div className="text-gray-400 text-sm">{moment(point?.date).format('DD/MM/YYYY')}</div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-start">
                      {point.type === PointTypeEnum.ENTRY ? (
                          <span className="ml-2 text-green-500">Entrada</span>
                        ) : (
                          <span className="ml-2 text-red-500">Saída</span>
                        )}
                    </div>
                    <div className="text-white font-medium">{moment(point?.hour).format('HH:mm')}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}