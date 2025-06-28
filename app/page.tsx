"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import MainContentSection from "@/components/main-content-section"
import { useAuth } from "@/contexts/auth-context"

interface BlogPost {
  id: string
  title: string
  content: string
  image?: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  tags: string[]
  likes: number
  comments: number
  createdAt: string
  isLiked?: boolean
}

export default function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [mostLikedPosts, setMostLikedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const { incrementProfileLikes } = useAuth()

  useEffect(() => {
    fetchPosts()
    fetchMostLikedPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const mockPosts: BlogPost[] = Array.from({ length: 50 }, (_, i) => ({
        id: `post-${i + 1}`,
        title: `5 Reasons to Learn Frontend Development in 2025 Blog Post ${i + 1}`,
        content:
          "Frontend development is more than just building beautiful user interfaces — it's about crafting user experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for skilled frontend developers continues to rise.",
        image: "/image-5.png",
        author: {
          id: "author-1",
          name: "John Doe",
          avatar: "/image-6.png",
        },
        tags: ["Programming", "Frontend", "Coding"],
        likes: 20,
        comments: 20,
        createdAt: "2025-05-27T00:00:00Z",
        isLiked: false,
      }))
      setPosts(mockPosts)
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMostLikedPosts = async () => {
    try {
      const mockMostLiked: BlogPost[] = Array.from({ length: 3 }, (_, i) => ({
        id: `liked-${i + 1}`,
        title: "5 Reasons to Learn Frontend Development in 2025",
        content:
          "Frontend development is more than just building beautiful user interfaces — it's about crafting user experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for skilled frontend developers continues to rise.",
        author: {
          id: "author-1",
          name: "John Doe",
          avatar: "/image-6.png",
        },
        tags: ["Programming", "Frontend", "Coding"],
        likes: 20,
        comments: 20,
        createdAt: "2025-05-27T00:00:00Z",
        isLiked: false,
      }))

      setMostLikedPosts(mockMostLiked)
    } catch (error) {
      console.error("Error fetching most liked posts:", error)
    }
  }

  const handleLike = async (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )

    setMostLikedPosts(
      mostLikedPosts.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )

    incrementProfileLikes()
  }

  if (loading) {
    return (
      <div className="w-full relative bg-white min-h-screen">
        <Header />
        <div className="animate-pulse max-w-[1200px] mx-auto px-4 py-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:block w-full relative bg-white min-h-screen text-left text-sm text-[#9CA3AF] font-inter">
        <Header />
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <MainContentSection
            posts={posts}
            mostLikedPosts={mostLikedPosts}
            onLike={handleLike}
          />
        </div>
        {/* Footer */}
        <div className="bg-white border-[#E5E7EB] border-solid border-t-[1px] box-border w-full h-20 flex flex-col items-center justify-center p-2">
          <div className="relative tracking-[-0.03em] leading-7">
            © 2025 Web Programming Hack Blog All rights reserved.
          </div>
        </div>
      </div>
      {/* Mobile Layout */}
      <div className="block md:hidden w-full relative bg-white min-h-screen text-left text-sm text-[#9CA3AF] font-inter">
        <Header />
        <div className="max-w-full mx-auto px-2 py-4">
          <MainContentSection
            posts={posts}
            mostLikedPosts={mostLikedPosts}
            onLike={handleLike}
          />
        </div>
        {/* Footer */}
        <div className="bg-white border-[#E5E7EB] border-solid border-t-[1px] box-border w-full h-20 flex flex-col items-center justify-center p-2">
          <div className="relative tracking-[-0.03em] leading-7">
            © 2025 Web Programming Hack Blog All rights reserved.
          </div>
        </div>
      </div>
    </>
  )
}
