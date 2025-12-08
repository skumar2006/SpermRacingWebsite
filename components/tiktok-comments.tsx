"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"

type Comment = {
  id: number
  username: string
  handle: string
  avatar: string
  comment: string
  likes: number
  tag?: string
}

export function TikTokComments() {
  const [hoveredComment, setHoveredComment] = useState<number | null>(null)

  const comments: Comment[] = [
    {
      id: 1,
      username: "Sarah Johnson",
      handle: "@sarahjcreates",
      avatar: "/placeholder.svg?height=80&width=80",
      comment:
        "This video changed my perspective completely! The way you explained the concept made it so easy to understand. Can't wait for more content like this!",
      likes: 1452,
    },
    {
      id: 2,
      username: "Mike Chen",
      handle: "@miketech",
      avatar: "/placeholder.svg?height=80&width=80",
      comment:
        "I've been following your account for months and this is by far your best video. The editing is on point and the information is so valuable!",
      likes: 983,
      tag: "Top Fan",
    },
    {
      id: 3,
      username: "Leila Ahmed",
      handle: "@leilavibes",
      avatar: "/placeholder.svg?height=80&width=80",
      comment:
        "Just discovered your page through this video and I'm already obsessed! Instantly followed and can't wait to binge all your content.",
      likes: 756,
    },
    {
      id: 4,
      username: "Carlos Rodriguez",
      handle: "@carlosrtips",
      avatar: "/placeholder.svg?height=80&width=80",
      comment:
        "The way you break down complex topics into bite-sized pieces is incredible. This helped me understand something I've been struggling with for weeks!",
      likes: 1203,
      tag: "Creator",
    },
    {
      id: 5,
      username: "Emma Wilson",
      handle: "@emmawcreative",
      avatar: "/placeholder.svg?height=80&width=80",
      comment:
        "Your content is always so well-researched and presented. This video especially shows how much effort you put into your work. Truly inspiring!",
      likes: 892,
    },
    {
      id: 6,
      username: "Jamal Thompson",
      handle: "@jamalt",
      avatar: "/placeholder.svg?height=80&width=80",
      comment:
        "I've shared this with everyone I know! Your explanation made something that seemed complicated feel so accessible. You've gained a loyal follower!",
      likes: 1567,
      tag: "Trending",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="relative border rounded-lg p-6 transition-all duration-300 hover:shadow-lg"
          onMouseEnter={() => setHoveredComment(comment.id)}
          onMouseLeave={() => setHoveredComment(null)}
        >
          <div className="flex items-center mb-4">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={comment.avatar} alt={comment.username} />
              <AvatarFallback>{comment.username.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <div className="font-semibold">{comment.username}</div>
              <div className="text-sm text-muted-foreground">{comment.handle}</div>
            </div>
            {comment.tag && (
              <Badge variant="secondary" className="ml-auto">
                {comment.tag}
              </Badge>
            )}
          </div>

          <div
            className={`transition-opacity duration-300 ${hoveredComment === comment.id ? "opacity-100" : "opacity-0"}`}
          >
            <p className="text-sm mb-4">{comment.comment}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Heart className="h-4 w-4 mr-1" />
              <span>{comment.likes.toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

