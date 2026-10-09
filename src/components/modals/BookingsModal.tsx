"use client";

import { useState } from "react";
import {
  X,
  Upload,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Loader2,
  Calendar,
  FileText,
} from "lucide-react";
import { useGetMyVerification } from "@/src/feature/verification/api/verification-me";
import { useVerifyIdentity } from "@/src/feature/verification/api/verification";
import { useSubmitApplication } from "@/src/feature/application/application";


interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
  propertyId: string;
  roomNumber?: string;
  baseRent?: string | number;
}

export default function BookingModal({
  isOpen,
  onClose,
  roomId,
  propertyId,
  roomNumber,
  baseRent,
}: BookingModalProps) {
  // 1. Fetch Identity Verification Status
  const { data: verificationResponse, isLoading: isCheckingAuth } =
    useGetMyVerification();
  const verifyMutation = useVerifyIdentity();
  const applicationMutation = useSubmitApplication();

  // NID State
  const [nidFront, setNidFront] = useState<File | null>(null);
  const [nidBack, setNidBack] = useState<File | null>(null);

  // Application Form State
  const [moveInDate, setMoveInDate] = useState("");
  const [note, setNote] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  // Extract Status from API response
  const verification = verificationResponse?.data;
  const status = verification?.status; // 'APPROVED' | 'PENDING' | 'REJECTED' or undefined

  // Handle NID Submission
  const handleNidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nidFront || !nidBack) {
      setFormError("Please upload both front and back sides of your NID.");
      return;
    }

    setFormError("");
    const formData = new FormData();
    formData.append("nidFront", nidFront);
    formData.append("nidBack", nidBack);

    try {
      await verifyMutation.mutateAsync(formData);
      setSuccessMessage("NID uploaded successfully! Awaiting verification approval.");
    } catch (err: any) {
      setFormError(
        err?.data?.message || "Failed to submit verification request."
      );
    }
  };

  // Handle Room Application Submission
  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!moveInDate) {
      setFormError("Please select an expected move-in date.");
      return;
    }

    setFormError("");
    try {
      await applicationMutation.mutateAsync({
        roomId,
        propertyId,
        moveInDate,
        note,
      });
      setSuccessMessage("Booking application submitted successfully!");
      setTimeout(() => {
        onClose();
        setSuccessMessage("");
      }, 2000);
    } catch (err: any) {
      setFormError(
        err?.data?.message || "Failed to submit booking application."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-gray-900">
            Apply for Room {roomNumber ? `#${roomNumber}` : ""}
          </h2>
          {baseRent && (
            <p className="text-xs font-bold text-emerald-600 mt-1">
              Monthly Rent: ৳{baseRent} BDT
            </p>
          )}
        </div>

        {/* Alert Messages */}
        {formError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Loading State */}
        {isCheckingAuth ? (
          <div className="py-12 text-center text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-600 mb-2" />
            <p className="text-xs font-semibold">Checking verification status...</p>
          </div>
        ) : status === "PENDING" ? (
          /* Case 1: Verification Pending */
          <div className="text-center py-8 bg-amber-50 rounded-2xl border border-amber-200 p-6">
            <Clock className="w-12 h-12 text-amber-500 mx-auto mb-3 animate-pulse" />
            <h3 className="text-base font-bold text-amber-900 mb-1">
              Verification Pending
            </h3>
            <p className="text-xs text-amber-700">
              Your NID submission is under review. You can apply for room booking once your identity is approved.
            </p>
          </div>
        ) : status !== "APPROVED" ? (
          /* Case 2: Upload NID Form */
          <form onSubmit={handleNidSubmit} className="space-y-4">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-2xl text-xs text-blue-700 mb-2">
              <strong>Identity Verification Required:</strong> Please upload your NID images to proceed with room booking.
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
                NID Front Side
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNidFront(e.target.files?.[0] || null)}
                className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 border border-gray-200 rounded-xl p-1"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
                NID Back Side
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNidBack(e.target.files?.[0] || null)}
                className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 border border-gray-200 rounded-xl p-1"
              />
            </div>

            <button
              type="submit"
              disabled={verifyMutation.isPending}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {verifyMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Submit NID Verification
                </>
              )}
            </button>
          </form>
        ) : (
          /* Case 3: Booking Form (When APPROVED) */
          <form onSubmit={handleApplicationSubmit} className="space-y-4">
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl text-xs text-emerald-800 flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Identity Verified (NID Status: Approved)</span>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5 items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                Expected Move-in Date
              </label>
              <input
                type="date"
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5 items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                Note to Landlord (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Write a message or mention any special requirements..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={applicationMutation.isPending}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {applicationMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                "Confirm & Submit Application"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}