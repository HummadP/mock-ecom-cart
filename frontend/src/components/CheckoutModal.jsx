import { useState } from "react";

export default function CheckoutModal({ isOpen, onClose, onConfirm }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Please fill all fields");

    const data = await onConfirm(form);
    if (data?.success) {
      setReceipt(data.receipt);
    } else {
      alert("Checkout failed. Please try again.");
    }
  };

  const handleClose = () => {
    setForm({ name: "", email: "" });
    setReceipt(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 px-4">
      <div
        className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 
                      text-gray-900 dark:text-gray-100 rounded-2xl shadow-2xl p-6 w-full max-w-md 
                      transform transition-all scale-100"
      >
        {!receipt ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-700 dark:text-blue-400">
              Complete Your Checkout
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 
                             focus:ring-2 focus:ring-blue-600 outline-none bg-white dark:bg-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 
                             focus:ring-2 focus:ring-blue-600 outline-none bg-white dark:bg-gray-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 
                             dark:hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white 
                             font-medium transition-all"
                >
                  Confirm
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
              Checkout Successful!
            </h2>
            <p className="text-lg">
              Thank you, <span className="font-semibold">{receipt.name}</span>{" "}
              🎉
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-left space-y-1">
              <p>
                <strong>Email:</strong> {receipt.email}
              </p>
              <p>
                <strong>Total:</strong> ${receipt.total.toFixed(2)}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(receipt.timeStamp).toLocaleString()}
              </p>
            </div>

            <button
              onClick={handleClose}
              className="mt-3 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
