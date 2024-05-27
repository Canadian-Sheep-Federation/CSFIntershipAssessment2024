"use client";
import { Input } from "@/components/ui/input";
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import axios from "axios";
import { useState, useEffect } from "react";

interface Team {
  id: number;
  conference: string;
  division: string;
  city: string;
  name: string;
  full_name: string;
  abbreviation: string;
}

export default function TeamsSection() {
  const [teams, setTeams] = useState<Team[]>([]);

  const getTeams = async () => {
    try {
      const response = await axios.get<Team[]>("http://localhost:3001/teams");
      setTeams(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <section className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Teams</h2>
        <Input className="mb-4" placeholder="Search teams..." type="search" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <Card key={team.id}>
              <CardHeader>
                <CardTitle>{team.full_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mt-4">
                  <p>Conference: {team.conference}</p>
                  <p>Division: {team.division}</p>
                  <p>City: {team.city}</p>
                  <p>Abbreviation: {team.abbreviation}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}