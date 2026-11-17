'use client';

import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { User, Mail, Phone, MapPin, GraduationCap, Award, Check, Camera, Loader2 } from 'lucide-react';

export default function AspirantProfilePage() {
  const { aspirantProfile, updateAspirantProfile } = useApp();

  const [name, setName] = useState(aspirantProfile.name);
  const [city, setCity] = useState(aspirantProfile.city);
  const [score, setScore] = useState(aspirantProfile.academicScore);
  const [stream, setStream] = useState(aspirantProfile.stream);
  const [preferredCourse, setPreferredCourse] = useState(aspirantProfile.preferredCourse);
  const [targetYear, setTargetYear] = useState(aspirantProfile.targetAdmissionYear);
  const [avatar, setAvatar] = useState(aspirantProfile.avatar);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const res = await fetch('/api/upload-avatar', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const json = await res.json();
        const newUrl = json.data?.avatarUrl || URL.createObjectURL(file);
        setAvatar(newUrl);
        updateAspirantProfile({ avatar: newUrl });
      } else {
        const localPreview = URL.createObjectURL(file);
        setAvatar(localPreview);
        updateAspirantProfile({ avatar: localPreview });
      }
    } catch {
      const localPreview = URL.createObjectURL(file);
      setAvatar(localPreview);
      updateAspirantProfile({ avatar: localPreview });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAspirantProfile({
      name,
      city,
      academicScore: score,
      stream,
      preferredCourse,
      targetAdmissionYear: targetYear,
      avatar,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="My Profile" subtitle="Manage your educational profile and admission criteria" />

      <main className="p-6 max-w-4xl mx-auto w-full space-y-6">
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          {savedNotice && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <Check size={16} />
              <span>Profile details updated successfully!</span>
            </div>
          )}

          <div className="flex items-center gap-5 pb-6 border-b border-border">
            <div className="relative group">
              <img
                src={avatar}
                alt={name}
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-primary"
              />
              <label className="absolute inset-0 rounded-full bg-black/40 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer text-[10px] font-semibold">
                {uploadingAvatar ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <Camera size={16} className="mb-0.5" />
                    <span>Change</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleAvatarChange}
                  disabled={uploadingAvatar}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">{name}</h2>
              <p className="text-xs text-text-secondary">{aspirantProfile.email} • {aspirantProfile.phone}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-block text-[11px] font-semibold bg-primary-light text-primary px-2.5 py-0.5 rounded-full">
                  Class 12 Aspirant • Target {targetYear}
                </span>
                <label className="text-[11px] font-medium text-text-secondary hover:text-primary cursor-pointer underline">
                  Update photo
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleAvatarChange}
                    disabled={uploadingAvatar}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} className="pt-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">City / Location</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">Academic Stream</label>
                <input
                  type="text"
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">Class XII / Exam Score</label>
                <input
                  type="text"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">Preferred Field</label>
                <input
                  type="text"
                  value={preferredCourse}
                  onChange={(e) => setPreferredCourse(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">Target Year</label>
                <input
                  type="text"
                  value={targetYear}
                  onChange={(e) => setTargetYear(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-sm transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

