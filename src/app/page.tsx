"use client";
import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">MLBB Drafting Simulator</h1>
          <p className="text-xl mb-8">
            Master your team composition strategy with our advanced drafting
            tool
          </p>
          <Button asChild>
            <a href="/draft">Start Drafting</a>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Real-time Draft Simulation
                </h3>
                <p>
                  Practice pick and ban phases with an intuitive interface for
                  both teams.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Hero Database</h3>
                <p>
                  Access comprehensive hero stats, abilities, and meta
                  information.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Team Analysis</h3>
                <p>
                  Get instant feedback on team composition balance and synergy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to Improve Your Drafting?
          </h2>
          <p className="text-xl text-white mb-8">
            Start creating and sharing your team compositions today
          </p>
          <Button asChild>
            <a href="/draft">Try It Now</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
