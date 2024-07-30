'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoadingClient() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 60000) // Redirect after 10 seconds if no response

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/background.png')] bg-bottom bg-repeat-x">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-adventure uppercase text-[#1E0018] mb-8">
        Creating Your Comic
      </h1>
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#BB1215]"></div>
    </div>
  )
}