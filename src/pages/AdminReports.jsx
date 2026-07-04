import { useEffect, useState } from "react";

import { getSalesReport } from "../services/reportService";

const AdminReports = () => {
    const exportCSV = () => {

  if (!report || report.orders.length === 0) {

    alert("No data available");

    return;

  }

  const headers = [
    "Order ID",
    "Status",
    "Payment Status",
    "Total Amount"
  ];

  const rows = report.orders.map(order => [

    order.id,

    order.status,

    order.payment_status,

    order.total_amount

  ]);

  const csv = [

    headers.join(","),

    ...rows.map(row => row.join(","))

  ].join("\n");

  const blob = new Blob(

    [csv],

    { type: "text/csv;charset=utf-8;" }

  );

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = "sales_report.csv";

  link.click();

};

  const [report, setReport] = useState(null);

  const [loading, setLoading] = useState(true);



  const loadReport = async () => {

    try {

      const data = await getSalesReport();

      setReport(data);

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    loadReport();

  }, []);



  if (loading) {

    return (

      <div className="text-center mt-20 text-xl">

        Loading Report...

      </div>

    );

  }



  return (

    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">

        Sales Report

      </h1>


      {/* Summary */}


      <div className="grid md:grid-cols-2 gap-6 mb-8">


        <div className="bg-white shadow rounded-lg p-6">

          <h2 className="text-gray-500">

            Total Orders

          </h2>

          <p className="text-3xl font-bold">

            {report.total_orders}

          </p>

        </div>



        <div className="bg-white shadow rounded-lg p-6">

          <h2 className="text-gray-500">

            Total Revenue

          </h2>

          <p className="text-3xl font-bold text-green-600">

            Rs. {report.total_sales}

          </p>

        </div>

      </div>
      <div className="flex justify-end mb-4">

            <button
                onClick={exportCSV}
                  className="
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    px-5
                    py-2
                    rounded-lg
                    "
              >
                  Export CSV
              </button>
          </div>


      {/* Orders Table */}


      <div className="bg-white shadow rounded-lg p-6">

        <h2 className="text-2xl font-bold mb-4">

          Orders

        </h2>


        <div className="overflow-x-auto">

          <table className="w-full border">

            <thead>

              <tr className="bg-gray-100">

                <th className="border p-3">

                  Order ID

                </th>

                <th className="border p-3">

                  Status

                </th>

                <th className="border p-3">

                  Payment

                </th>

                <th className="border p-3">

                  Amount

                </th>

              </tr>

            </thead>

            <tbody>

              {report.orders.map((order) => (

                <tr key={order.id}>

                  <td className="border p-3">

                    {order.id}

                  </td>

                  <td className="border p-3">

                    {order.status}

                  </td>

                  <td className="border p-3">

                    {order.payment_status}

                  </td>

                  <td className="border p-3 font-semibold">

                    Rs. {order.total_amount}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default AdminReports;