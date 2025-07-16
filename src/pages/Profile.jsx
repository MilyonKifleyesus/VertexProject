import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import {
  User,
  Mail,
  MapPin,
  Building2,
  Edit2,
  Save,
  X,
  Briefcase,
} from "lucide-react";

const Profile = () => {
  const { id } = useParams();
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    location: user?.location || "",
    bio: user?.bio || "",
    company: user?.company || "",
    skills: user?.skills?.join(", ") || "",
    experience: user?.experience || "",
  });

  // For now, we'll only show the current user's profile
  // In a real app, you'd fetch user data by ID
  const isOwnProfile = user?.id === id;

  const handleSubmit = (e) => {
    e.preventDefault();

    const updates = {
      name: formData.name,
      email: formData.email,
      location: formData.location,
      bio: formData.bio,
    };

    if (user?.role === "employer") {
      updates.company = formData.company;
    } else {
      updates.skills = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
      updates.experience = formData.experience;
    }

    updateProfile(updates);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      location: user?.location || "",
      bio: user?.bio || "",
      company: user?.company || "",
      skills: user?.skills?.join(", ") || "",
      experience: user?.experience || "",
    });
    setIsEditing(false);
  };

  if (!user || !isOwnProfile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Profile Not Found
        </h2>
        <p className="text-gray-600">
          The profile you're looking for doesn't exist or you don't have
          permission to view it.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <p className="text-blue-100 capitalize flex items-center space-x-1">
                  <Briefcase className="h-4 w-4" />
                  <span>
                    {user.role === "jobseeker" ? "Job Seeker" : "Employer"}
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2"
            >
              <Edit2 className="h-4 w-4" />
              <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., San Francisco, CA"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>

              {user.role === "employer" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>
              )}

              {user.role === "jobseeker" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skills
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., React, TypeScript, Node.js"
                      value={formData.skills}
                      onChange={(e) =>
                        setFormData({ ...formData, skills: e.target.value })
                      }
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Separate skills with commas
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 3+ years"
                      value={formData.experience}
                      onChange={(e) =>
                        setFormData({ ...formData, experience: e.target.value })
                      }
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-2 text-gray-600 mb-2">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <p className="text-gray-900">{user.email}</p>
                </div>

                <div>
                  <div className="flex items-center space-x-2 text-gray-600 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">Location</span>
                  </div>
                  <p className="text-gray-900">
                    {user.location || "Not specified"}
                  </p>
                </div>

                {user.role === "employer" && (
                  <div>
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <Building2 className="h-4 w-4" />
                      <span className="text-sm font-medium">Company</span>
                    </div>
                    <p className="text-gray-900">
                      {user.company || "Not specified"}
                    </p>
                  </div>
                )}

                {user.role === "jobseeker" && (
                  <div>
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <Briefcase className="h-4 w-4" />
                      <span className="text-sm font-medium">Experience</span>
                    </div>
                    <p className="text-gray-900">
                      {user.experience || "Not specified"}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">Bio</span>
                </div>
                <p className="text-gray-900">{user.bio || "Not specified"}</p>
              </div>

              {user.role === "jobseeker" && (
                <div className="mt-6">
                  <div className="flex items-center space-x-2 text-gray-600 mb-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Skills</span>
                  </div>
                  <p className="text-gray-900">
                    {user.skills?.join(", ") || "Not specified"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
