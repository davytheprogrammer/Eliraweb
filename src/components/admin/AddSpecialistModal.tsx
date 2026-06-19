// src/components/admin/AddSpecialistModal.tsx
'use client';

import React, { useState } from 'react';
import { X, Check, Loader2, Sparkles } from 'lucide-react';
import { addSpecialistSchema } from '@/lib/schemas/specialist';

interface SpecialistData {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  specialties: string[];
  yearsOfExperience: number;
  credentials: string;
  hospital: string;
  bio?: string;
  hourlyRate: number;
}

interface AddSpecialistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSpecialistAdded: (specialist: SpecialistData) => void;
}

export function AddSpecialistModal({ isOpen, onClose, onSpecialistAdded }: AddSpecialistModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    specialties: [] as string[],
    yearsOfExperience: 0,
    credentials: '',
    hospital: '',
    bio: '',
    hourlyRate: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    email: string;
    tempPassword: string;
  } | null>(null);

  if (!isOpen) return null;

  const specialtiesOptions = ['Gynecology', 'Fertility', 'Obstetrics', "Women's Health", 'Other'];

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : Number(value);
    setFormData((prev) => ({ ...prev, [name]: numValue }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const toggleSpecialty = (specialty: string) => {
    setFormData((prev) => {
      const current = prev.specialties;
      const next = current.includes(specialty)
        ? current.filter((s) => s !== specialty)
        : [...current, specialty];
      
      return { ...prev, specialties: next };
    });

    if (errors.specialties) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.specialties;
        return next;
      });
    }
  };

  const validateForm = (): boolean => {
    try {
      addSpecialistSchema.parse(formData);
      setErrors({});
      return true;
    } catch (err: any) {
      const formattedErrors: Record<string, string> = {};
      if (err.inner) {
        err.inner.forEach((zodError: any) => {
          if (zodError.path && zodError.path[0]) {
            formattedErrors[zodError.path[0]] = zodError.message;
          }
        });
      } else if (err.issues) {
        err.issues.forEach((issue: any) => {
          if (issue.path && issue.path[0]) {
            formattedErrors[issue.path[0]] = issue.message;
          }
        });
      }
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/specialists/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create specialist');
      }

      setSuccessData({
        email: data.email,
        tempPassword: data.tempPassword,
      });

      onSpecialistAdded(formData);
    } catch (err: any) {
      setSubmitError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      specialties: [],
      yearsOfExperience: 0,
      credentials: '',
      hospital: '',
      bio: '',
      hourlyRate: 0,
    });
    setErrors({});
    setSubmitError(null);
    setSuccessData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="text-purple-600 w-5 h-5" />
            Add New Specialist
          </h2>
          <button
            onClick={handleResetAndClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {successData ? (
            /* Success Screen */
            <div className="flex flex-col items-center text-center space-y-6 py-8 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Specialist Created!</h3>
                <p className="text-slate-500 mt-2 max-w-md">
                  Dr. {formData.firstName} {formData.lastName} has been added successfully. Credentials have been emailed to their address.
                </p>
              </div>

              <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-5 space-y-3 text-left">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <p className="text-slate-800 font-medium">{successData.email}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Temporary Password</label>
                  <p className="text-slate-800 font-mono text-lg font-bold bg-white border border-slate-200 px-3 py-1.5 rounded-lg w-fit select-all">
                    {successData.tempPassword}
                  </p>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-sm transition-colors w-full"
              >
                Close & Return
              </button>
            </div>
          ) : (
            /* Form Screen */
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
                  {submitError}
                </div>
              )}

              {/* Basic Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">First Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleTextChange}
                    className={`w-full px-4 py-2 border rounded-xl shadow-sm outline-none transition-all ${
                      errors.firstName ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100'
                    }`}
                    placeholder="Jane"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Last Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleTextChange}
                    className={`w-full px-4 py-2 border rounded-xl shadow-sm outline-none transition-all ${
                      errors.lastName ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100'
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleTextChange}
                    className={`w-full px-4 py-2 border rounded-xl shadow-sm outline-none transition-all ${
                      errors.email ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100'
                    }`}
                    placeholder="dr.jane.doe@hospital.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleTextChange}
                    className={`w-full px-4 py-2 border rounded-xl shadow-sm outline-none transition-all ${
                      errors.phoneNumber ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100'
                    }`}
                    placeholder="+254712345678"
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
                </div>
              </div>

              {/* Specialties Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Specialties <span className="text-red-500">*</span></label>
                <div className="flex flex-wrap gap-2">
                  {specialtiesOptions.map((specialty) => {
                    const isSelected = formData.specialties.includes(specialty);
                    return (
                      <button
                        type="button"
                        key={specialty}
                        onClick={() => toggleSpecialty(specialty)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                          isSelected
                            ? 'bg-purple-50 border-purple-300 text-purple-700 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {specialty}
                      </button>
                    );
                  })}
                </div>
                {errors.specialties && <p className="text-red-500 text-xs">{errors.specialties}</p>}
              </div>

              {/* Experience, Hospital, Rate Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Years of Experience */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Experience (Years) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience || ''}
                    onChange={handleNumberChange}
                    min="0"
                    className={`w-full px-4 py-2 border rounded-xl shadow-sm outline-none transition-all ${
                      errors.yearsOfExperience ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100'
                    }`}
                    placeholder="8"
                  />
                  {errors.yearsOfExperience && <p className="text-red-500 text-xs">{errors.yearsOfExperience}</p>}
                </div>

                {/* Hourly Rate */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Hourly Rate (KES) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate || ''}
                    onChange={handleNumberChange}
                    min="0"
                    className={`w-full px-4 py-2 border rounded-xl shadow-sm outline-none transition-all ${
                      errors.hourlyRate ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100'
                    }`}
                    placeholder="2500"
                  />
                  {errors.hourlyRate && <p className="text-red-500 text-xs">{errors.hourlyRate}</p>}
                </div>

                {/* Hospital / Clinic */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Hospital / Clinic <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleTextChange}
                    className={`w-full px-4 py-2 border rounded-xl shadow-sm outline-none transition-all ${
                      errors.hospital ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100'
                    }`}
                    placeholder="Nairobi Hospital"
                  />
                  {errors.hospital && <p className="text-red-500 text-xs">{errors.hospital}</p>}
                </div>
              </div>

              {/* Credentials / License */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Credentials / License <span className="text-red-500">*</span></label>
                <textarea
                  name="credentials"
                  value={formData.credentials}
                  onChange={handleTextChange}
                  rows={2}
                  className={`w-full px-4 py-2 border rounded-xl shadow-sm outline-none transition-all ${
                    errors.credentials ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100'
                  }`}
                  placeholder="OBGYN License #12345, Board Certified"
                />
                {errors.credentials && <p className="text-red-500 text-xs">{errors.credentials}</p>}
              </div>

              {/* Bio (Optional) */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Bio <span className="text-slate-400 font-normal">(Optional)</span></label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleTextChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl shadow-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                  placeholder="Experienced specialist..."
                />
              </div>

              {/* Footer Actions */}
              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 font-semibold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Specialist'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
