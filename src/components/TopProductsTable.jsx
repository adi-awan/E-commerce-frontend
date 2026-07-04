const TopProductsTable = ({ products }) => {

  return (

    <div className="bg-white rounded-lg shadow p-6">

      <h2 className="text-2xl font-bold mb-5">
        Top Selling Products
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">
              Product
            </th>

            <th className="text-left py-3">
              Sold
            </th>

          </tr>

        </thead>

        <tbody>

          {products.map((item, index) => (

            <tr
              key={index}
              className="border-b"
            >

              <td className="py-3">
                {item.product}
              </td>

              <td className="py-3 font-bold">
                {item.sold}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default TopProductsTable;