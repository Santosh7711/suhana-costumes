import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package, ShoppingCart, BarChart3, Settings,
  Plus, Edit2, Trash2, ArrowLeft, TrendingUp,
  AlertTriangle, CheckCircle2
} from 'lucide-react';
import { sampleProducts, Product } from '@/lib/products';
import ScrollReveal from '@/components/ScrollReveal';

type Tab = 'overview' | 'products' | 'orders' | 'inventory';

interface Order {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  items: number;
}

const sampleOrders: Order[] = [
  { id: 'ORD-1247', customer: 'Meera Sharma', email: 'meera@email.com', total: 48500, status: 'processing', date: '2026-03-21', items: 1 },
  { id: 'ORD-1246', customer: 'Priya Patel', email: 'priya@email.com', total: 23100, status: 'shipped', date: '2026-03-20', items: 2 },
  { id: 'ORD-1245', customer: 'Ananya Desai', email: 'ananya@email.com', total: 9600, status: 'delivered', date: '2026-03-19', items: 1 },
  { id: 'ORD-1244', customer: 'Kavita Reddy', email: 'kavita@email.com', total: 12800, status: 'pending', date: '2026-03-19', items: 1 },
  { id: 'ORD-1243', customer: 'Divya Singh', email: 'divya@email.com', total: 4200, status: 'delivered', date: '2026-03-18', items: 1 },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [products] = useState<Product[]>(sampleProducts);

  const tabs = [
    { id: 'overview' as Tab, label: 'Overview', icon: BarChart3 },
    { id: 'products' as Tab, label: 'Products', icon: Package },
    { id: 'orders' as Tab, label: 'Orders', icon: ShoppingCart },
    { id: 'inventory' as Tab, label: 'Inventory', icon: Settings },
  ];

  const totalRevenue = sampleOrders.reduce((sum, o) => sum + o.total, 0);
  const lowStockProducts = products.filter((p) => p.stock < 15);

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <ArrowLeft size={16} />
              Store
            </Link>
            <span className="text-primary-foreground/30">|</span>
            <span className="font-display text-lg font-semibold">Admin Panel</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-semibold">
              SC
            </div>
          </div>
        </div>
      </header>

      <div className="pt-14 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 fixed left-0 top-14 bottom-0 bg-card border-r border-border p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors active:scale-[0.97] ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile tabs */}
        <div className="lg:hidden fixed top-14 left-0 right-0 z-40 bg-card border-b border-border px-4 py-2 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-sm text-xs whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 lg:ml-56 pt-12 lg:pt-0 px-6 lg:px-8 py-8">
          <div className="max-w-5xl">
            {/* Overview */}
            {activeTab === 'overview' && (
              <ScrollReveal>
                <div className="space-y-8">
                  <h2 className="font-display text-2xl font-semibold">Dashboard</h2>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: TrendingUp, change: '+12.3%' },
                      { label: 'Orders', value: sampleOrders.length.toString(), icon: ShoppingCart, change: '+4' },
                      { label: 'Products', value: products.length.toString(), icon: Package, change: '6 active' },
                      { label: 'Low Stock', value: lowStockProducts.length.toString(), icon: AlertTriangle, change: 'Needs attention' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-card border border-border rounded-sm p-5">
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</span>
                          <stat.icon size={16} className="text-muted-foreground" />
                        </div>
                        <p className="font-display text-2xl font-semibold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recent Orders */}
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-4">Recent Orders</h3>
                    <div className="bg-card border border-border rounded-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border bg-secondary/50">
                              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Order</th>
                              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Customer</th>
                              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Total</th>
                              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sampleOrders.slice(0, 3).map((order) => (
                              <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                                <td className="px-4 py-3 font-medium">{order.id}</td>
                                <td className="px-4 py-3 text-muted-foreground">{order.customer}</td>
                                <td className="px-4 py-3">₹{order.total.toLocaleString('en-IN')}</td>
                                <td className="px-4 py-3">
                                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-sm ${statusColors[order.status]}`}>
                                    {order.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Products */}
            {activeTab === 'products' && (
              <ScrollReveal>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-2xl font-semibold">Products</h2>
                    <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium rounded-sm hover:bg-accent transition-colors active:scale-[0.97]">
                      <Plus size={16} /> Add Product
                    </button>
                  </div>

                  <div className="bg-card border border-border rounded-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border bg-secondary/50">
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Product</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Category</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Price</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Stock</th>
                            <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr key={product.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <img src={product.image} alt={product.name} className="w-10 h-10 rounded-sm object-cover" />
                                  <span className="font-medium">{product.name}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">{product.category}</td>
                              <td className="px-4 py-3">₹{product.price.toLocaleString('en-IN')}</td>
                              <td className="px-4 py-3">
                                <span className={product.stock < 15 ? 'text-destructive font-medium' : ''}>
                                  {product.stock}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors active:scale-95">
                                    <Edit2 size={14} />
                                  </button>
                                  <button className="p-1.5 text-muted-foreground hover:text-destructive transition-colors active:scale-95">
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Orders */}
            {activeTab === 'orders' && (
              <ScrollReveal>
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-semibold">Orders</h2>

                  <div className="bg-card border border-border rounded-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border bg-secondary/50">
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Order</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Customer</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Date</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Items</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Total</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sampleOrders.map((order) => (
                            <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                              <td className="px-4 py-3 font-medium">{order.id}</td>
                              <td className="px-4 py-3">
                                <div>
                                  <p className="font-medium">{order.customer}</p>
                                  <p className="text-xs text-muted-foreground">{order.email}</p>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                              <td className="px-4 py-3">{order.items}</td>
                              <td className="px-4 py-3">₹{order.total.toLocaleString('en-IN')}</td>
                              <td className="px-4 py-3">
                                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-sm ${statusColors[order.status]}`}>
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Inventory */}
            {activeTab === 'inventory' && (
              <ScrollReveal>
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-semibold">Inventory</h2>

                  {lowStockProducts.length > 0 && (
                    <div className="bg-destructive/5 border border-destructive/20 rounded-sm p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={16} className="text-destructive" />
                        <span className="text-sm font-medium text-destructive">Low Stock Alert</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {lowStockProducts.length} product(s) running low on inventory.
                      </p>
                    </div>
                  )}

                  <div className="grid gap-4">
                    {products.map((product) => {
                      const stockPercent = Math.min((product.stock / 30) * 100, 100);
                      const isLow = product.stock < 15;
                      return (
                        <div key={product.id} className="bg-card border border-border rounded-sm p-4">
                          <div className="flex items-center gap-4">
                            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-sm object-cover" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-sm font-medium truncate">{product.name}</h4>
                                <div className="flex items-center gap-1.5">
                                  {isLow ? (
                                    <AlertTriangle size={12} className="text-destructive" />
                                  ) : (
                                    <CheckCircle2 size={12} className="text-green-600" />
                                  )}
                                  <span className={`text-sm font-medium ${isLow ? 'text-destructive' : 'text-foreground'}`}>
                                    {product.stock} units
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all ${isLow ? 'bg-destructive' : 'bg-accent'}`}
                                    style={{ width: `${stockPercent}%` }}
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                  {product.sizes.join(', ')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
