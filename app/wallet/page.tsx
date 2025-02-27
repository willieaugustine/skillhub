"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react"

type Transaction = {
  id: string
  type: "credit" | "debit"
  amount: number
  description: string
  date: string
  status: "completed" | "pending" | "failed"
}

export default function WalletPage() {
  const [balance, setBalance] = useState(250.75)
  const [amount, setAmount] = useState("")
  const { toast } = useToast()

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "credit",
      amount: 50.0,
      description: "Task completion bonus",
      date: "2024-02-20",
      status: "completed",
    },
    {
      id: "2",
      type: "debit",
      amount: 25.0,
      description: "Withdrawal to bank account",
      date: "2024-02-19",
      status: "completed",
    },
    {
      id: "3",
      type: "credit",
      amount: 75.0,
      description: "Delivery completion",
      date: "2024-02-18",
      status: "completed",
    },
  ]

  const handleAddMoney = (e: React.FormEvent) => {
    e.preventDefault()
    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0",
        variant: "destructive",
      })
      return
    }

    setBalance((prev) => prev + numAmount)
    toast({
      title: "Money added successfully",
      description: `$${numAmount.toFixed(2)} has been added to your wallet`,
    })
    setAmount("")
  }

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault()
    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0",
        variant: "destructive",
      })
      return
    }

    if (numAmount > balance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough funds for this withdrawal",
        variant: "destructive",
      })
      return
    }

    setBalance((prev) => prev - numAmount)
    toast({
      title: "Withdrawal initiated",
      description: `$${numAmount.toFixed(2)} will be transferred to your bank account`,
    })
    setAmount("")
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Wallet</h1>

      <Card>
        <CardHeader>
          <CardTitle>Available Balance</CardTitle>
          <CardDescription>Your current wallet balance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Wallet className="h-12 w-12 text-primary" />
            <div>
              <p className="text-4xl font-bold">${balance.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Available for withdrawal</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="add" className="space-y-4">
        <TabsList>
          <TabsTrigger value="add">Add Money</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add Money to Wallet</CardTitle>
              <CardDescription>Add funds using your credit/debit card</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddMoney} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="add-amount">Amount</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="add-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="0"
                      step="0.01"
                      required
                    />
                    <Button type="submit">Add Money</Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw">
          <Card>
            <CardHeader>
              <CardTitle>Withdraw to Bank Account</CardTitle>
              <CardDescription>Transfer funds to your linked bank account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWithdraw} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="withdraw-amount">Amount</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="withdraw-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="0"
                      step="0.01"
                      required
                    />
                    <Button type="submit">Withdraw</Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your recent wallet activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {transaction.type === "credit" ? (
                    <ArrowDownLeft className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">{transaction.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

