'use client'

import { BookOpen, Clock, User, ArrowRight, TrendingUp, Mail, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

const articles = [
  {
    id: 1,
    category: "Inside Kenya Spaces",
    title: "How Remote Teams Thrive in Eldoret's Tech Hub",
    excerpt: "Discover how Kenya's growing tech ecosystem is attracting remote workers and digital nomads to Eldoret's premium coworking spaces.",
    author: "Sarah Kamau",
    date: "November 1, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1626187777040-ffb7cb2c5450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3dvcmtpbmclMjBzcGFjZXxlbnwxfHx8fDE3NjIxNTc0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true,
    slug: "remote-teams-eldoret",
  },
  {
    id: 2,
    category: "Success Stories",
    title: "From Startup to Scale-up: Nairobi Entrepreneur's Journey at WorkNest",
    excerpt: "Meet John Ochieng, whose fintech startup grew from 2 to 25 employees in just 18 months, all from our flexible office spaces.",
    author: "David Omondi",
    date: "October 28, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1640109341881-1cd3eaf50909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYyMjMzNjI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: false,
    slug: "startup-to-scaleup",
  },
  {
    id: 3,
    category: "Design Inspirations",
    title: "Kenyan-Inspired Workspace Design: Blending Tradition with Modernity",
    excerpt: "How incorporating local art, natural materials, and cultural elements creates inspiring work environments.",
    author: "Grace Wanjiru",
    date: "October 25, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1692133226337-55e513450a32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwb2ZmaWNlJTIwcm9vbXxlbnwxfHx8fDE3NjIyMzM2Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: false,
    slug: "kenyan-design",
  },
  {
    id: 4,
    category: "Workstyle Tips",
    title: "Maximizing Productivity During Nairobi's Peak Traffic Hours",
    excerpt: "Smart strategies for remote workers to avoid commute stress and maintain work-life balance in Kenya's capital.",
    author: "Michael Otieno",
    date: "October 20, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1693902997450-7e912c0d3554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZW55YSUyMG5haXJvYmklMjBjaXR5c2NhcGV8ZW58MXx8fHwxNzYyMjMzNjMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: false,
    slug: "peak-traffic-productivity",
  },
  {
    id: 5,
    category: "Success Stories",
    title: "The Lawyer Who Found Professional Home in Coworking",
    excerpt: "Advocate Jane Muthoni shares how flexible workspace solutions helped her solo practice project credibility and attract premium clients.",
    author: "Jane Muthoni",
    date: "October 15, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1462826303086-329426d1aef5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwYm9hcmRyb29tfGVufDF8fHx8MTc2MjIzMzYyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    featured: false,
    slug: "lawyer-coworking",
  },
  {
    id: 6,
    category: "Inside Kenya Spaces",
    title: "Coffee Culture Meets Work Culture: Inside WorkNest's Restaurant",
    excerpt: "How our in-house café became the networking heart of Eldoret's business community.",
    author: "Sarah Kamau",
    date: "October 10, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1669131196140-49591336b13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXN0YXVyYW50JTIwY2FmZXxlbnwxfHx8fDE3NjIyMzM2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: false,
    slug: "coffee-culture",
  },
  {
    id: 7,
    category: "Workstyle Tips",
    title: "Building a Support Network in Kenya's Coworking Community",
    excerpt: "Practical tips for forming genuine professional relationships and collaborations at shared workspaces.",
    author: "David Omondi",
    date: "October 5, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1758518731572-7791381c5ce8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMG1lZXRpbmd8ZW58MXx8fHwxNzYyMTg4NzE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: false,
    slug: "support-network",
  },
  {
    id: 8,
    category: "Design Inspirations",
    title: "Biophilic Design: Why Plants Boost Productivity",
    excerpt: "The science behind incorporating nature into workspace design and its impact on focus and wellbeing.",
    author: "Grace Wanjiru",
    date: "September 30, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1640587662002-ae577f8f96dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBlc3ByZXNzbyUyMGN1cHxlbnwxfHx8fDE3NjIxOTQyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: false,
    slug: "biophilic-design",
  },
  {
    id: 9,
    category: "Inside Kenya Spaces",
    title: "Why International Companies Choose Eldoret for Regional Hubs",
    excerpt: "Exploring Kenya's emerging business landscape and why global firms are establishing presence in our coworking spaces.",
    author: "Michael Otieno",
    date: "September 25, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1716703435698-031227389c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB0ZWxlcGhvbmUlMjBib290aHxlbnwxfHx8fDE3NjIyMzM2Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: false,
    slug: "international-companies",
  },
];

const trendingPosts = [
  { title: "5 Networking Tips for Introverts", views: "2.3k" },
  { title: "Coworking vs Traditional Office: Cost Breakdown", views: "1.8k" },
  { title: "Best Lunch Spots Near WorkNest Eldoret", views: "1.5k" },
];

export function MagazineClient() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");
  
  const categories = ["All", "Inside Kenya Spaces", "Workstyle Tips", "Success Stories", "Design Inspirations"];

  // Update selected category from URL parameter
  useEffect(() => {
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const filteredArticles = selectedCategory === "All"
    ? articles
    : articles.filter((article) => article.category === selectedCategory);

  const featuredArticle = articles.find((article) => article.featured);
  const regularArticles = filteredArticles.filter((article) => !article.featured);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks for subscribing! Check your inbox for confirmation.");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-[#FFFFF0]" data-section="magazine">
      {/* Featured Article Hero */}
      {featuredArticle && (
        <section className="relative h-[600px] overflow-hidden" data-content="magazine">
          <div className="absolute inset-0">
            <img
              src={featuredArticle.image}
              alt={featuredArticle.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
          </div>
          <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-16">
            <div className="max-w-3xl text-white">
              <Badge className="bg-[#D4AF37] text-[#5C4033] mb-4 px-4 py-1 border-0">
                Featured Story
              </Badge>
              <Badge className="bg-white/20 backdrop-blur-sm text-white mb-4 ml-2 border-0">
                {featuredArticle.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{featuredArticle.title}</h1>
              <p className="text-xl mb-6 text-white/90">{featuredArticle.excerpt}</p>
              <div className="flex items-center gap-6 text-sm mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#D4AF37]" />
                  <span>{featuredArticle.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>{featuredArticle.readTime}</span>
                </div>
                <span className="text-white/70">{featuredArticle.date}</span>
              </div>
              <Button 
                className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]"
              >
                Read Full Story <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-6 bg-white sticky top-20 z-40 shadow-md border-b border-[#5C4033]/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl font-semibold text-[#5C4033]">Explore Stories</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={
                    selectedCategory === category
                      ? "bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]"
                      : "border-[#5C4033]/20 text-[#5C4033] hover:bg-[#D4AF37]/10"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Articles Grid */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-8">
                {regularArticles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all border border-[#5C4033]/10 group cursor-pointer"
                    data-content="magazine"
                  >
                    <div className="h-56 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="bg-[#D4AF37]/15 text-[#5C4033] border border-[#D4AF37]/30 mb-3">
                        {article.category}
                      </Badge>
                      <h3 className="text-xl font-semibold text-[#5C4033] mb-3 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-[#5C4033]/70 mb-4 line-clamp-3">{article.excerpt}</p>

                      <div className="flex items-center justify-between text-xs text-[#5C4033]/60 mb-4 pb-4 border-b border-[#5C4033]/10">
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3 text-[#D4AF37]" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-[#D4AF37]" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-xs text-[#5C4033]/50">{article.date}</p>
                        <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Load More */}
              <div className="mt-12 text-center">
                <Button 
                  variant="outline"
                  className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#5C4033]"
                >
                  Load More Stories
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-[#5C4033]" />
                  <h3 className="text-xl font-bold text-[#5C4033]">Weekly Stories</h3>
                </div>
                <p className="text-sm text-[#5C4033]/80 mb-4">
                  Get the best insights and stories delivered to your inbox every week.
                </p>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white border-[#5C4033]/20"
                    required
                  />
                  <Button 
                    type="submit"
                    className="w-full bg-[#5C4033] hover:bg-[#4A3329] text-white"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>

              {/* Trending Posts */}
              <div className="bg-white rounded-lg p-6 shadow-md border border-[#5C4033]/10">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-lg font-semibold text-[#5C4033]">Trending Now</h3>
                </div>
                <div className="space-y-4">
                  {trendingPosts.map((post, index) => (
                    <div key={index} className="pb-4 border-b border-[#5C4033]/10 last:border-0 last:pb-0 cursor-pointer group">
                      <p className="text-sm text-[#5C4033] mb-2 group-hover:text-[#D4AF37] transition-colors">
                        {post.title}
                      </p>
                      <p className="text-xs text-[#5C4033]/50">{post.views} views</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini Gallery */}
              <div className="bg-white rounded-lg p-6 shadow-md border border-[#5C4033]/10">
                <div className="flex items-center gap-3 mb-4">
                  <ImageIcon className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-lg font-semibold text-[#5C4033]">Our Spaces</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {articles.slice(0, 4).map((article) => (
                    <div key={article.id} className="aspect-square rounded-lg overflow-hidden cursor-pointer group">
                      <img
                        src={article.image}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
                <Link href="/gallery" passHref>
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  >
                    View Full Gallery <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contribute CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#5C4033] mb-4">Share Your Success Story</h2>
            <p className="text-xl text-[#5C4033]/70 mb-8 max-w-2xl mx-auto">
              Are you building something amazing from WorkNest? We'd love to feature your journey 
              and inspire the next generation of Kenyan entrepreneurs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]">
                Submit Your Story
              </Button>
              <Link href="/contact" passHref>
                <Button 
                  variant="outline"
                  className="border-[#5C4033] text-[#5C4033] hover:bg-[#5C4033] hover:text-white"
                >
                  Contact Editorial Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

