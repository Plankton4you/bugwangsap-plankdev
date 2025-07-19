"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function RatingPage() {
  const ratings = [
    { name: "Kyiami", message: "gacorr om", stars: 5 },
    { name: "VinnXploit", message: "minta api nya plank", stars: 5 },
    {
      name: "zenn",
      message: "buat apk bug brp bg plank?",
      stars: 5,
    },
    { name: "DennXploit", message: "jirr work anjing", stars: 5 },
    { name: "yami", message: "beuhh langsung c1 ga tuh🗿", stars: 5 },
    { name: "Nexxus OFFC", message: "ada kyami jrr", stars: 5 },
    { name: "jembut kamu", message: "anjayy", stars: 5 },
    { name: "Manz", message: "wuihh", stars: 5 },
    { name: "Rann", message: "gacorr plank", stars: 5 },
    { name: "YanzzHost", message: "Plank bales chat gua tai", stars: 5 },
    { name: "keyy offc", message: "bububb plank kapann mau buatin aku apk bugg😡😡", stars: 5 },
    { name: "Hend4you", message: "bagi sc bug gacor plank", stars: 5 },
    { name: "Loiss Dev", message: "jasa buat func bug brp plank?", stars: 5 },
    {
      name: "Garr",
      message: "banyak sepuh jir🗿",
      stars: 5,
    },
    { name: "Vanzz", message: "plank anjeng, file file gua ilang semua gara gara install script lu tai", stars: 5 },
    { name: "Fatz", message: "bg bales chat gw lah, mau up ransom ssr gw cok", stars: 5 },
    { name: "jeann", message: "ohh exploit main bug juga ya", stars: 5 },
    { name: "Venuss", message: "gacorrrr cukk ada fitur ddos nya anying", stars: 5 },
    { name: "Ryan Host", message: "pen buat gini cmn msih bingung🗿", stars: 5 },
    { name: "Sanzz", message: "inpo yg bisa unband manen cok", stars: 5 },
    { name: "Kevinn", message: "jirr", stars: 5 },
    { name: "rell", message: "geloo", stars: 5 },
    { name: "Justin", message: "🗿🗿🗿", stars: 5 },
    { name: "Origin Xdev", message: "yang punya nokos pm gua gong : 089518264432", stars: 5 },
    { name: "raa offc", message: "bang plank jasa create sc brp", stars: 5 },
    { name: "Xenn", message: "plankdev sombong anj skrng", stars: 5 },
    { name: "KyyXploit", message: "katanya udah gamau main bug lagi🤭", stars: 5 },
    { name: "Foxx", message: "bang marga lu manaa, msukin gua bg", stars: 5 },
    { name: "IMGN Rayy", message: "gacorr plank", stars: 5 },
    { name: "Naww CRASH", message: "kenapa ga lu jual aja plank", stars: 5 },
  ]

  const renderStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)
  }

  return (
    <div className="min-h-screen p-4">
      <Card className="max-w-6xl mx-auto bg-black/90 border-green-400 text-green-400">
        <CardHeader>
          <CardTitle className="text-center text-3xl">⭐ USER RATINGS & REVIEWS</CardTitle>
          <p className="text-center text-green-300">What our users say about PlankXploit</p>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ratings.map((rating, index) => (
              <Card key={index} className="bg-black/50 border-green-400">
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">{renderStars(rating.stars)}</div>
                    <span className="text-green-400 font-bold">{rating.stars}/5</span>
                  </div>

                  <h4 className="text-green-400 font-bold mb-2">{rating.name}</h4>
                  <p className="text-green-300 text-sm">{rating.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="text-2xl text-green-400 font-bold mb-2">Average Rating: 5.0/5.0</div>
            <div className="flex justify-center mb-2">{renderStars(5)}</div>
            <p className="text-green-300">Based on {ratings.length} verified reviews</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
