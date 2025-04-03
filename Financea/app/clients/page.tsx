"use client";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { useState } from "react";
import { Globe, Mail, MapPin, Phone, User } from "lucide-react";

export default function NewClientForm() {
  const [country, setCountry] = useState("USA");

  return (
    <div className="flex justify-center items-center bg-gray-100 p-2 sm:p-4">
      <Card className="md:w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
          Welcome to the New Client Page
        </h2>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="client-name" className="mb-2 text-sm sm:text-lg">Client Name</Label>
            <div className="flex items-center gap-2 border rounded-md p-2">
              <User size={16} />
              <Input id="client-name" placeholder="Enter your client name" className="border-none w-full" />
            </div>
          </div>
          <div>
            <Label htmlFor="company-name" className="mb-2 text-sm sm:text-lg">Company Name</Label>
            <div className="flex items-center gap-2 border rounded-md p-2">
              <User size={16} />
              <Input id="company-name" placeholder="Enter your company name" className="border-none w-full" />
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="mb-2 text-sm sm:text-lg">Email Address</Label>
            <div className="flex items-center gap-2 border rounded-md p-2">
              <Mail size={16} />
              <Input id="email" placeholder="Enter your email" className="border-none w-full" />
            </div>
          </div>
          <div>
            <Label htmlFor="mobile" className="mb-2 text-sm sm:text-lg">Mobile Number</Label>
            <div className="flex items-center gap-2 border rounded-md p-2">
              <Phone size={16} />
              <Input id="mobile" placeholder="00000 00000" className="border-none w-full" />
            </div>
          </div>
          <div>
            <Label htmlFor="address" className="mb-2 text-sm sm:text-lg">Address</Label>
            <div className="flex items-center gap-2 border rounded-md p-2">
              <MapPin size={16} />
              <Input id="address" placeholder="Add client address" className="border-none w-full" />
            </div>
          </div>
          <div>
            <Label htmlFor="postal" className="mb-2 text-sm sm:text-lg">Postal Code</Label>
            <div className="flex items-center gap-2 border rounded-md p-2">
            <Input id="postal" placeholder="Enter your postal" className="border-none rounded-md p-2 w-full" />
            </div>
          </div>
          <div>
            <Label htmlFor="state" className="mb-2 text-sm sm:text-lg">State/Province</Label>
            <div className="flex items-center gap-2 border rounded-md p-2">
            <Input id="service-charge" placeholder="Enter your pricing" className="border-none rounded-md p-2 w-full" />
            </div>
          </div>
          <div>
            <Label htmlFor="country" className="mb-2 text-sm sm:text-lg">Country</Label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border rounded-md p-4 w-full"
            >
              <option value="USA">🇺🇸 USA</option>
              <option value="India">🇮🇳 India</option>
              <option value="UK">🇬🇧 UK</option>
            </select>
          </div>
          <div>
            <Label htmlFor="service-charge" className="mb-2 text-sm sm:text-lg">Service Charge</Label>
            <div className="flex items-center gap-2 border rounded-md p-2">
            <Input id="service-charge" placeholder="Enter your pricing" className="border-none rounded-md p-2 w-full" />
            </div>
          </div>
          <div>
            <Label htmlFor="website" className="mb-2 text-sm sm:text-lg">Website</Label>
            <div className="flex items-center gap-2 border rounded-md p-2">
              <Globe size={16} />
              <Input id="website" placeholder="Add client’s website" className="border-none w-full" />
            </div>
          </div>
        </CardContent>
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
          <Button variant="outline" className="w-full text-[#532B88] p-4 sm:w-auto text-lg border-[#532B88]">Cancel</Button>
          <Button className="bg-[#532B88] text-white p-4 w-full sm:w-auto text-lg">Save</Button>
        </div>
      </Card>
    </div>
  );
}