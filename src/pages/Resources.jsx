import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import SEOMetadata from '../components/SEOMetadata';
import { Search, Filter, BookOpen, FileText, Lightbulb, Download, Calendar, Clock, Tag, ArrowRight } from 'lucide-react';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');

  const categories = ['All', 'Blog Post', 'Whitepaper', 'Case Study', 'Guide', 'Research Report', 'Thought Leadership'];
  const topics = ['All', 'AI Implementation', 'Security & Compliance', 'Business Transformation', 'ROI & Metrics', 'Training & Enablement', 'Industry Insights'];

  useEffect(() => {
    loadResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [resources, searchQuery, selectedCategory, selectedTopic]);

  const loadResources = async () => {
    try {
      const data = await base44.entities.Resource.filter({ status: 'Published' }, '-publishedDate');
      setResources(data);
      setFilteredResources(data);
    } catch (error) {
      console.error('Failed to load resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterResources = () => {
    let filtered = resources;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(r => r.category === selectedCategory);
    }

    if (selectedTopic !== 'All') {
      filtered = filtered.filter(r => r.topics?.includes(selectedTopic));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(query) ||
        r.summary.toLowerCase().includes(query) ||
        r.topics?.some(t => t.toLowerCase().includes(query))
      );
    }

    setFilteredResources(filtered);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Whitepaper': return <FileText className="w-5 h-5" />;
      case 'Guide': return <BookOpen className="w-5 h-5" />;
      case 'Thought Leadership': return <Lightbulb className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const featuredResource = resources.find(r => r.featured);

  return (
    <div className="min-h-screen bg-void text-signal-white">
      <SEOMetadata 
        pageName="Resources" 
        content="AI implementation insights, whitepapers, guides, and thought leadership. Learn about security-first AI, ROI metrics, team enablement, and business transformation strategies."
      />

      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-int-navy/20 via-transparent to-int-orange/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-int-navy via-int-teal to-int-orange bg-clip-text text-transparent">
            Resources & Insights
          </h1>
          <p className="text-xl text-signal-white/90">
            Practical guidance on AI implementation, security, and business transformation
          </p>
        </div>
      </section>

      {/* Featured Resource */}
      {featuredResource && (
        <section className="py-12 px-6 bg-carbon-night">
          <div className="max-w-6xl mx-auto">
            <div className="p-8 bg-gradient-to-br from-int-orange/10 to-int-navy/10 border border-int-orange/30 rounded-2xl">
              <div className="inline-block px-3 py-1 bg-int-orange/20 border border-int-orange/30 rounded-full text-sm font-semibold text-int-orange mb-4">
                Featured Resource
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  {featuredResource.coverImageUrl && (
                    <img 
                      src={featuredResource.coverImageUrl} 
                      alt={featuredResource.title}
                      className="w-full h-64 object-cover rounded-xl mb-4"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    {getCategoryIcon(featuredResource.category)}
                    <span className="text-sm font-semibold text-int-orange">{featuredResource.category}</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{featuredResource.title}</h2>
                  <p className="text-signal-white/80 mb-6">{featuredResource.summary}</p>
                  <div className="flex items-center gap-4 mb-6 text-sm text-signal-white/60">
                    {featuredResource.readTimeMinutes && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredResource.readTimeMinutes} min read
                      </div>
                    )}
                    {featuredResource.publishedDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredResource.publishedDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <Link
                    to={createPageUrl(`ResourceView?id=${featuredResource.id}`)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all w-fit"
                  >
                    {featuredResource.isGated ? 'Download Now' : 'Read More'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search & Filters */}
      <section className="py-12 px-6 bg-void">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-signal-white/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources by title, topic, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-carbon-night border border-slate-700 rounded-lg text-signal-white placeholder-signal-white/40 focus:outline-none focus:border-int-orange transition-colors"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-signal-white/80">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-carbon-night border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange transition-colors"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-signal-white/80">Topic</label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="px-4 py-2 bg-carbon-night border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange transition-colors"
                >
                  {topics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-signal-white/60">
            Showing {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
          </div>

          {/* Resources Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-int-orange border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-signal-white/60">Loading resources...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-signal-white/40 mx-auto mb-4" />
              <p className="text-xl text-signal-white/60">No resources found matching your criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedTopic('All');
                }}
                className="mt-4 px-6 py-2 bg-int-orange/20 border border-int-orange/30 rounded-lg font-semibold hover:bg-int-orange/30 transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Link
                  key={resource.id}
                  to={createPageUrl(`ResourceView?id=${resource.id}`)}
                  className="p-6 bg-carbon-night rounded-xl border border-slate-700 hover:border-int-orange/50 transition-all group"
                >
                  {resource.coverImageUrl && (
                    <img 
                      src={resource.coverImageUrl} 
                      alt={resource.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    {getCategoryIcon(resource.category)}
                    <span className="text-xs font-semibold text-int-orange">{resource.category}</span>
                    {resource.isGated && (
                      <span className="ml-auto px-2 py-1 bg-int-navy/20 border border-int-navy/30 rounded text-xs text-int-navy">
                        <Download className="w-3 h-3 inline mr-1" />
                        Gated
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-int-orange transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-signal-white/70 mb-4 line-clamp-3">
                    {resource.summary}
                  </p>
                  {resource.topics && resource.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.topics.slice(0, 3).map((topic, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-800 rounded text-xs text-signal-white/60">
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-xs text-signal-white/50">
                    {resource.readTimeMinutes && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {resource.readTimeMinutes} min
                      </div>
                    )}
                    {resource.publishedDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(resource.publishedDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-int-navy/20 to-int-orange/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need Custom AI Guidance?</h2>
          <p className="text-xl text-signal-white/80 mb-8">
            Get personalized recommendations based on your specific business challenges
          </p>
          <Link
            to={createPageUrl('AIReadinessAssessment')}
            className="inline-block px-8 py-4 bg-gradient-to-r from-int-orange to-int-navy rounded-full font-semibold hover:shadow-glow transition-all"
          >
            Take Free AI Readiness Assessment
          </Link>
        </div>
      </section>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 30px rgba(242,101,34,0.6);
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}