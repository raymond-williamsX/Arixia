"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Camera, CheckCircle2, Github, Search, Shield, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "AI Decision Engine",
    description: "Not just search. AI explains every recommendation.",
    icon: Sparkles
  },
  {
    title: "Image Search",
    description: "Upload a photo. Find matching products instantly.",
    icon: Camera
  },
  {
    title: "Buy with Confidence",
    description: "See prices, reviews, shipping, trust scores, and AI reasoning in one place.",
    icon: Shield
  }
];

const steps = ["Search or upload a product.", "AI researches the market.", "Receive a personalized recommendation."];

export function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white">
      <header className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <Sparkles className="h-5 w-5 text-blue-600" aria-hidden="true" />
            Arixia
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </header>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Badge variant="ai">AI Shopping Decision Agent</Badge>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-tight sm:text-6xl">
            Shop Smarter. Decide Faster.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            Arixia researches products across multiple marketplaces and recommends the best option with transparent AI
            reasoning.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/signup">
                Start Shopping
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/login">Watch Demo</Link>
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          aria-label="AI analyzing products across marketplaces"
        >
          <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-neutral-950">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Search className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-medium">Best wireless headphones under $150</p>
                <p className="text-sm text-neutral-500">Researching products...</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {["Reading reviews", "Comparing sellers", "Analyzing shipping"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-lg bg-neutral-50 p-3 dark:bg-neutral-900">
                  <span className="text-sm">{item}</span>
                  <CheckCircle2 className="h-4 w-4 text-green-600" aria-hidden="true" />
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-950 dark:bg-blue-950">
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-200">
                <Zap className="h-4 w-4" aria-hidden="true" />
                Best Value Recommendation
              </div>
              <p className="mt-2 text-sm leading-6 text-blue-900 dark:text-blue-100">
                Strong reviews, trusted seller, fair price, and faster shipping than cheaper alternatives.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
      <section className="border-y border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/40">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold">How It Works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step}>
              <CardContent className="pt-5">
                <p className="text-sm font-medium text-blue-600">Step {index + 1}</p>
                <p className="mt-3 text-lg font-semibold">{step}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="bg-neutral-950 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Ready to decide with confidence?</h2>
            <p className="mt-2 text-neutral-300">Create your account and prepare your shopping workspace.</p>
          </div>
          <Button asChild size="lg" variant="secondary">
            <Link href="/signup">Start Shopping</Link>
          </Button>
        </div>
      </section>
      <footer className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-neutral-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>Arixia</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/">Company</Link>
          <Link href="/">Privacy</Link>
          <Link href="/">Terms</Link>
          <Link href="/" className="inline-flex items-center gap-1">
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub
          </Link>
          <Link href="/">Contact</Link>
        </div>
      </footer>
    </main>
  );
}
