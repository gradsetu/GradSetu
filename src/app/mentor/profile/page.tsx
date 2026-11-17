'use client';

import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { Check, User, DollarSign, BookOpen, Camera, Loader2 } from 'lucide-react';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';

export default function MentorProfilePage() {
  const { currentUser, mentors, updateMentorProfile } = useApp();

  const activeMentor = mentors.find(m => m.userId === currentUser?.id || m.id === 'mentor-ritik-sharma') || mentors[0];

  const [name, setName] = useState(activeMentor.name);
  const [bio, setBio] = useState(activeMentor.bio);
  const [price, setPrice] = useState(activeMentor.sessionPrice);
  const [branch, setBranch] = useState(activeMentor.branch);
  const [currentYear, setCurrentYear] = useState(activeMentor.currentYear);
  const [avatar, setAvatar] = useState(activeMentor.avatar);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [saved, setSaved] = useState(false);

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
        updateMentorProfile(activeMentor.id, { avatar: newUrl });
      } else {
        const localPreview = URL.createObjectURL(file);
        setAvatar(localPreview);
        updateMentorProfile(activeMentor.id, { avatar: localPreview });
      }
    } catch {
      const localPreview = URL.createObjectURL(file);
      setAvatar(localPreview);
      updateMentorProfile(activeMentor.id, { avatar: localPreview });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateMentorProfile(activeMentor.id, {
      name,
      bio,
      sessionPrice: Number(price),
      branch,
      currentYear,
      avatar,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="Mentor Profile" subtitle="Edit your public mentor biography, pricing and branch details" />

      <main className="p-6 max-w-4xl mx-auto w-full space-y-6">
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          {saved && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <Check size={16} />
              <span>Profile updated successfully!</span>
            </div>
          )}

          <div className="flex items-center gap-5 pb-6 border-b border-border">
            <div className="relative group">
              <img
                src={avatar}
                alt={name}
                className="w-20 h-20 rounded-full object-cover border-2 border-primary"
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
              <div className="flex items-center gap-1.5">
                <h2 className="text-xl font-bold text-text-primary">{name}</h2>
                <VerifiedBadge size={16} />
              </div>
              <p className="text-xs text-text-secondary">{activeMentor.collegeName} • {branch}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-block text-[11px] font-bold text-primary bg-primary-light px-2.5 py-0.5 rounded-full">
                  Fee: ₹{price} / 30 min
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

          <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-text-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">Session Price (₹ / 30 min)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-lg text-text-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">Branch / Specialization</label>
                <input
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-text-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">Current Academic Year</label>
                <input
                  type="text"
                  value={currentYear}
                  onChange={(e) => setCurrentYear(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-text-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">Mentor Biography</label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-text-primary"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-sm transition"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

