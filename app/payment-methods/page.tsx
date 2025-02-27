"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, Trash2 } from "lucide-react"

type PaymentMethod = {
  id: string
  type: "credit" | "debit"
  last4: string
  expiry: string
  isDefault: boolean
}

export default function PaymentMethodsPage() {
  const { toast } = useToast()
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "credit",
      last4: "4242",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: "2",
      type: "debit",
      last4: "5555",
      expiry: "10/24",
      isDefault: false,
    },
  ])

  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvc: "",
    type: "credit" as const,
  })

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate and process the card with a payment processor
    const last4 = newCard.number.slice(-4)
    const newPaymentMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: newCard.type,
      last4,
      expiry: newCard.expiry,
      isDefault: paymentMethods.length === 0,
    }

    setPaymentMethods([...paymentMethods, newPaymentMethod])
    setNewCard({ number: "", expiry: "", cvc: "", type: "credit" })
    toast({
      title: "Card added successfully",
      description: `Card ending in ${last4} has been added to your account`,
    })
  }

  const handleRemoveCard = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
    toast({
      title: "Card removed",
      description: "The payment method has been removed from your account",
    })
  }

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated",
    })
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Payment Methods</h1>

      <Card>
        <CardHeader>
          <CardTitle>Your Payment Methods</CardTitle>
          <CardDescription>Manage your saved payment methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <CreditCard className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">
                    {method.type.charAt(0).toUpperCase() + method.type.slice(1)} card ending in {method.last4}
                  </p>
                  <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!method.isDefault && (
                  <Button variant="outline" onClick={() => handleSetDefault(method.id)}>
                    Set as Default
                  </Button>
                )}
                {method.isDefault && <span className="text-sm text-primary font-medium">Default</span>}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveCard(method.id)}
                  disabled={method.isDefault}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <form onSubmit={handleAddCard}>
          <CardHeader>
            <CardTitle>Add New Payment Method</CardTitle>
            <CardDescription>Enter your card details to add a new payment method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-type">Card Type</Label>
              <RadioGroup
                value={newCard.type}
                onValueChange={(value: "credit" | "debit") => setNewCard({ ...newCard, type: value })}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit" id="credit" />
                  <Label htmlFor="credit">Credit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="debit" id="debit" />
                  <Label htmlFor="debit">Debit Card</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={newCard.number}
                onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={newCard.expiry}
                  onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  value={newCard.cvc}
                  onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value })}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Add Card</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

