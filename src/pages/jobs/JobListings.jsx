import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useJobs } from "../../contexts/JobContext.jsx";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  Filter,
} from "lucide-react";

const JobListings = () => {
  const { jobs } = useJobs();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleSearch = () => {
    const results = jobs.filter((job) => {
      const matchesQuery =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation =
        !locationFilter ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesType = !typeFilter || job.type === typeFilter;

      return matchesQuery && matchesLocation && matchesType;
    });
    setFilteredJobs(results);
  };

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

  React.useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  React.useEffect(() => {
    handleSearch();
  }, [searchQuery, locationFilter, typeFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Listings</h1>
        <p className="text-gray-600">Find your next opportunity</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs, companies..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Location"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="remote">Remote</option>
            </select>
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Search
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-gray-600">
        {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <Link
                  to={`/job/${job.id}`}
                  className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {job.title}
                </Link>
                <div className="flex items-center text-gray-600 mt-2 mb-3">
                  <Building2 className="h-4 w-4 mr-1" />
                  <span className="font-medium">{job.company}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{job.postedDate}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{job.salary}</span>
                  </div>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getJobTypeColor(
                  job.type
                )}`}
              >
                {job.type.charAt(0).toUpperCase() +
                  job.type.slice(1).replace("-", " ")}
              </span>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {job.requirements.slice(0, 3).map((req, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm border border-gray-200"
                  >
                    {req}
                  </span>
                ))}
                {job.requirements.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm border border-gray-200">
                    +{job.requirements.length - 3} more
                  </span>
                )}
              </div>
              <Link
                to={`/job/${job.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No jobs found
          </h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default JobListings;
