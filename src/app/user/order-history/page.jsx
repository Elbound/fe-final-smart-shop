'use client';

const mockOrders = [
  {
    orderId: 'ORD001',
    date: '2025-07-15',
    products: [
      {
        id: 'p1',
        name: 'Wireless Headphones',
        image: '/images/headphones.png',
        quantity: 1,
        price: 150,
      },
    ],
  },
  {
    orderId: 'ORD002',
    date: '2025-07-10',
    products: [
      {
        id: 'p2',
        name: 'Smart Watch',
        image: '/images/watch.png',
        quantity: 2,
        price: 90,
      },
      {
        id: 'p3',
        name: 'Bluetooth Speaker',
        image: '/images/speaker.png',
        quantity: 1,
        price: 120,
      },
    ],
  },
];

export default function OrderHistoryPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-4">Order History</h1>
      {mockOrders.map((order) => {
        const totalOrderPrice = order.products.reduce(
          (sum, p) => sum + p.price * p.quantity,
          0
        );

        return (
          <div key={order.orderId} className="mb-6 border rounded-md p-4 bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">
              Order #{order.orderId} - <span className="font-normal">{order.date}</span>
            </h2>
            <div className="space-y-2">
              {order.products.map((p) => (
                <div key={p.id} className="flex items-center border rounded p-2 bg-white">
                  <img src={p.image} alt={p.name} className="w-12 h-12 object-contain" />
                  <div className="ml-4 flex-1">
                    <p className="font-medium">{p.name}</p>
                    <p>Quantity: {p.quantity}</p>
                    <p>Total: ${p.quantity * p.price}</p>
                  </div>
                </div>
              ))}
              <div className="text-right mt-2 font-semibold">
                Order Total: ${totalOrderPrice}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}