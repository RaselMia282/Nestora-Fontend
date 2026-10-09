"use client";

import React, { useState } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitVerification: (formData: FormData) => Promise<void>;
  monthlyRent?: number;
  roomNumber?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onSubmitVerification,
  monthlyRent,
  roomNumber,
}) => {
  const [nidNumber, setNidNumber] = useState("");
  const [nidFront, setNidFront] = useState<File | null>(null);
  const [nidBack, setNidBack] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!nidNumber) {
      setErrorMessage("NID number is required");
      return;
    }

    if (!nidFront || !nidBack) {
      setErrorMessage("Please upload both front and back images of your NID");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("nidNumber", nidNumber);
      formData.append("nidFront", nidFront);
      formData.append("nidBack", nidBack);

      await onSubmitVerification(formData);
      onClose();
    } catch (err: any) {
      setErrorMessage(
        err?.message || "Failed to submit verification request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-slate-900">
          Apply for Room #{roomNumber || "101"}
        </h3>
        {monthlyRent && (
          <p className="mt-1 text-xs font-semibold text-emerald-600">
            Monthly Rent: ৳{monthlyRent} BDT
          </p>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
            ⚠️ {errorMessage}
          </div>
        )}

        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-3 text-xs text-blue-700">
          <span className="font-bold">Identity Verification Required:</span>{" "}
          Please provide your NID number and upload images to proceed with room booking.
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-left">
          {/* NID Number Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              NID Number
            </label>
            <input
              type="text"
              required
              placeholder="Enter your 10 to 20 digit NID number"
              value={nidNumber}
              onChange={(e) => setNidNumber(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none transition-all"
            />
          </div>

          {/* NID Front Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              NID Front Side
            </label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setNidFront(e.target.files?.[0] || null)}
              className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>

          {/* NID Back Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              NID Back Side
            </label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setNidBack(e.target.files?.[0] || null)}
              className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 py-3 text-xs font-semibold text-white shadow-md hover:bg-emerald-700 transition-all disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit NID Verification"}
          </button>
        </form>
      </div>
    </div>
  );
};


export default BookingModal;