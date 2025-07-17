import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Search, Users, Building, CheckCircle, ArrowRight } from "lucide-react";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Vertex
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The premier job-matching platform connecting talented professionals
            with amazing opportunities. Whether you're hiring or job seeking,
            Vertex makes it simple.
          </p>

          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/jobs"
                className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Browse Jobs
              </Link>
            </div>
          ) : (
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Vertex?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform connects the right people with the right
              opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Smart Job Matching
              </h3>
              <p className="text-gray-600">
                Our intelligent system matches candidates with the most relevant
                opportunities
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quality Candidates
              </h3>
              <p className="text-gray-600">
                Access to a curated pool of skilled professionals across all
                industries
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Trusted Employers
              </h3>
              <p className="text-gray-600">
                Work with verified companies offering competitive packages and
                growth opportunities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                10,000+
              </div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                50,000+
              </div>
              <div className="text-gray-600">Registered Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                5,000+
              </div>
              <div className="text-gray-600">Companies</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
