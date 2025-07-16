import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useJobs } from "../../contexts/JobContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import {
  MapPin,
  Clock,
  DollarSign,
  Building2,
  ArrowLeft,
  Send,
  CheckCircle,
  Users,
} from "lucide-react";

const ViewJob = () => {
  const { id } = useParams();
  const { getJobById, applyToJob, getApplicationsForJob } = useJobs();
  const { user } = useAuth();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
  });
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const job = id ? getJobById(id) : undefined;
  const applications = id ? getApplicationsForJob(id) : [];

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
        <p className="text-gray-600 mb-6">
          The job you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/jobs"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Browse All Jobs
        </Link>
      </div>
    );
  }

  const getJobTypeColor = (type) => {
    switch (type) {
      case "full-time":
        return "bg-green-100 text-green-800 border-green-200";
      case "part-time":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "contract":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "remote":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleApply = (e) => {
    e.preventDefault();
    if (user) {
      applyToJob(job.id, {
        name: user.name,
        email: user.email,
        coverLetter: applicationData.coverLetter,
      });
      setApplicationSubmitted(true);
      setShowApplicationForm(false);
    }
  };

  const isEmployer = user?.role === "employer";
  const isJobOwner = user?.id === job.employerId;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Link
        to="/jobs"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Jobs
      </Link>

      {/* Job Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {job.title}
            </h1>
            <div className="flex items-center text-gray-600 mb-4">
              <Building2 className="h-5 w-5 mr-2" />
              <span className="text-lg font-medium">{job.company}</span>
            </div>
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Posted {job.postedDate}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>{job.salary}</span>
              </div>
            </div>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium border ${getJobTypeColor(
              job.type
            )}`}
          >
            {job.type.charAt(0).toUpperCase() +
              job.type.slice(1).replace("-", " ")}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
          {!isEmployer && !applicationSubmitted && (
            <button
              onClick={() => setShowApplicationForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Apply Now</span>
            </button>
          )}

          {applicationSubmitted && (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Application Submitted</span>
            </div>
          )}

          {isJobOwner && (
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="h-4 w-4" />
              <span>
                {applications.length} application
                {applications.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Description */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Job Description
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Requirements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {job.requirements.map((req, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Applications (for job owners) */}
          {isJobOwner && applications.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Applications
              </h2>
              <div className="space-y-4">
                {applications.map((application) => (
                  <div
                    key={application.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {application.applicantName}
                        </h3>
                        <p className="text-gray-600">
                          {application.applicantEmail}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(application.appliedDate).toLocaleDateString()}
                      </span>
                    </div>
                    {application.coverLetter && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">
                          Cover Letter:
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {application.coverLetter}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              About {job.company}
            </h3>
            <p className="text-gray-600">
              Learn more about this company and their mission to create amazing
              products and experiences.
            </p>
          </div>

          {/* Job Stats */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Job Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Applications</span>
                <span className="font-medium">{applications.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Posted</span>
                <span className="font-medium">{job.postedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type</span>
                <span className="font-medium capitalize">
                  {job.type.replace("-", " ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Apply for {job.title}
            </h3>
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter (Optional)
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell the employer why you're interested in this position..."
                  value={applicationData.coverLetter}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      coverLetter: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewJob;
