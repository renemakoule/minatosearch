"use client"

import { Search, Menu, Grid, MessageSquare, TrendingUp, Heart, Play } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import LogoMinato from "./LogoMinato"
import CanvasCursor from "./CursorCanvas/canvas-cursor"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import React from "react"

interface SearchResult {
  id: number
  name: string
  price: number
}

export default function Component() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isVideoLoading, setIsVideoLoading] = useState(true)

  const productListRef = useRef<HTMLDivElement>(null)
  const videoSuggestionsRef = useRef<HTMLDivElement>(null)

  const mainVideo = {
    id: "main1",
    title: "Découvrez les dernières tendances en AI",
    thumbnail: "https://res.cloudinary.com/dqljfnmpk/video/upload/v1724933253/Download_11_xyj1eg.mp4",
    duration: "10:30"
  }

  const suggestedVideos = [
    { id: "sugg1", title: "Comment utiliser l'IA dans votre entreprise", thumbnail: "/placeholder.svg?height=120&width=180", duration: "5:15" },
    { id: "sugg2", title: "L'avenir de l'IA dans le commerce électronique", thumbnail: "/placeholder.svg?height=120&width=180", duration: "7:45" },
    { id: "sugg3", title: "IA et personnalisation : ce que vous devez savoir", thumbnail: "/placeholder.svg?height=120&width=180", duration: "6:20" },
    { id: "sugg4", title: "Les meilleures pratiques en IA pour 2024", thumbnail: "/placeholder.svg?height=120&width=180", duration: "8:00" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isSearching) {
      const timer = setTimeout(() => {
        setIsVideoLoading(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isSearching])

  const handleSearch = async (query: string) => {
    setIsSearching(true)
    setIsLoading(true)
    setIsVideoLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSearchResults([
      { id: 1, name: "Produit 1", price: 99.99 },
      { id: 2, name: "Produit 2", price: 149.99 },
      { id: 3, name: "Produit 3", price: 199.99 },
    ])
    setIsLoading(false)
    setIsVideoLoading(false)
  }
  const recentDesigns = [
    {  image: "/1.png", modifiedDays: 2 },
    {  image: "/2.png", modifiedDays: 3 },
    {  image: "/3.png", modifiedDays: 1 },
    {  image: "/4.png", modifiedDays: 4 },
]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchQuery)
  }
  const handleCategoryClick = (category: string) => {
    setSearchQuery(category);
    handleSearch(category);
  };

  function VideoSuggestions({ mainVideo, suggestedVideos, isLoading }: {
    mainVideo: any
    suggestedVideos: any[]
    isLoading: boolean
  }) {
    if (isLoading) {
      return (
        <div className="w-full space-y-4 animate-pulse">
          <Card className="bg-gray-800 rounded-md overflow-hidden">
            <CardContent className="p-0">
              <div className="w-full h-48 bg-gray-700"></div>
              <div className="p-3">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/4"></div>
              </div>
            </CardContent>
          </Card>

          <div className="flex overflow-x-auto space-x-4 pb-4 md:grid md:grid-cols-2 md:gap-4 md:space-x-0">
            {[1, 2, 3, 4].map((index) => (
              <Card key={index} className="bg-gray-800 rounded-md overflow-hidden flex-shrink-0 w-60 md:w-auto">
                <CardContent className="p-0">
                  <div className="w-full h-24 bg-gray-700"></div>
                  <div className="p-2">
                    <div className="h-3 bg-gray-700 rounded w-full mb-1"></div>
                    <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="w-full space-y-4">
        <Card className="bg-gray-800 rounded-md overflow-hidden">
          <CardContent className="p-0 relative">
            <img src={mainVideo.thumbnail} alt={mainVideo.title} className="w-full h-48 object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <Play className="w-12 h-12 text-white" />
            </div>
            <div className="p-3">
              <h3 className="text-base font-semibold text-white truncate">{mainVideo.title}</h3>
              <p className="text-xs text-gray-400">{mainVideo.duration}</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex overflow-x-auto space-x-4 pb-4 md:grid md:grid-cols-2 md:gap-4 md:space-x-0">
          {suggestedVideos.map((video) => (
            <Card key={video.id} className="bg-gray-800 rounded-md overflow-hidden flex-shrink-0 w-60 md:w-auto">
              <CardContent className="p-0 relative">
                <img src={video.thumbnail} alt={String(video.title)} className="w-full h-24 object-cover" />
                <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                  {String(video.duration)}
                </div>
              </CardContent>
              <div className="p-2">
                <p className="text-xs font-medium text-white line-clamp-2">{video.title}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  function SearchResultCard({ result }: { result: SearchResult }) {
    return (
      <div className="space-y-4 z-10">
        {recentDesigns.map((design, index) => (
      <Card key={index} className="bg-gray-800 rounded-md overflow-hidden w-full">
        <CardContent className="p-3">
          <div className="w-full h-32 bg-gray-700 rounded-md mb-3">
            <img src={design.image} alt={result.name} className="w-full h-full object-cover rounded-md" />
          </div>
          <h3 className="text-base font-semibold text-white truncate">{result.name}</h3>
          <p className="text-xs text-gray-50">Price: {result.price} €</p>
          <p className="text-xs text-gray-400">{design.modifiedDays} days ago</p>
        </CardContent>
        <CardFooter className="bg-gray-700 p-1.5 flex justify-between">
          <Button variant="ghost" size="sm" className="text-white hover:text-gray-200 text-xs px-1.5 py-1 z-10">
            <MessageSquare className="w-3 h-3 mr-1" />
            Chat
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:text-gray-200 text-xs px-1.5 py-1 z-10">
            <TrendingUp className="w-3 h-3 mr-1" />
            Track
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:text-gray-200 text-xs px-1.5 py-1 z-10">
            <Heart className="w-3 h-3 mr-1" />
            Fav
          </Button>
        </CardFooter>
      </Card>
      ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen font-sans">
      <CanvasCursor />
      <header
        className={`fixed top-0 left-0 right-0 transition-colors duration-300 ${
          isScrolled ? "bg-black" : "bg-transparent"
        } flex justify-between items-center p-4 shadow z-50`}
      >
        <div className="flex items-center space-x-2">
          <LogoMinato />
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex p-2 bg-zinc-800 rounded-full whatsapp-status-bar">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
            <span className="text-sm font-medium text-white">Login</span>
          </button>
        </div>
        <div className="absolute top-0 left-0 right-0 h-[2px] whatsapp-status-bar"></div>
      </header>
      <main className="flex flex-col items-center justify-center w-full space-y-8 mt-36 px-4">
        {!isSearching && (
          <>
            <div className="text-center space-y-2">
              <span className="px-3 py-1 bg-zinc-800 text-xs text-white rounded-full">
                AI product search
              </span>
              <h1 className="text-5xl font-bold max-w-4xl leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Find brands & products , faster and better with AI.
              </h1>
            </div>
            <div className="w-full max-w-2xl space-y-4">
              <form onSubmit={handleSubmit} className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder="Search for any product..."
                  className="w-full py-4 pl-14 pr-20 bg-zinc-900 rounded-full text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-zinc-700 text-sm text-white font-medium rounded-full whatsapp-status-bar"
                >
                  Search
                </button>
              </form>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => handleCategoryClick("Browse Categories")} className="flex items-center space-x-2 px-4 py-2 bg-zinc-800 rounded-md text-sm text-white font-medium z-10">
                  <Menu className="w-4 h-4" />
                  <span>Browse Categories</span>
                </button>
                <button onClick={() => handleCategoryClick("Builder")} className="flex items-center space-x-2 px-4 py-2 bg-zinc-800 rounded-md text-sm text-white font-medium z-10">
                  <Grid className="w-4 h-4" />
                  <span>Builder</span>
                </button>
                <button onClick={() => handleCategoryClick("Search Products")} className="flex items-center space-x-2 px-4 py-2 bg-zinc-800 rounded-md text-sm text-white font-medium z-10">
                  <Grid className="w-4 h-4" />
                  <span>Search Products</span>
                </button>
              </div>
            </div>
          </>
        )}
        {isSearching && (
          <div className="w-full max-w-7xl">
            <div className="flex flex-col md:flex-row gap-6">
              <aside className="w-full md:w-1/3 md:sticky md:top-[72px] md:self-start">
                <div ref={videoSuggestionsRef} className="md:max-h-[calc(100vh-100px)] md:overflow-y-auto">
                  <VideoSuggestions mainVideo={mainVideo} suggestedVideos={suggestedVideos} isLoading={isVideoLoading} />
                </div>
              </aside>
              <div className="w-full md:w-2/3">
                <div className="sticky top-[72px] z-40 py-4">
                  <h2 className="text-xl font-semibold mb-4">Search Results</h2>
                  <form onSubmit={handleSubmit} className="relative w-full mb-4">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleInputChange}
                      placeholder="Ask anything about the products..."
                      className="w-full py-4 pl-14 pr-20 bg-zinc-900 rounded-full text-white placeholder-zinc-400  focus:outline-none focus:ring-2 focus:ring-zinc-600"
                    />
                    <button
                      type="submit"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-zinc-700 text-sm text-white font-medium rounded-full whatsapp-status-bar"
                    >
                      Search
                    </button>
                  </form>
                </div>
                <div ref={productListRef} className="md:max-h-[calc(100vh-200px)] md:overflow-y-auto">
                  {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[1, 2, 3].map((item) => (
                        <Card key={item} className="bg-gray-800 animate-pulse">
                          <CardContent className="p-4">
                            <div className="w-full h-40 bg-gray-700 rounded-md mb-4"></div>
                            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.map((result: SearchResult) => (
                        <SearchResultCard key={result.id} result={result} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
