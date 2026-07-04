import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Package,
  ShoppingBag,
  Wallet,
  BarChart3,
  Ticket,
  Boxes,
  Tags,
  MessageSquare,
  Truck,
  FileText,
  ChevronRight,
} from "lucide-react";
import NotificationBell from "../components/NotificationBell";
import {
  getStats,
  getRecentOrders,
  getLowStockProducts,
} from "../services/adminService";

const QUICK_ACTIONS = [
  { to: "/admin/products", label: "Products", icon: Package, color: "text-blue-600 bg-blue-50" },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag, color: "text-indigo-600 bg-indigo-50" },
  { to: "/admin/users", label: "Users", icon: Users, color: "text-emerald-600 bg-emerald-50" },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3, color: "text-purple-600 bg-purple-50" },
  { to: "/admin/coupons", label: "Coupons", icon: Ticket, color: "text-orange-600 bg-orange-50" },
  { to: "/admin/inventory", label: "Inventory", icon: Boxes, color: "text-amber-600 bg-amber-50" },
  { to: "/admin/categories", label: "Categories", icon: Tags, color: "text-pink-600 bg-pink-50" },
  { to: "/admin/reviews", label: "Reviews", icon: MessageSquare, color: "text-cyan-600 bg-cyan-50" },
  { to: "/admin/shipping", label: "Shipping", icon: Truck, color: "text-teal-600 bg-teal-50" },
  { to: "/admin/reports", label: "Reports", icon: FileText, color: "text-slate-600 bg-slate-100" },
];

const STAT_CARDS = [
  { key: "total_users", label: "Total Users", icon: Users, color: "text-blue-600 bg-blue-50", format: (v) => v ?? 0 },
  { key: "total_products", label: "Total Products", icon: Package, color: "text-purple-600 bg-purple-50", format: (v) => v ?? 0 },
  { key: "total_orders", label: "Total Orders", icon: ShoppingBag, color: "text-indigo-600 bg-indigo-50", format: (v) => v ?? 0 },
  { key: "total_revenue", label: "Total Revenue", icon: Wallet, color: "text-emerald-600 bg-emerald-50", format: (v) => `Rs. ${v ?? 0}`, valueClass: "text-emerald-600" },
];

const ORDER_STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  completed: "bg-emerald-100 text-emerald-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
      ORDER_STATUS_STYLES[status?.toLowerCase()] || "bg-gray-100 text-gray-700"
    }`}
  >
    {status || "Unknown"}
  </span>
);

const StockBadge = ({ stock }) => {
  const critical = stock <= 2;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
        critical ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${critical ? "bg-red-500" : "bg-amber-500"}`} />
      {stock} left
    </span>
  );
};

const TableSkeleton = ({ cols = 3, rows = 4 }) => (
  <tbody>
    {Array.from({ length: rows }).map((_, r) => (
      <tr key={r}>
        {Array.from({ length: cols }).map((_, c) => (
          <td key={c} className="p-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadDashboard = async () => {
    try {
      setError(false);
      const [statsData, ordersData, lowStockData] = await Promise.all([
        getStats(),
        getRecentOrders(),
        getLowStockProducts(),
      ]);

      setStats(statsData);
      setOrders(ordersData);
      setLowStock(lowStockData);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">
              Overview of your store's performance today.
            </p>
          </div>
          <NotificationBell />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-xl p-4 mb-8 flex items-center justify-between">
            Failed to load some dashboard data.
            <button
              onClick={loadDashboard}
              className="font-bold underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {STAT_CARDS.map(({ key, label, icon: Icon, color, format, valueClass }) => (
            <div
              key={key}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={20} />
              </div>
              <h2 className="text-slate-500 text-sm font-medium mt-4">{label}</h2>
              {loading ? (
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mt-2" />
              ) : (
                <p className={`text-3xl font-extrabold mt-1 text-slate-900 ${valueClass || ""}`}>
                  {format(stats[key])}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Manage Store</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {QUICK_ACTIONS.map(({ to, label, icon: Icon, color }) => (
              <Link
                key={to}
                to={to}
                className="group bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:border-orange-300 hover:shadow-md transition-all"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                  <Icon size={18} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-slate-800">{label}</span>
                  <ChevronRight
                    size={16}
                    className="text-gray-300 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
            <Link
              to="/admin/orders"
              className="text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              View all →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 text-left font-semibold text-slate-500">Order ID</th>
                  <th className="py-3 text-left font-semibold text-slate-500">Status</th>
                  <th className="py-3 text-right font-semibold text-slate-500">Amount</th>
                </tr>
              </thead>
              {loading ? (
                <TableSkeleton />
              ) : (
                <tbody className="divide-y divide-gray-100">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50">
                        <td className="py-3.5 font-medium text-slate-700">#{order.id}</td>
                        <td className="py-3.5">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="py-3.5 text-right font-semibold text-slate-900">
                          Rs. {order.total_amount}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-10 text-slate-400">
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900">Low Stock Products</h2>
            <Link
              to="/admin/inventory"
              className="text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              Manage inventory →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 text-left font-semibold text-slate-500">Product</th>
                  <th className="py-3 text-left font-semibold text-slate-500">Category</th>
                  <th className="py-3 text-right font-semibold text-slate-500">Stock</th>
                </tr>
              </thead>
              {loading ? (
                <TableSkeleton />
              ) : (
                <tbody className="divide-y divide-gray-100">
                  {lowStock.length > 0 ? (
                    lowStock.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50">
                        <td className="py-3.5 font-medium text-slate-700">{product.name}</td>
                        <td className="py-3.5 text-slate-500">{product.category}</td>
                        <td className="py-3.5 text-right">
                          <StockBadge stock={product.stock} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-10 text-slate-400">
                        No low stock products.
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;