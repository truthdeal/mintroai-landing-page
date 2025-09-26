"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Sparkles, Shield, Zap, Lock, Ban, Pause, Flame, Coins, TrendingUp, Bot, DollarSign, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type FeatureCategory = {
  title: string
  features: {
    name: string
    icon?: LucideIcon
  }[]
}

type FeaturePlan = {
  name: string
  description: string
  categories: FeatureCategory[]
  highlighted?: boolean
}

const tokenPlans: FeaturePlan[] = [
  {
    name: "Starter",
    description: "Perfect for testing",
    categories: [
      {
        title: "Testnet Deployment",
        features: [
          { name: "All Test Networks", icon: Zap },
          { name: "Unlimited Deployments" },
          { name: "Full Feature Testing" },
          { name: "No Cost Testing" }
        ]
      },
      {
        title: "Basic Features",
        features: [
          { name: "Token Creation", icon: Coins },
          { name: "Community Support" }
        ]
      }
    ]
  },
  {
    name: "Basic",
    description: "Essential token features",
    categories: [
      {
        title: "Basic Features",
        features: [
          { name: "Mintable", icon: Coins },
          { name: "Burnable", icon: Flame },
          { name: "Pausable", icon: Pause },
          { name: "Blacklist", icon: Ban }
        ]
      },
      {
        title: "Included",
        features: [
          { name: "Mainnet Deployment" },
          { name: "Email Support" }
        ]
      }
    ],
    highlighted: true
  },
  {
    name: "Premium",
    description: "Advanced trading controls",
    categories: [
      {
        title: "Basic Features",
        features: [
          { name: "Mintable", icon: Coins },
          { name: "Burnable", icon: Flame },
          { name: "Pausable", icon: Pause },
          { name: "Blacklist", icon: Ban }
        ]
      },
      {
        title: "Limits & Trading",
        features: [
          { name: "Max Transaction Limit", icon: TrendingUp },
          { name: "Transfer Tax (%)", icon: DollarSign }
        ]
      },
      {
        title: "Security",
        features: [
          { name: "Anti-bot Protection", icon: Bot }
        ]
      },
      {
        title: "Support",
        features: [
          { name: "Mainnet Deployment" },
          { name: "Email Support" },
          { name: "Priority Support", icon: Shield }
        ]
      }
    ]
  }
]

const vestingPlans: FeaturePlan[] = [
  {
    name: "Starter",
    description: "Test vesting contracts",
    categories: [
      {
        title: "Vesting Features",
        features: [
          { name: "Project Name Configuration" },
          { name: "Token Contract Address" },
          { name: "TGE Date & Time (UTC)" },
          { name: "TGE Release Percentage" },
          { name: "Total Vesting Amount" },
          { name: "Cliff Period (Months)", icon: Lock },
          { name: "Monthly/Daily Linear Vesting" }
        ]
      },
      {
        title: "Dashboard Access",
        features: [
          { name: "Vesting Admin Dashboard", icon: Shield },
          { name: "Claim Dashboard", icon: Zap },
        ]
      },
      {
        title: "Test Network Features",
        features: [
          { name: "All Test Networks" },
          { name: "Unlimited Recipients" },
          { name: "Bulk Import Recipients" },
          { name: "Community Support" }
        ]
      }
    ]
  },
  {
    name: "Premium",
    description: "Enterprise vesting solution",
    categories: [
      {
        title: "Vesting Features",
        features: [
          { name: "Project Name Configuration" },
          { name: "Token Contract Address" },
          { name: "TGE Date & Time (UTC)" },
          { name: "TGE Release Percentage" },
          { name: "Total Vesting Amount" },
          { name: "Cliff Period (Months)", icon: Lock },
          { name: "Monthly/Daily Linear Vesting" }
        ]
      },
      {
        title: "Dashboard Access",
        features: [
          { name: "Vesting Admin Dashboard", icon: Shield },
          { name: "Claim Dashboard", icon: Zap },
        ]
      },
      {
        title: "Premium Features",
        features: [
          { name: "Mainnet Deployment", icon: Coins },
          { name: "Unlimited Recipients" },
          { name: "Bulk Import Recipients" },
          { name: "Priority Support", icon: Shield }
        ]
      }
    ],
    highlighted: true
  }
]

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState<"token" | "vesting">("token")
  const plans = activeTab === "token" ? tokenPlans : vestingPlans

  return (
    <section id="token-features" className="py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-normal tracking-tighter mb-4">
            Token Features & Capabilities
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-normal tracking-wide mb-8">
            Choose the perfect plan with features that match your project needs
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl p-1">
            <button
              onClick={() => setActiveTab("token")}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                activeTab === "token"
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                  : "text-gray-400 hover:text-white"
              )}
            >
              Token Creator
            </button>
            <button
              onClick={() => setActiveTab("vesting")}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                activeTab === "vesting"
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                  : "text-gray-400 hover:text-white"
              )}
            >
              Vesting
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className={cn(
          "grid gap-6 mx-auto",
          activeTab === "token" 
            ? "grid-cols-1 md:grid-cols-3 max-w-6xl" 
            : "grid-cols-1 md:grid-cols-2 max-w-4xl"
        )}>
          {plans.map((plan, index) => (
            <motion.div
              key={`${activeTab}-${plan.name}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div
                className={cn(
                  "relative rounded-2xl border transition-all duration-300 min-h-[650px] flex flex-col",
                  plan.highlighted
                    ? "bg-gradient-to-b from-indigo-950/40 to-violet-950/40 border-violet-500/30 shadow-xl shadow-violet-500/10"
                    : "bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1]"
                )}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-2xl font-medium mb-3 text-white">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-400">{plan.description}</p>
                  </div>

                  <div className="space-y-6 flex-1">
                    {plan.categories.map((category, catIdx) => (
                      <div key={catIdx}>
                        <h4 className="text-sm font-medium text-gray-400 mb-3">{category.title}</h4>
                        <div className="space-y-2">
                          {category.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              {feature.icon ? (
                                <feature.icon className={cn(
                                  "w-5 h-5 flex-shrink-0",
                                  plan.highlighted ? "text-violet-400" : "text-gray-500"
                                )} />
                              ) : (
                                <Check className={cn(
                                  "w-5 h-5 flex-shrink-0",
                                  plan.highlighted ? "text-violet-400" : "text-gray-500"
                                )} />
                              )}
                              <span className="text-sm text-gray-300">{feature.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-400">
            Compare features across tiers to choose the right plan for your project needs.
          </p>
        </div>
      </div>
    </section>
  )
}
