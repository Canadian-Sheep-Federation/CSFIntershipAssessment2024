"use client"

import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import axios from 'axios';

const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  favoriteTeams: z.string().min(1, "Please select at least one team."),
  favoritePlayer: z.string().min(1, "Please select a player."),
  comments: z.string().optional(),
});

export default function FormSection() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [teams, setTeams] = useState<{ label: string, value: string, conference: string, division: string }[]>([]);
  const [players, setPlayers] = useState<{ label: string, value: string }[]>([]);

  useEffect(() => {
    const fetchTeamsAndPlayers = async () => {
      try {
        const teamsResponse = await fetch('http://localhost:3001/teams');
        if (!teamsResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const teamsData = await teamsResponse.json().then(data => data.data);
        const teamOptions = teamsData.map((team: any) => ({
          label: team.full_name,
          value: team.id.toString(),
          conference: team.conference,
          division: team.division,
        }));
        setTeams(teamOptions);

        const playersResponse = await fetch('http://localhost:3001/players');
        if (!playersResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const playersData = await playersResponse.json();
        const playerOptions = playersData.data.map((player: any) => ({
          label: player.first_name + ' ' + player.last_name,
          value: player.id.toString()
        }));
        setPlayers(playerOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTeamsAndPlayers();
  }, []);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const selectedTeam = teams.find(team => team.value === data.favoriteTeams);
    const selectedPlayer = players.find(player => player.value === data.favoritePlayer);

    const formData = {
      ...data,
      favoriteTeams: selectedTeam ? selectedTeam.label : data.favoriteTeams,
      favoritePlayer: selectedPlayer ? selectedPlayer.label : data.favoritePlayer,
      favoriteTeamDetails: {
        teamId: parseInt(data.favoriteTeams),  // Assuming only one team is selected for simplicity
        teamName: selectedTeam?.label || '',
        conference: selectedTeam?.conference || '',
        division: selectedTeam?.division || '',
      }
    };

    try {
      const response = await axios.post('http://localhost:3001/basketball-forms', formData);
      if (response.status === 201) {
        alert('Form submitted successfully');
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input id="name" placeholder="Enter your name" {...field} className="bg-gray-200 text-black border border-gray-300 rounded-md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input id="email" placeholder="Enter your email" type="email" {...field} className="bg-gray-200 text-black border border-gray-300 rounded-md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="favoriteTeams"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Favorite Teams</FormLabel>
                <FormControl>
                  <select id="favoriteTeams" {...field} className="bg-gray-200 text-black border border-gray-300 rounded-md h-14">
                    <option value="">Select team</option>
                    {teams.map(team => (
                      <option key={team.value} value={team.value}>
                        {team.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="favoritePlayer"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Favorite Player</FormLabel>
                <FormControl>
                  <select id="favoritePlayer" {...field} className="bg-gray-200 text-black border border-gray-300 rounded-md h-14">
                    <option value="">Select player</option>
                    {players.map(player => (
                      <option key={player.value} value={player.value}>
                        {player.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Comments</FormLabel>
                <FormControl>
                  <Textarea id="comments" placeholder="Enter your comments" {...field} className="bg-gray-200 text-black border border-gray-300 rounded-md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-md">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
