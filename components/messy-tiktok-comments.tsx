"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import localFont from 'next/font/local'

import { Cutive } from 'next/font/google'
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// Load the Benzin font
const benzin = localFont({
  // src: "../public/fonts/Benzin-Font/Benzin-Bold.ttf",
  src: "../public/fonts/JetBrainsMono-Bold.woff2",
  display: "swap",
  weight: "500",
  style: "normal",
  variable: "--font-benzin-bold",
})

const cutive = Cutive({
  subsets: ['latin'],
  weight: "400"
})

// Keep the styles constant, but remove the direct document manipulation
const styles = `
@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.animate-cursor {
  animation: blink 1s step-end infinite;
}
`

export function MessyTikTokComments() {
  const [comments, setComments] = useState<any[]>([])
  const [hoveredComment, setHoveredComment] = useState<number | null>(null)
  const [displayText, setDisplayText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>(0)
  const isNavigating = useRef(false)
  const router = useRouter()

  // Add typewriter effect
  useEffect(() => {
    const text = "COMING SOON"
    let currentIndex = 0
    let timeoutId: NodeJS.Timeout
    let initialDelayId: NodeJS.Timeout

    const typeWriter = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1))
        currentIndex++
        timeoutId = setTimeout(typeWriter, 200)
      } else {
        setIsTypingComplete(true)
      }
    }

    // Add initial delay before starting the typewriter effect
    initialDelayId = setTimeout(() => {
      timeoutId = setTimeout(typeWriter, 200)
    }, 1500)

    // Cleanup function
    return () => {
      clearTimeout(timeoutId)
      clearTimeout(initialDelayId)
      currentIndex = 0
      setDisplayText("")
      setIsTypingComplete(false)
    }
  }, [])

  // Initialize comments
  useEffect(() => {
    if (!containerRef.current) return

    const positions = [
      {
          "id": 1,
          "baseTop": 61.952882476204095,
          "baseLeft": 3.517460797171099
      },
      // {
      //     "id": 2,
      //     "baseTop": 61.681464514181286,
      //     "baseLeft": 28.020081318624527
      // },
      {
          "id": 3,
          "baseTop": 21.20840744125536,
          "baseLeft": 4.440443253838264
      },
      // {
      //     "id": 4,
      //     "baseTop": 69.11125431856479,
      //     "baseLeft": 8.059479767248467
      // },
      {
          "id": 5,
          "baseTop": 21.729117799645902,
          "baseLeft": 63.68895560699282
      },
      {
          "id": 6,
          "baseTop": 49.230822516254435,
          "baseLeft": 39.61969209728193
      },
      // {
      //     "id": 7,
      //     "baseTop": 23.200986680958184,
      //     "baseLeft": 42.29655430085085
      // },
      {
          "id": 8,
          "baseTop": 7.6907234644874745,
          "baseLeft": 89.71933621300253
      },
      // {
      //     "id": 9,
      //     "baseTop": 81.16047388918435,
      //     "baseLeft": 2.5121768469558092
      // },
      {
          "id": 10,
          "baseTop": 18.732848454233025,
          "baseLeft": 32.07587618978474
      },
      {
          "id": 11,
          "baseTop": 8.698072151930596,
          "baseLeft": 82.4262235329281
      },
      {
          "id": 12,
          "baseTop": 68.35028983763306,
          "baseLeft": 43.487869827970215
      },
      {
          "id": 13,
          "baseTop": 15.242334329440244,
          "baseLeft": 67.67299393211053
      },
      {
          "id": 14,
          "baseTop": 13.103617008068785,
          "baseLeft": 12.60834182268516
      },
      {
          "id": 15,
          "baseTop": 62.179431464154476,
          "baseLeft": 19.240885997656907
      },
      {
          "id": 16,
          "baseTop": 60.14743276421449,
          "baseLeft": 55.30997666554115
      },
      {
          "id": 17,
          "baseTop": 30.00661014991778,
          "baseLeft": 74.53207723124578
      },
      {
          "id": 18,
          "baseTop": 43.45690312538571,
          "baseLeft": 14.292744368946446
      },
      // {
      //     "id": 19,
      //     "baseTop": 85.96934722392886,
      //     "baseLeft": 4.090294441614426
      // },
      {
          "id": 20,
          "baseTop": 61.10974889625297,
          "baseLeft": 64.32490271292589
      },
      // {
      //     "id": 21,
      //     "baseTop": 23.67091562512695,
      //     "baseLeft": 80.72467650972388
      // },
      // {
      //     "id": 22,
      //     "baseTop": 42.542379112702875,
      //     "baseLeft": 41.83719717203538
      // },
      // {
      //     "id": 23,
      //     "baseTop": 36.21354967914725,
      //     "baseLeft": 40.86852011958241
      // },
      // {
      //     "id": 24,
      //     "baseTop": 71.89131189312036,
      //     "baseLeft": 78.24241044478967
      // },
      // {
      //     "id": 25,
      //     "baseTop": 32.93840669982363,
      //     "baseLeft": 37.15152567488898
      // },
      // {
      //     "id": 26,
      //     "baseTop": 44.318673165141014,
      //     "baseLeft": 53.433060301307854
      // },
      // {
      //     "id": 27,
      //     "baseTop": 81.92200384379258,
      //     "baseLeft": 0.44373385473816196
      // },
      // {
      //     "id": 28,
      //     "baseTop": 31.687355589635928,
      //     "baseLeft": 87.91315762007117
      // },
      // {
      //     "id": 29,
      //     "baseTop": 53.1072144972459,
      //     "baseLeft": 65.33394264521122
      // },
      // {
      //     "id": 30,
      //     "baseTop": 93.516487615928,
      //     "baseLeft": 36.36736784556029
      // },
      // {
      //     "id": 31,
      //     "baseTop": 73.92638776410533,
      //     "baseLeft": 47.236714601878994
      // },
      // {
      //     "id": 32,
      //     "baseTop": 54.755439425562315,
      //     "baseLeft": 80.55556245533127
      // },
      // {
      //     "id": 33,
      //     "baseTop": 32.642851012704284,
      //     "baseLeft": 86.45748649026253
      // },
      // {
      //     "id": 34,
      //     "baseTop": 64.16771507091366,
      //     "baseLeft": 0.2636030292804947
      // },
      // {
      //     "id": 35,
      //     "baseTop": 22.612987416426055,
      //     "baseLeft": 55.94768851610338
      // },
      // {
      //     "id": 36,
      //     "baseTop": 82.52218759220844,
      //     "baseLeft": 86.6324013450418
      // },
      // {
      //     "id": 37,
      //     "baseTop": 81.71516054283713,
      //     "baseLeft": 31.920724019839085
      // },
      // {
      //     "id": 38,
      //     "baseTop": 87.43455671985221,
      //     "baseLeft": 36.8204531843721
      // },
      // {
      //     "id": 39,
      //     "baseTop": 89.71740664804288,
      //     "baseLeft": 41.83615832971056
      // },
      // {
      //     "id": 40,
      //     "baseTop": 48.835723860795085,
      //     "baseLeft": 58.94307268690176
      // },
      // {
      //     "id": 41,
      //     "baseTop": 77.2424003287785,
      //     "baseLeft": 10.867792535718081
      // },
      // {
      //     "id": 42,
      //     "baseTop": 38.754225477351596,
      //     "baseLeft": 80.79485077225569
      // },
      // {
      //     "id": 43,
      //     "baseTop": 84.75836569918121,
      //     "baseLeft": 8.742154321825794
      // },
      // {
      //     "id": 44,
      //     "baseTop": 84.50587677570375,
      //     "baseLeft": 68.87378520388145
      // },
      // {
      //     "id": 45,
      //     "baseTop": 60.56032219367609,
      //     "baseLeft": 51.71177187677138
      // },
      // {
      //     "id": 46,
      //     "baseTop": 66.90937236388902,
      //     "baseLeft": 6.803922750227471
      // },
      // {
      //     "id": 47,
      //     "baseTop": 65.63187956671095,
      //     "baseLeft": 53.50641430961033
      // },
      // {
      //     "id": 48,
      //     "baseTop": 89.92971507082585,
      //     "baseLeft": 16.987202084405624
      // },
      // {
      //     "id": 49,
      //     "baseTop": 43.3780391463832,
      //     "baseLeft": 35.43652698140725
      // },
      // {
      //     "id": 50,
      //     "baseTop": 12.308461492706304,
      //     "baseLeft": 7.866671628068193
      // },
      // {
      //     "id": 51,
      //     "baseTop": 34.35117580237306,
      //     "baseLeft": 17.9200244448224
      // },
      // {
      //     "id": 52,
      //     "baseTop": 92.43591696201486,
      //     "baseLeft": 50.56039119766394
      // },
      // {
      //     "id": 53,
      //     "baseTop": 41.029333843817476,
      //     "baseLeft": 11.911737205628077
      // },
      // {
      //     "id": 54,
      //     "baseTop": 24.115245988902753,
      //     "baseLeft": 81.48698524883132
      // },
      // {
      //     "id": 55,
      //     "baseTop": 7.252986882948407,
      //     "baseLeft": 34.01752360524771
      // }
  ]

    // Create a mapping of actual position indices to B image numbers
    const activeIds = positions.map(pos => pos.id).sort((a, b) => a - b);
    const imageMapping = new Map(
      activeIds.map((id, index) => [id, ((index % 14) + 1)])
    );

    const newComments = positions.map(pos => ({
      id: pos.id,
      baseTop: pos.baseTop + 5,
      baseLeft: pos.baseLeft + 5,
      rotation: Math.random() * 20 - 10,
      scale: 1.5 + Math.random() * 0.4,
      speed: 0.0002 + Math.random() * 0.0003,
      amplitude: 1 + Math.random() * 2,
      offset: Math.random() * Math.PI * 2,
      // Use the mapping to assign image numbers sequentially
      imageNumber: pos.id === 20 ? 'highlight' : imageMapping.get(pos.id),
    }))

    setComments(newComments)
    // Set initial hover state to ID 20
    setTimeout(() => {
      setHoveredComment(20)
    }, 100)

    // Listen for navigation events
    document.addEventListener('beforeunload', () => {
      isNavigating.current = true
    })

    // Listen for clicks on navigation links
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      const navLink = target.closest('a')
      if (navLink?.href && navLink.href !== window.location.href) {
        isNavigating.current = true
      }
    })

    return () => {
      if (isNavigating.current) {
        setComments([])
      }
    }
  }, [])

  // Animation loop
  useEffect(() => {
    let startTime = Date.now()

    const animate = () => {
      if (isNavigating.current) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        return
      }

      const currentTime = Date.now()
      const elapsed = currentTime - startTime

      setComments(prevComments => 
        prevComments.map(comment => {
          if (hoveredComment === comment.id) return comment

          // Create floating motion using sin and cos
          const xOffset = Math.sin(elapsed * comment.speed + comment.offset) * comment.amplitude
          const yOffset = Math.cos(elapsed * comment.speed + comment.offset) * comment.amplitude

          return {
            ...comment,
            top: comment.baseTop + yOffset,
            left: comment.baseLeft + xOffset,
            rotation: 0 // Use static rotation only
          }
        })
      )

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [hoveredComment])

  // Add this useEffect to handle document manipulation
  useEffect(() => {
    const styleSheet = document.createElement("style")
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)

    return () => {
      styleSheet.remove()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-screen ${benzin.className}`}
      style={{
        backgroundColor: hoveredComment !== null ? '#EFEFEF' : 'white'
      }}
    >
      {/* Center title */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <h1 
          className="text-6xl md:text-6xl font-extrabold text-black text-center tracking-tighter font-benzin transition-opacity duration-300 relative"
          style={{
            opacity: hoveredComment !== null ? 0.2 : 0.7
          }}
        >
          {displayText}
          <span 
            className={`absolute -right-[0.15em] h-[1em] w-[0.05em] bg-black ${isTypingComplete ? 'animate-cursor' : ''}`}
            style={{
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
        </h1>
      </div>

      {/* Comments */}
      {comments.map((comment) => (
        <div
          key={comment.id}
          className={`absolute transition-all ${
            hoveredComment === comment.id ? "duration-300" : "duration-100"
          } cursor-pointer`}
          style={{
            top: `${comment.top}%`,
            left: `${comment.left}%`,
            transform: `rotate(${comment.rotation}deg) scale(${hoveredComment === comment.id ? comment.scale * 1.5 : comment.scale})`,
            zIndex: hoveredComment === comment.id ? 40 : 1,
          }}
          onMouseEnter={() => setHoveredComment(comment.id)}
          onMouseLeave={() => setHoveredComment(null)}
        >
          <div 
            className={`w-[280px] bg-black border border-gray-100 rounded-lg overflow-hidden shadow-lg transition-all ${
              hoveredComment === comment.id ? "duration-300" : "duration-100"
            }`}
            style={{
              filter: hoveredComment === comment.id 
                ? "brightness(1.2) contrast(1.1)" 
                : "brightness(0.94) grayscale(0.1)",
            }}
          >
            <Image
              src={`/images/tiktokImages/${comment.id === 20 ? 'highlight' : `B${comment.imageNumber}`}.png`}
              alt="TikTok comment"
              width={500}
              height={100}
              className="w-full h-auto"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
