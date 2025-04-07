"use client"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Label } from "@/Components/ui/label"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/redux/store"
import { setClientField, resetClient } from "@/lib/redux/Features/clientSlice"
import { useState } from "react"
import { Globe, Mail, MapPin, Phone, User, Loader2 } from "lucide-react"
import Swal from "sweetalert2";

export default function NewClientForm() {
  const dispatch = useDispatch()
  const client = useSelector((state: RootState) => state.client)
  const [loading, setLoading] = useState(false)
  const [country, setCountry] = useState(client.country)

  const handleChange = (field: string, value: string) => {
    dispatch(setClientField({ field: field as keyof typeof client, value }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client),
      })

      const data = await res.json()
      if (!res.ok) {
        if (data.issues) {
          const errors = Object.entries(data.issues)
            .map(([field, msg]) => `${field}: ${msg}`)
            .join("\n")
          alert(errors)
        } else {
          alert(data.error || "Something went wrong.")
        }
        return
      }

      dispatch(resetClient())
      Swal.fire({
        title: "Client Created Successfully!",
        icon: "success"
      });
    } catch (err) {
      console.error(err)
      alert("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center bg-gray-100 p-2 sm:p-4">
      <Card className="md:w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
          Welcome to the New Client Page
        </h2>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="client-name">Client Name</Label>
            <div className="flex items-center gap-2 border rounded-md p-2">
              <User size={16} />
              <Input
                id="client-name"
                placeholder="Enter your client name"
                className="border-none w-full outline-none"
                value={client.clientName}
                onChange={(e) => handleChange("clientName", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="company-name">Company Name</Label>
            <div className="flex items-center gap-2 border rounded-md p-2">
              <User size={16} />
              <Input
                id="company-name"
                placeholder="Enter your company name"
                className="border-none w-full outline-none"
                value={client.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="flex items-center gap-2 border rounded-md p-2">
              <Mail size={16} />
              <Input
                id="email"
                placeholder="Enter your email"
                className="border-none w-full"
                value={client.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="mobile">Mobile Number</Label>
            <div className="flex items-center gap-2 border rounded-md p-2">
              <Phone size={16} />
              <Input
                id="mobile"
                placeholder="00000 00000"
                className="border-none w-full"
                value={client.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <div className="flex items-center gap-2 border rounded-md p-2">
              <MapPin size={16} />
              <Input
                id="address"
                placeholder="Add client address"
                className="border-none w-full"
                value={client.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="postal">Postal Code</Label>
            <Input
              id="postal"
              placeholder="Enter your postal"
              className="border-none rounded-md p-2 w-full"
              value={client.postal}
              onChange={(e) => handleChange("postal", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="state">State/Province</Label>
            <Input
              id="state"
              placeholder="Enter your state"
              className="border-none rounded-md p-2 w-full"
              value={client.state}
              onChange={(e) => handleChange("state", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <select
              id="country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value)
                handleChange("country", e.target.value)
              }}
              className="border rounded-md p-4 w-full"
            >
              <option value="USA">🇺🇸 USA</option>
              <option value="India">🇮🇳 India</option>
              <option value="UK">🇬🇧 UK</option>
            </select>
          </div>

          <div>
            <Label htmlFor="service-charge">Service Charge</Label>
            <Input
              id="service-charge"
              placeholder="Enter your pricing"
              className="border-none rounded-md p-2 w-full"
              value={client.serviceCharge}
              onChange={(e) => handleChange("serviceCharge", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="website">Website</Label>
            <div className="flex items-center gap-2 border rounded-md p-2">
              <Globe size={16} />
              <Input
                id="website"
                placeholder="Add client’s website"
                className="border-none w-full"
                value={client.website}
                onChange={(e) => handleChange("website", e.target.value)}
              />
            </div>
          </div>
        </CardContent>

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
          <Button
            variant="outline"
            className="w-full text-[#532B88] p-4 sm:w-auto text-lg border-[#532B88]"
            onClick={() => dispatch(resetClient())}
          >
            Cancel
          </Button>

          <Button
            className="bg-[#532B88] text-white p-4 w-full sm:w-auto text-lg flex items-center justify-center gap-2"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </Card>
    </div>
  )
}
